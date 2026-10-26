import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const origin = 'https://www.lsconsulting.co.kr';
const pages = ['/', '/healthcare', '/projects', '/about', '/insights', '/ax', '/ax/medical', '/ax/cases', '/ax/medical/jeju', '/contact'];
for (const route of pages) {
  const file = route === '/' ? 'dist/index.html' : `dist${route}/index.html`;
  const html = readFileSync(file, 'utf8');
  const head = html.slice(0, html.indexOf('</head>'));
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route} has one prerendered H1`);
  assert.equal((head.match(/<title(?:\s|>)/g) || []).length, 1, `${route} title is unique`);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `${route} canonical is unique`);
  assert(html.includes(`href="${origin}${route}"`), `${route} canonical path`);
  assert(!/165개|15,000건|국내 유일|업계 최초|신규 환자 \+30%|\/Users\//.test(html), `${route} old claims or internal paths`);
  for (const script of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(script[1]);
}
const fallback = readFileSync('dist/app.html', 'utf8');
assert(fallback.includes('<div id="root"></div>'));
assert(!fallback.includes('<h1'));
for (const route of ['report', 'reports', 'disease', 'admin']) assert(!existsSync(`dist/${route}`), 'No private or report body prerender');
const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
for (const route of pages) assert(sitemap.includes(`<loc>${origin}${route}</loc>`));
assert(!/<loc>[^<]*(\/admin|\/services|\/business)<\/loc>/.test(sitemap));
assert(!sitemap.includes('<lastmod>'), 'Do not invent report update dates');
assert(existsSync('dist/images/repositioning/og-medical.png'));
console.log('PASS 10 prerendered pages: unique metadata, canonical, H1, valid JSON-LD, no old claims or internal paths.');
console.log('PASS Empty report SPA fallback, no report-body prerender, sitemap and OG asset.');
if (process.env.PREVIEW_URL) {
  const base = process.env.PREVIEW_URL;
  for (const [from, to] of [['/services', '/ax'], ['/business', '/ax/cases']]) {
    const response = await fetch(base + from + '?source=check', {
      redirect: 'manual'
    });
    assert.equal(response.status, 308);
    assert.equal(response.headers.get('location'), to + '?source=check');
  }
  for (const route of pages) {
    const r = await fetch(base + route);
    assert.equal(r.status, 200);
    const s = await r.text();
    assert(s.includes(`href="${origin}${route}"`));
  }
  const report = await fetch(base + '/disease/breast-cancer-report');
  assert.equal(report.status, 200);
  assert((await report.text()).includes('<div id="root"></div>'));
  const png = await fetch(base + '/images/repositioning/og-medical.png');
  assert.equal(png.headers.get('content-type'), 'image/png');
  console.log('PASS Local built-site HTTP: initial page metadata, permanent redirects with query retention, protected-route fallback and static assets.');
}
