import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const publications=JSON.parse(readFileSync('dist/publication-index.json','utf8'));
const paths=new Set(publications.map(report=>new URL(report.url).pathname));
for(const pathname of paths){
 const file='dist'+pathname+(pathname.endsWith('.html')?'':'/index.html');
 const html=readFileSync(file,'utf8');
 const navs=[...html.matchAll(/<nav class="ls-related-reports"[\s\S]*?<\/nav>/g)];
 assert.equal(navs.length,1,pathname+' has one related list');
 const links=[...navs[0][0].matchAll(/href="([^"]+)"/g)].map(m=>m[1]).filter(href=>paths.has(href));
 assert.equal(links.length,6,pathname+' lists six published reports');
 assert.equal(new Set(links).size,6,pathname+' has unique report links');
 assert(!links.includes(pathname),pathname+' excludes itself');
}
assert(!readFileSync('dist/rss.xml','utf8').includes('ls-related-reports'),'RSS contains article content without repeated recommendations');
console.log(`PASS ${paths.size} reports: one list, six distinct published destinations, no self-link; RSS unchanged in scope.`);
