import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
const require=createRequire(import.meta.url);const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const base=process.env.PREVIEW_URL||'http://127.0.0.1:5187';const out=process.env.QA_OUTPUT||'/tmp/ls-body-check';mkdirSync(out,{recursive:true});
const b=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
const checks=[],errors=[];
try {
 const p=await b.newPage({reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));
 for(const width of [1440,768,390,360]){
  await p.setViewportSize({width,height:1000});
  for(const route of ['/','/insights']){
   await p.goto(base+route);
   if(route==='/'){
    assert.equal(await p.locator('.med-featured-card').count(),3);
    assert.equal(await p.locator('.med-featured-card').last().getAttribute('href'),'/projects#beautiful');
    for(const img of await p.locator('.med-featured-image img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());}
    assert.equal(await p.locator('.med-service-output').count(),6);
   }
   const panel=p.getByRole('tabpanel');
   await p.getByRole('tab',{name:/병원 생활/}).click();
   await panel.getByRole('heading',{name:'일상의 서비스 접점'}).waitFor();
   assert.equal(await p.getByRole('tab',{name:/병원 생활/}).getAttribute('aria-selected'),'true');
   await p.getByRole('tab',{name:/병원 생활/}).press('ArrowRight');
   await panel.getByRole('heading',{name:'다음 단계로 이어지는 안내'}).waitFor();
   await p.getByRole('tab',{name:/퇴원·이동/}).press('Home');
   await panel.getByRole('heading',{name:'첫 상담의 안내 체계'}).waitFor();
   assert.equal(await p.locator('[role=tab][tabindex="0"]').count(),1);
   assert(await p.locator('.med-lab-foot').innerText().then(t=>t.includes('설계 예시')));
   const link=p.getByRole('link',{name:'PVM 보고서 살펴보기'});
   assert.equal(await link.getAttribute('href'),'/insights#medical-reports');
   await link.click();await p.waitForURL(base+'/insights#medical-reports');
   await p.locator('.med-report-card').first().waitFor();
   assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  }
  await p.goto(base+'/projects');
  assert.equal(await p.locator('.med-project').count(),10);
  for(const img of await p.locator('.med-project-image img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());}
  await p.locator('#beautiful').screenshot({path:`${out}/project-${width}.png`});
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  checks.push(`${width}px: featured hospitals/photos, service deliverables, PVM tabs with keyboard, report link, 10 project cards`);console.log('PASS',checks.at(-1));
 }
 const staticContext=await b.newContext({javaScriptEnabled:false});const staticPage=await staticContext.newPage();
 await staticPage.goto(base+'/');assert(await staticPage.locator('.med-featured-card').first().isVisible());assert(await staticPage.getByRole('tabpanel').isVisible());assert.equal(await staticPage.locator('.med-service-output').count(),6);await staticContext.close();
 checks.push('Body content remains visible without JavaScript');
 // Only the permitted marketing page gets the progressive reveal animation.
 await p.emulateMedia({reducedMotion:'no-preference'});await p.setViewportSize({width:1440,height:1000});await p.goto(base+'/');
 await p.evaluate(()=>{window.__bodyAnimationCount=0;const original=Element.prototype.animate;Element.prototype.animate=function(...args){if(this.matches('.med-service-card,.med-section-heading,.med-featured-card'))window.__bodyAnimationCount++;return original.apply(this,args);};});
 await p.locator('.med-service-grid').scrollIntoViewIfNeeded();await p.waitForFunction(()=>window.__bodyAnimationCount>0);
 await p.emulateMedia({reducedMotion:'reduce'});await p.waitForTimeout(80);
 assert.equal(await p.locator('.med-service-card').first().evaluate(el=>el.getAnimations().filter(a=>a.playState==='running').length),0);
 checks.push('Scroll reveal activates and stops when reduced motion is enabled');
 assert.deepEqual(errors,[]);writeFileSync(`${out}/verification.json`,JSON.stringify({base,checks,errors},null,2));checks.slice(-2).forEach(c=>console.log('PASS',c));
} finally {await b.close();}
