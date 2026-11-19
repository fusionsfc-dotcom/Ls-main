// Local-only production preview. Replays the project's explicit Vercel routes without deploying.
import http from 'node:http';
import path from 'node:path';
import { existsSync, readFileSync, statSync } from 'node:fs';
const root = path.resolve('dist');
const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
const port = Number(process.env.PREVIEW_PORT || 5187);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon'
};
if (!existsSync(path.join(root, 'app.html'))) throw new Error('Run npm run build before opening the production preview.');
http.createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    res.writeHead(400);
    res.end('Bad path');
    return;
  }
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Cache-Control', 'no-store');
  const redirect = config.redirects?.find(r => r.source === pathname);
  if (redirect) {
    res.writeHead(308, {
      Location: redirect.destination + url.search
    });
    res.end();
    return;
  }
  if (pathname !== '/' && pathname.endsWith('/')) {
    res.writeHead(308, {
      Location: pathname.slice(0, -1) + url.search
    });
    res.end();
    return;
  }
  const candidate = path.resolve(root, '.' + pathname);
  if (!candidate.startsWith(root + path.sep) && candidate !== root) {
    res.writeHead(403);
    res.end();
    return;
  }
  let target = candidate;
  if (existsSync(path.join(candidate,'index.html'))) target=path.join(candidate,'index.html');
  if (!existsSync(target) || !statSync(target).isFile()) {
    const rewrite = config.rewrites.find(r => r.source === pathname) || config.rewrites.find(r => r.source === '/(.*)');
    target = path.join(root, rewrite.destination);
  }
  if (!existsSync(target)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  res.writeHead(200, {
    'Content-Type': mime[path.extname(target)] || 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff'
  });
  if (req.method === 'HEAD') res.end();else res.end(readFileSync(target));
}).listen(port, '127.0.0.1', () => console.log(`Built-site preview: http://127.0.0.1:${port}`));
