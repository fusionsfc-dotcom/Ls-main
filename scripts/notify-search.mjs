import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
const config=JSON.parse(readFileSync(new URL('./search-config.json',import.meta.url),'utf8'));
const key=readFileSync(new URL('../public/'+config.keyFile,import.meta.url),'utf8').trim();
const remote=await fetch(config.origin+'/publication-index.json',{signal:AbortSignal.timeout(20000)});assert(remote.ok,'Published report index is not reachable');
const publications=await remote.json();const local=JSON.parse(readFileSync('dist/publication-index.json','utf8'));assert.deepEqual(publications,local,'Deploy the current build before notifying search engines');
const cache='node_modules/.cache/search-notified.json';const previous=existsSync(cache)?JSON.parse(readFileSync(cache,'utf8')):{};
const changed=publications.filter(item=>previous[item.url]!==item.contentHash).map(item=>item.url);
const removed=Object.keys(previous).filter(url=>!publications.some(item=>item.url===url));
let urlList;
if(process.argv.includes('--all')||!Object.keys(previous).length){const sitemap=await fetch(config.origin+'/sitemap.xml');assert(sitemap.ok);urlList=[...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);}
else urlList=(changed.length||removed.length)?[...new Set([...changed,config.origin+'/insights',config.origin+'/ax/cases',...removed])]:[];
if(!urlList.length){console.log('No publication changes to notify.');process.exit(0);}
assert(urlList.every(url=>new URL(url).origin===config.origin),'Only this site may be submitted');
const proof=await fetch(config.origin+'/'+config.keyFile);assert(proof.ok&&await proof.text()===key,'IndexNow ownership file is not deployed');
const response=await fetch(config.endpoint,{method:'POST',headers:{'Content-Type':'application/json; charset=utf-8'},body:JSON.stringify({host:new URL(config.origin).host,key,keyLocation:config.origin+'/'+config.keyFile,urlList}),signal:AbortSignal.timeout(20000)});
if(![200,202].includes(response.status))throw new Error(`IndexNow request failed: HTTP ${response.status}`);
mkdirSync('node_modules/.cache',{recursive:true});writeFileSync(cache,JSON.stringify(Object.fromEntries(publications.map(item=>[item.url,item.contentHash])),null,2));
mkdirSync('output/search',{recursive:true});writeFileSync('output/search/indexnow-result.json',JSON.stringify({submittedAt:new Date().toISOString(),endpoint:config.endpoint,status:response.status,urlList,note:'Receipt is not a guarantee of crawling, indexing or ranking.'},null,2));
console.log(`IndexNow received ${urlList.length} URLs (HTTP ${response.status}); indexing is determined by search engines.`);
