import { defineConfig, loadEnv, type Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { prerenderMarketingPages } from './scripts/prerender'

const SITE_URL = 'https://www.lsconsulting.co.kr'

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
      { name: 'prerender-medical-marketing', apply: 'build', writeBundle: { sequential: true, order: 'post', handler: () => prerenderMarketingPages(__dirname) } },
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
