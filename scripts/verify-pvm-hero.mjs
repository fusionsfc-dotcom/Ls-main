import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdirSync,writeFileSync} from 'node:fs';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const base=process.env.PREVIEW_URL||'http://127.0.0.1:5187';
const out=process.env.QA_OUTPUT||'/tmp/ls-pvm-hero';mkdirSync(out,{recursive:true});
const b=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
const checks=[];const errors=[];
try{
 const p=await b.newPage({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});
 p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base+'/');
 await p.getByRole('button',{name:'네트워크 움직임 일시정지'}).waitFor();
 const canvas=p.locator('.pvm-network canvas');
 const first=await canvas.evaluate(el=>el.toDataURL());
 await p.waitForTimeout(180);
 assert.notEqual(await canvas.evaluate(el=>el.toDataURL()),first,'Animation changes frame');
 await p.getByRole('button',{name:'네트워크 움직임 일시정지'}).click();
 await p.getByRole('button',{name:'네트워크 움직임 재생'}).waitFor();
 await p.waitForTimeout(60);
 const paused=await canvas.evaluate(el=>el.toDataURL());await p.waitForTimeout(160);
 assert.equal(await canvas.evaluate(el=>el.toDataURL()),paused,'Paused graph stays still');
 checks.push('Actual animation and pause confirmed');
 await p.emulateMedia({reducedMotion:'reduce'});await p.reload();
 await p.getByRole('button',{name:'네트워크 움직임 재생'}).waitFor();
 checks.push('Reduced motion defaults to static network');
 for(const width of [1440,1024,768,390,360]){
  await p.setViewportSize({width,height:1000});
  await p.goto(base+'/');await p.getByRole('button',{name:'네트워크 움직임 재생'}).waitFor();
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  assert.equal(await p.locator('main h1').count(),1);
  await p.locator('.med-hero').screenshot({path:`${out}/hero-${width}.png`});
  await p.goto(base+'/projects');
  assert.equal(await p.locator('.med-project').count(),10);
  const beautiful=p.locator('#beautiful');
  assert.match(await beautiful.innerText(),/뷰티풀한방병원/);
  assert.match(await beautiful.innerText(),/직원교육/);
  assert.equal(await beautiful.getByRole('link').getAttribute('href'),'https://www.btful.co.kr/');
  assert.equal(await p.locator('.med-project-image img').count(),4);
  for(const img of await p.locator('.med-project-image img').all()) {await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());}
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await beautiful.screenshot({path:`${out}/beautiful-${width}.png`});
  checks.push(`${width}px: hero, 10 projects, 4 loaded photos, Beautiful Hospital content and link, no overflow`);
 }
 const nojs=await b.newContext({javaScriptEnabled:false});const s=await nojs.newPage();
 await s.goto(base+'/');assert(await s.locator('.pvm-network-fallback').evaluate(el=>el.complete && el.naturalWidth>0));
 const fallback=await(await s.request.get(base+'/images/optimized-v1/pvm-network.svg')).text();assert.equal((fallback.match(/<circle/g)||[]).length,1100);
 assert(await s.locator('h1').isVisible());checks.push('Prerendered network and headline visible without JavaScript');
 await nojs.close();assert.deepEqual(errors,[]);
 writeFileSync(`${out}/verification.json`,JSON.stringify({base,checks,errors},null,2));
 checks.forEach(c=>console.log('PASS',c));
}finally{await b.close();}
