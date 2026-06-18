import { defineConfig, loadEnv, type Plugin } from 'vite'
import path from 'path'
import { readdirSync, writeFileSync } from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const SITE_URL = 'https://www.lsconsulting.co.kr'

/**
 * 빌드 시 sitemap.xml 자동 생성.
 * 정적 페이지 + 주간 리포트(데이터 디렉터리에서 슬러그 자동 수집)를 포함하므로,
 * 리포트가 추가될 때마다 별도 작업 없이 사이트맵이 갱신된다.
 */
function sitemapPlugin(): Plugin {
  return {
    name: 'gen-sitemap',
    apply: 'build',
    closeBundle() {
      const weeklyDir = path.resolve(__dirname, 'src/data/reports/weekly-care')
      let slugs: string[] = []
      try {
        slugs = readdirSync(weeklyDir)
          .filter((f) => f.endsWith('.ts') && f !== 'types.ts' && f !== 'index.ts')
          .map((f) => f.replace(/\.ts$/, ''))
          .sort()
      } catch {
        slugs = []
      }
      const today = new Date().toISOString().slice(0, 10)
      const routes: Array<[string, string, string]> = [
        ['/', '1.0', 'weekly'],
        ['/services', '0.9', 'monthly'],
        ['/healthcare', '0.9', 'monthly'],
        ['/business', '0.9', 'monthly'],
        ['/about', '0.8', 'monthly'],
        ['/consultation', '0.8', 'monthly'],
        ['/insights', '0.9', 'weekly'],
        ...slugs.map((s) => [`/reports/weekly/${s}`, '0.7', 'monthly'] as [string, string, string]),
      ]
      const body = routes
        .map(
          ([p, pr, fr]) =>
            `  <url>\n    <loc>${SITE_URL}${p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${fr}</changefreq>\n    <priority>${pr}</priority>\n  </url>`,
        )
        .join('\n')
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
      writeFileSync(path.resolve(__dirname, 'dist/sitemap.xml'), xml)
    },
  }
}

/** Figma Make emits `figma:asset/...` imports; resolve to a local placeholder for Vite. */
function figmaAssetFallback(): Plugin {
  const virtualPrefix = '\0figma-asset:'
  return {
    name: 'figma-asset-fallback',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        return virtualPrefix + id.slice('figma:asset/'.length)
      }
    },
    load(id) {
      if (id.startsWith(virtualPrefix)) {
        return `export default ${JSON.stringify('/figma-placeholder.png')}`
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      figmaAssetFallback(),
      sitemapPlugin(),
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used – do not remove them
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],

    server: {
      port: 5174,
      proxy: {
        '/api/claude': {
          target: 'https://api.anthropic.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/claude/, '/v1/messages'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              console.log('=== PROXY DEBUG ===')
              console.log('API KEY:', env.ANTHROPIC_API_KEY?.slice(0, 20))
              proxyReq.setHeader('x-api-key', env.ANTHROPIC_API_KEY)
              proxyReq.setHeader('anthropic-version', '2023-06-01')
              proxyReq.setHeader('content-type', 'application/json')
            })
          }
        },
      },
    },
  }
})