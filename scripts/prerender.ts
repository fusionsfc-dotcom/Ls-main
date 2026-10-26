import { build } from 'esbuild';
import { createRequire } from 'node:module';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
export async function prerenderMarketingPages(root: string) {
  const dist = path.join(root, 'dist');
  const template = readFileSync(path.join(dist, 'index.html'), 'utf8');
  if (!template.includes('<!--page-head-start-->') || !template.includes('<div id="root"></div>')) throw new Error('Prerender template markers are missing.');
  const cacheRoot = path.join(root, 'node_modules', '.cache');
  mkdirSync(cacheRoot, {
    recursive: true
  });
  const temporary = mkdtempSync(path.join(cacheRoot, 'ls-prerender-'));
  const output = path.join(temporary, 'render.cjs');
  try {
    await build({
      entryPoints: [path.join(root, 'src/prerender.tsx')],
      outfile: output,
      bundle: true,
      platform: 'node',
      format: 'cjs',
      packages: 'external',
      jsx: 'automatic'
    });
    const require = createRequire(import.meta.url);
    const {
      renderPublicMarketingPages
    } = require(output);
    const pages = renderPublicMarketingPages() as {
      path: string;
      body: string;
      head: string;
    }[];
    // Keep the empty SPA fallback separate from the home page's pre-rendered content.
    writeFileSync(path.join(dist, 'app.html'), template);
    for (const page of pages) {
      const html = template.replace(/<!--page-head-start-->[\s\S]*?<!--page-head-end-->/, () => `<!--page-head-start-->${page.head}<!--page-head-end-->`).replace('<div id="root"></div>', () => `<div id="root">${page.body}</div>`);
      const target = page.path === '/' ? path.join(dist, 'index.html') : path.join(dist, page.path.slice(1), 'index.html');
      mkdirSync(path.dirname(target), {
        recursive: true
      });
      writeFileSync(target, html);
    }
    console.log(`Pre-rendered ${pages.length} public marketing pages; report routes use the unchanged SPA.`);
  } finally {
    rmSync(temporary, {
      recursive: true,
      force: true
    });
  }
}
