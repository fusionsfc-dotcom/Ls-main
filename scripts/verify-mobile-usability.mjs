import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync,writeFileSync,readFileSync } from 'node:fs';
const require=createRequire(import.meta.url);const{chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const base=process.env.PREVIEW_URL||'http://127.0.0.1:5187';const out=process.env.QA_OUTPUT||'/tmp/ls-mobile-usability';mkdirSync(out,{recursive:true});
const b=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
const context=await b.newContext({viewport:{width:360,height:800},hasTouch:true,isMobile:true,reducedMotion:'reduce'});
const p=await context.newPage();const checks=[],errors=[];p.on('pageerror',e=>errors.push(e.message));
try{
 const routes=['/','/healthcare','/projects','/about','/insights','/ax','/ax/medical','/ax/cases','/ax/medical/jeju','/contact','/patients'];
 for(const [width,height] of [[320,740],[360,800],[390,844],[430,932],[812,390]]){
  await p.setViewportSize({width,height});
  for(const route of routes){
   await p.goto(base+route);await p.locator('main h1').first().waitFor();
   assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${route} overflow ${width}`);
   const small=await p.evaluate(()=>[...document.querySelectorAll('.med-site button,.med-menu-button,.med-patients button')].filter(e=>e.getBoundingClientRect().width>0&&getComputedStyle(e).visibility!=='hidden').filter(e=>e.getBoundingClientRect().height<43.5).map(e=>e.getAttribute('aria-label')||e.textContent.slice(0,30)));
   assert.deepEqual(small,[],`${route}: touch target height at ${width}`);
   if(width<768){
    const inputs=await p.locator('.med-site input,.med-patients input:not([type=checkbox]):not([type=radio]),.med-patients textarea,.med-patients select').all();
    for(const input of inputs)assert(await input.evaluate(el=>parseFloat(getComputedStyle(el).fontSize)>=16),'Input font prevents auto zoom');
   }
   if(width===390&&['/','/contact','/patients'].includes(route))await p.screenshot({path:`${out}/${route==='/'?'home':route.slice(1)}.png`});
  }
  await p.goto(base+'/projects');await p.getByRole('button',{name:'메뉴 열기',exact:true}).tap();
  const dialog=p.getByRole('dialog',{name:'사이트 메뉴'});const box=await dialog.boundingBox();assert.equal(box.height,height);
  const target=dialog.getByRole('link',{name:'의료컨설팅',exact:true});await target.scrollIntoViewIfNeeded();await target.tap();await p.waitForURL(base+'/healthcare');assert.notEqual(await p.evaluate(()=>document.body.style.overflow),'hidden');
  checks.push(`${width}×${height}: 11 pages, no overflow, 44px controls, form fonts, touch menu navigation`);console.log('PASS',checks.at(-1));
 }
 await p.setViewportSize({width:390,height:844});await p.goto(base+'/projects');
 for(const img of await p.locator('.med-project-image img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());assert((await img.boundingBox()).width<=390);}
 await p.goto(base+'/');for(const img of await p.locator('.med-featured-image img,.med-portrait img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());}
 checks.push('Hospital and consultant photos load within mobile layout');
 await p.goto(base+'/patients');
 const survey=p.locator('#survey');for(const name of ['진단 직후','병원 선택','보호자 있음','회복'])await survey.getByRole('button',{name,exact:true}).tap();await survey.getByText('진단 결과',{exact:true}).waitFor();
 checks.push('Existing four-step patient survey reaches its result');
 await p.getByRole('button',{name:'기존 AI 상담 열기'}).tap();
 const chat=p.getByRole('dialog',{name:'LS 암상담'});await chat.waitFor();
 await p.setViewportSize({width:390,height:420});
 const input=chat.getByPlaceholder('암 치료에 대해 무엇이든 물어보세요...');await input.tap();await input.fill('모바일 입력 UI 테스트');
 await p.waitForFunction(()=>{const e=document.querySelector('.med-ai-input input'),r=e?.getBoundingClientRect();return r&&r.top>=0&&r.bottom<=visualViewport.height;});
 await p.route('**/functions/v1/*/ai-consult',r=>r.fulfill({status:200,contentType:'application/json',body:JSON.stringify({thinking:'연결 확인',blocks:[{type:'text',content:'모바일 테스트 응답입니다.'}],related:[],followUp:[]})}));
 await chat.getByRole('button',{name:'질문 보내기'}).tap();await chat.getByText('모바일 테스트 응답입니다.',{exact:true}).waitFor();
 await p.screenshot({path:`${out}/ai-compact.png`});
 await chat.getByRole('button',{name:'닫기',exact:true}).tap();assert.equal(await chat.count(),0);assert.notEqual(await p.evaluate(()=>document.body.style.overflow),'hidden');
 checks.push('AI dialog: small-height viewport, touch input, mocked response, close and scroll restoration (no live message sent)');
 const password=readFileSync('src/app/constants/reportAccess.ts','utf8').match(/REPORT_ACCESS_PASSWORD\s*=\s*['"]([^'"]+)/)[1];
 await p.setViewportSize({width:360,height:800});await p.goto(base+'/disease/breast-cancer-report');await p.getByPlaceholder('비밀번호',{exact:true}).fill(password);await p.getByRole('button',{name:'확인',exact:true}).tap();
 const paths=[...new Set([...readFileSync('src/app/data/insightsData.ts','utf8').matchAll(/link:\s*['"]([^'"]+)/g)].map(m=>m[1]))];
 let wideTables=0;
 for(const route of paths){await p.goto(base+route);await p.locator('main h1').first().waitFor();assert((await p.locator('main').innerText()).length>500,`${route}: readable report`);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${route}: no report overflow`);
  const tables=await p.locator('main table').all();for(const table of tables){const status=await table.evaluate(el=>{if(el.getBoundingClientRect().right<=innerWidth+1)return 'fits';let parent=el.parentElement;while(parent){if(/auto|scroll/.test(getComputedStyle(parent).overflowX)&&parent.scrollWidth>parent.clientWidth){parent.scrollLeft=70;return parent.scrollLeft>0?'scrolls':'blocked';}parent=parent.parentElement;}return 'uncontained';});assert.notEqual(status,'blocked');assert.notEqual(status,'uncontained');if(status==='scrolls')wideTables++;}}
 checks.push(`${paths.length} existing reports readable; ${wideTables} wide tables retain horizontal scrolling`);
 assert.deepEqual(errors,[]);writeFileSync(`${out}/verification.json`,JSON.stringify({base,checks,errors},null,2));checks.slice(-4).forEach(c=>console.log('PASS',c));
}finally{await b.close();}
