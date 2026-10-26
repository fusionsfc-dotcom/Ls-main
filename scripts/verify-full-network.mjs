import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdirSync,writeFileSync} from 'node:fs';
const require=createRequire(import.meta.url);const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const base=process.env.PREVIEW_URL||'http://127.0.0.1:5187';const out=process.env.QA_OUTPUT||'/tmp/ls-full-network';mkdirSync(out,{recursive:true});
const b=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
const checks=[],errors=[];
try{
 const p=await b.newPage({reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));
 const routes=['/','/healthcare','/projects','/about','/insights','/ax','/ax/medical','/ax/cases','/ax/medical/jeju','/contact'];
 for(const width of [1440,768,390,360]){
  await p.setViewportSize({width,height:1000});
  for(const route of routes){
   await p.goto(base+route);await p.getByRole('button',{name:'네트워크 움직임 재생'}).waitFor();
   const hero=p.locator('.med-network-hero,.med-mapped-hero');
   const box=await hero.boundingBox(),canvas=await hero.locator('canvas').boundingBox();
   assert.equal(canvas.width,box.width,`${route}: full width`);assert.equal(canvas.height,box.height,`${route}: full height`);
   assert.equal(canvas.x,box.x);assert.equal(canvas.y,box.y);
   assert.equal(await p.locator('main h1').count(),1);
   assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   const controls=hero.getByRole('button');
   assert(await controls.evaluate(el=>{const r=el.getBoundingClientRect();return el.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));}),`${route}: pause button unobstructed`);
   // Keep the control below copy, including narrow, long Korean titles.
   const bottom=await hero.locator('.med-lead').evaluate(el=>el.getBoundingClientRect().bottom);
   const controlBox=await controls.boundingBox();assert(controlBox.y>bottom,`${route}: control does not overlap description`);
   if(route==='/'||route==='/healthcare'){
    const link=hero.getByRole('link',{name:'병원 컨설팅 상담',exact:true});
    assert(await link.evaluate(el=>{const r=el.getBoundingClientRect();return el.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));}));
   }
   if(['/', '/projects','/ax'].includes(route)&&(width===1440||width===390)) await p.screenshot({path:`${out}/${route==='/'?'home':route.slice(1)}-${width}.png`});
  }
  checks.push(`${width}px: all 10 full-bleed heroes, visible copy, controls and CTAs unobstructed, no overflow`);
  console.log('PASS',checks.at(-1));
 }
 await p.setViewportSize({width:1440,height:1000});await p.emulateMedia({reducedMotion:'no-preference'});await p.goto(base+'/');
 await p.getByRole('button',{name:'네트워크 움직임 일시정지'}).waitFor();
 const c=p.locator('.pvm-network canvas');let first=await c.evaluate(el=>el.toDataURL());await p.waitForTimeout(250);assert.notEqual(await c.evaluate(el=>el.toDataURL()),first);
 await p.getByRole('button',{name:'네트워크 움직임 일시정지'}).click();await p.getByRole('button',{name:'네트워크 움직임 재생'}).waitFor();await p.waitForTimeout(80);first=await c.evaluate(el=>el.toDataURL());await p.waitForTimeout(150);assert.equal(await c.evaluate(el=>el.toDataURL()),first);
 await p.getByRole('button',{name:'네트워크 움직임 재생'}).click();await p.locator('footer').scrollIntoViewIfNeeded();await p.waitForTimeout(150);first=await c.evaluate(el=>el.toDataURL());await p.waitForTimeout(200);assert.equal(await c.evaluate(el=>el.toDataURL()),first);
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(150);first=await c.evaluate(el=>el.toDataURL());await p.waitForTimeout(200);assert.notEqual(await c.evaluate(el=>el.toDataURL()),first);
 checks.push('Animation changes frames, pauses on request and offscreen, resumes on return');console.log('PASS',checks.at(-1));
 assert.deepEqual(errors,[]);writeFileSync(`${out}/verification.json`,JSON.stringify({base,checks,errors},null,2));
}finally{await b.close();}
