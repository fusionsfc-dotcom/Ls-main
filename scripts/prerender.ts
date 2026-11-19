import { build } from 'esbuild';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const origin='https://www.lsconsulting.co.kr';
const xml=(value:string)=>value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
// Strip only article/breadcrumb entities regenerated from the publication record.
// Preserve unrelated structured data; malformed JSON fails the build for review.
const withoutPublicationSchema=(value:any):any=>{
  if(Array.isArray(value))return value.map(withoutPublicationSchema).filter(Boolean);
  if(!value||typeof value!=='object')return value;
  const types=[value['@type']].flat();
  if(types.some(t=>['Article','BlogPosting','NewsArticle','BreadcrumbList'].includes(t)))return null;
  if(value['@graph'])return {...value,'@graph':withoutPublicationSchema(value['@graph'])};
  return value;
};
const cdata=(value:string)=>'<![CDATA['+value.replace(/\]\]>/g,']]]]><![CDATA[>')+']]>';
const feedBody=(html:string)=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<(?:button|nav|form)\b[^>]*>[\s\S]*?<\/(?:button|nav|form)>/gi,'').replace(/(href|src)="\/(?!\/)/g,`$1="${origin}/`);

export async function prerenderMarketingPages(root: string) {
  const dist=path.join(root,'dist'), template=readFileSync(path.join(dist,'index.html'),'utf8');
  if(!template.includes('<!--page-head-start-->')||!template.includes('<div id="root"></div>'))throw new Error('Prerender markers missing');
  const cache=path.join(root,'node_modules','.cache');mkdirSync(cache,{recursive:true});
  const temporary=mkdtempSync(path.join(cache,'ls-prerender-'));
  try {
    const app=readFileSync(path.join(root,'src/app/App.tsx'),'utf8');
    const loaders=new Map([...app.matchAll(/const (\w+) = lazy\(\(\) => import\('([^']+)'\)\.then\(\w+ => \(\{\s*default: \w+\.(\w+)\s*\}\)\)\);/g)].map(m=>[m[1],{source:path.resolve(root,'src/app',m[2]),name:m[3]}]));
    const routes=[...app.matchAll(/<Route path="([^"]+)" element=\{<ReportDocument><(\w+) \/><\/ReportDocument>\} \/>/g)].filter(m=>m[1]!=='/insights/report/:id').map(m=>({path:m[1],name:m[2]}));
    const imports=[...new Set(routes.map(r=>r.name))].map(name=>{const loader=loaders.get(name);if(!loader)throw new Error('Missing report loader: '+name);return `import {${loader.name} as ${name}} from ${JSON.stringify(loader.source)};`;}).join('\n');
    const entry=`
      import {renderToString} from 'react-dom/server';
      import {StaticRouter,Routes,Route,matchPath} from 'react-router';
      import {HelmetProvider} from 'react-helmet-async';
      import {Header} from ${JSON.stringify(path.join(root,'src/app/components/Header'))};
      import {Footer} from ${JSON.stringify(path.join(root,'src/app/components/Footer'))};
      import {ReportDocument} from ${JSON.stringify(path.join(root,'src/app/components/reports/ReportDocument'))};
      import {insightsData} from ${JSON.stringify(path.join(root,'src/app/data/insightsData'))};
      import {RelatedReports} from ${JSON.stringify(path.join(root,'src/app/components/reports/RelatedReports'))};
      export function renderRelatedReports(pathname:string){return renderToString(<RelatedReports pathname={pathname}/>);}
      import {isReportPathRequiringPassword} from ${JSON.stringify(path.join(root,'src/app/constants/reportAccess'))};
      export {insightsData,isReportPathRequiringPassword};
      export {renderPublicMarketingPages} from ${JSON.stringify(path.join(root,'src/prerender'))};
      export {publicationSchema,publicationBreadcrumb,publicationFeedDate,exactPublicationDate,publicationSortTime} from ${JSON.stringify(path.join(root,'src/app/data/publication'))};
      ${imports}
      const routes=[${routes.map(r=>`{path:${JSON.stringify(r.path)},Page:${r.name}}`).join(',')}];
      export function renderReportPages(){return insightsData.filter(r=>!r.link.endsWith('.html')).map(report=>{
        const route=routes.find(r=>matchPath(r.path,report.link));if(!route)throw new Error('Published report has no static renderer: '+report.link);
        const context:any={};const Page=route.Page;
        const body=renderToString(<HelmetProvider context={context}><StaticRouter location={report.link}><div className="min-h-screen bg-white flex flex-col"><Header/><main id="main-content" className="flex-1" tabIndex={-1}><Routes><Route path={route.path} element={<ReportDocument><Page/></ReportDocument>}/></Routes></main><Footer hidePricing/></div></StaticRouter></HelmetProvider>);
        return {path:report.link,body,head:context.helmet.title.toString()+context.helmet.meta.toString()+context.helmet.link.toString()};
      });}
    `;
    const input=path.join(temporary,'entry.tsx'),output=path.join(temporary,'render.cjs');writeFileSync(input,entry);
    await build({entryPoints:[input],outfile:output,bundle:true,platform:'node',format:'cjs',packages:'external',jsx:'automatic',alias:{'@':path.join(root,'src')},plugins:[{name:'root-utils',setup(build){build.onResolve({filter:/^\/utils\//},args=>({path:path.join(root,args.path+'.tsx')}));}}],loader:{'.css':'empty'}});
    const render=createRequire(import.meta.url)(output);
    const seen=new Set<string>();
    for(const report of render.insightsData){
      if(!/^\/(?!\/)[^?#]+$/.test(report.link)||report.link.split('/').includes('..')||/^\/(?:admin|api)(?:\/|$)/.test(report.link)||render.isReportPathRequiringPassword(report.link))throw new Error('Non-public or invalid publication URL: '+report.link);
      if(seen.has(report.link))throw new Error('Duplicate publication URL: '+report.link);
      seen.add(report.link);
      for(const value of [report.publishedAt,report.updatedAt].filter(Boolean))if(!/^\d{4}-\d{2}-\d{2}(?:T.*(?:Z|[+-]\d{2}:\d{2}))?$/.test(value)||!Number.isFinite(Date.parse(value)))throw new Error('Invalid publication date: '+report.link);
    }
    const marketing=render.renderPublicMarketingPages(),reports=render.renderReportPages();
    const reportCss=readdirSync(path.join(dist,'assets')).filter(f=>f.endsWith('.css')&&!template.includes('/assets/'+f)).map(f=>`<link rel="stylesheet" href="/assets/${f}"/>`).join('');
    for(const report of reports)report.head+=reportCss;
    const all=[...marketing,...reports];
    writeFileSync(path.join(dist,'app.html'),template.replace('index, follow, max-image-preview:large, max-snippet:-1','noindex, follow'));
    for(const page of all){const html=template.replace(/<!--page-head-start-->[\s\S]*?<!--page-head-end-->/,()=>`<!--page-head-start-->${page.head}<!--page-head-end-->`).replace('<div id="root"></div>',()=>`<div id="root">${page.body}</div>`);const target=path.join(dist,page.path==='/'?'index.html':page.path.slice(1)+'/index.html');mkdirSync(path.dirname(target),{recursive:true});writeFileSync(target,html);}
    const publications=render.insightsData;
    for(const report of publications.filter((r:any)=>r.link.endsWith('.html'))){
      const target=path.join(dist,report.link.slice(1));let html=readFileSync(target,'utf8');
      if((html.match(/<meta\b[^>]*>/gi)||[]).some(tag=>/name=["']robots["']/i.test(tag)&&/content=["'][^"']*noindex/i.test(tag)))throw new Error('Refusing to index an explicitly noindexed report: '+report.link);
      html=html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi,'')
        .replace(/<link[^>]+rel=["']canonical["'][^>]*>/gi,'')
        .replace(/<meta[^>]+(?:name|property)=["'](?:robots|description|og:(?:title|description|url|type|image)|twitter:(?:card|title|description|image)|article:(?:published_time|modified_time))["'][^>]*>/gi,'')
        .replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,(_tag,json)=>{
          const kept=withoutPublicationSchema(JSON.parse(json));
          return kept?`<script type="application/ld+json">${JSON.stringify(kept).replace(/</g,'\\u003c')}</script>`:'';
        });
      const title=xml(report.title.replace(/\n/g,' ')),description=xml(report.excerpt),url=xml(origin+report.link);
      const schema=JSON.stringify([render.publicationSchema(report),render.publicationBreadcrumb(report)]).replace(/</g,'\\u003c');
      const image=origin+'/images/brand-v1/ls-user-logo-20261027.png';
      const published=render.exactPublicationDate(report);
      html=html.replace('</head>',`<title>${title}</title><meta name="description" content="${description}"/><link rel="canonical" href="${url}"/><meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1"/><meta property="og:type" content="article"/><meta property="og:title" content="${title}"/><meta property="og:description" content="${description}"/><meta property="og:url" content="${url}"/><meta property="og:image" content="${image}"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${title}"/><meta name="twitter:description" content="${description}"/><meta name="twitter:image" content="${image}"/>${published?`<meta property="article:published_time" content="${xml(published)}"/>`:''}${report.updatedAt?`<meta property="article:modified_time" content="${xml(report.updatedAt)}"/>`:''}<link rel="alternate" type="application/rss+xml" title="LS AX 인사이트" href="${origin}/rss.xml"/><script type="application/ld+json">${schema}</script></head>`);
      const relatedCss=readFileSync(path.join(root,'src/app/components/reports/related-reports.css'),'utf8');
      html=html.replace('</head>',`<style id="ls-related-styles">${relatedCss}</style></head>`);
      html=html.replace('</main>',`</main>${render.renderRelatedReports(report.link)}`);
      writeFileSync(target,html);
    }
    const paths=[...new Set([...marketing.map((p:any)=>p.path),...publications.map((r:any)=>r.link)])];
    writeFileSync(path.join(dist,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(url=>{const report=publications.find((r:any)=>r.link===url);const modified=report&&(report.updatedAt||render.exactPublicationDate(report));return `<url><loc>${xml(origin+url)}</loc>${modified?`<lastmod>${xml(modified)}</lastmod>`:''}</url>`;}).join('\n')}\n</urlset>\n`);
    const sorted=[...publications].sort((a,b)=>render.publicationSortTime(b)-render.publicationSortTime(a));
    const rss=sorted.map(report=>{const doc=reports.find((r:any)=>r.path===report.link);const body=doc?doc.body.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1]||doc.body:readFileSync(path.join(dist,report.link.slice(1)),'utf8').match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1]||'';const date=render.publicationFeedDate(report);return `<item><title>${xml(report.title.replace(/\n/g,' '))}</title><link>${xml(origin+report.link)}</link><guid isPermaLink="true">${xml(origin+report.link)}</guid><category>${xml(report.category)}</category><description>${xml(report.excerpt)}</description><content:encoded>${cdata(feedBody(body))}</content:encoded>${date?`<pubDate>${date}</pubDate>`:''}</item>`;});
    writeFileSync(path.join(dist,'rss.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>LS AX 인사이트</title><link>${origin}/insights</link><description>암요양·암재활 의료서비스, PVM 환자 경험과 기업 AX 연구</description><language>ko</language><atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml"/>${rss.join('\n')}</channel></rss>\n`);
    writeFileSync(path.join(dist,'publication-index.json'),JSON.stringify(publications.map((r:any)=>({contentHash:createHash('sha256').update(JSON.stringify(r)+(reports.find((p:any)=>p.path===r.link)?.body||readFileSync(path.join(dist,r.link.slice(1)),'utf8'))).digest('hex'),title:r.title.replace(/\n/g,' '),url:origin+r.link,description:r.excerpt,category:r.category,...(render.exactPublicationDate(r)?{datePublished:render.exactPublicationDate(r)}:{}),...(r.updatedAt?{dateModified:r.updatedAt}:{})})),null,2));
    const llms=readFileSync(path.join(root,'public/llms.txt'),'utf8');
    writeFileSync(path.join(dist,'llms.txt'),llms+'\n\n## 공개 인사이트 리포트\n\n'+sorted.map(r=>`- [${r.title.replace(/\n/g,' ')}](${origin+r.link}): ${r.excerpt}`).join('\n')+`\n\n## 업데이트 피드\n- [RSS](${origin}/rss.xml)\n- [Sitemap](${origin}/sitemap.xml)\n`);
    console.log(`Pre-rendered ${marketing.length} marketing pages and ${reports.length} report bodies; ${publications.length} publications in sitemap and full-content RSS.`);
  } finally {rmSync(temporary,{recursive:true,force:true});}
}
