import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'/Users/jian-s/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base=process.env.PREVIEW_URL||'http://127.0.0.1:5187',out=process.env.QA_OUTPUT||'/tmp/ls-ax-gallery';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page=await browser.newPage({reducedMotion:'reduce'}),errors=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));let popups=0;page.on('popup',()=>popups++);
try {
 for(const width of [1440,768,390,320]) {
  await page.setViewportSize({width,height:900});
  await page.goto(base+'/ax/cases');
  assert.deepEqual(await page.locator('.med-ax-case').evaluateAll(es=>es.map(e=>e.id)),['spacecare','spacelink','gaax','namsung-chemical']);
  const sizes=[];
  for(const id of ['spacecare','spacelink','gaax','namsung-chemical']) {
   const card=page.locator('#'+id),trigger=card.locator('.ax-screen-trigger');await trigger.scrollIntoViewIfNeeded();await trigger.locator('img').evaluate(e=>e.decode());sizes.push(await trigger.boundingBox());
   const scrollBefore=await page.evaluate(()=>scrollY);await trigger.click();const dialog=page.getByRole('dialog');await dialog.waitFor();await dialog.locator('img').evaluate(e=>e.decode());
   assert.equal(await page.evaluate(()=>document.body.style.overflow),'hidden');assert(await dialog.evaluate(e=>e.matches(':modal')));
   assert(await dialog.getByRole('button',{name:'확대 화면 닫기'}).evaluate(e=>e===document.activeElement));
   for(let n=0;n<5;n++){await page.keyboard.press('Tab');assert(await dialog.evaluate(e=>e.contains(document.activeElement)));}
   if(await dialog.getByRole('button',{name:'화면 맞춤'}).count())await dialog.getByRole('button',{name:'화면 맞춤'}).click();await dialog.getByRole('button',{name:'원본 크기'}).click();assert.equal(await dialog.getByRole('button',{name:'화면 맞춤'}).getAttribute('aria-pressed'),'true');
   if(width<768){assert(await dialog.locator('.ax-image-viewport').evaluate(e=>e.scrollWidth>e.clientWidth));await dialog.locator('.ax-image-viewport').evaluate(e=>{e.scrollLeft=150;});assert(await dialog.locator('.ax-image-viewport').evaluate(e=>e.scrollLeft>0));}
   if(id==='gaax'&&(width===390||width===1440)){await dialog.getByRole('button',{name:'화면 맞춤'}).click();await page.screenshot({path:out+'/viewer-'+width+'.png'});}
   await page.keyboard.press('Escape');await dialog.waitFor({state:'detached'});assert.notEqual(await page.evaluate(()=>document.body.style.overflow),'hidden');assert(await trigger.evaluate(e=>e===document.activeElement));assert(Math.abs(await page.evaluate(()=>scrollY)-scrollBefore)<3);
   await card.getByRole('button',{name:'크게 보기',exact:true}).click();await page.getByRole('button',{name:'확대 화면 닫기'}).click();assert.equal(await page.getByRole('dialog').count(),0);
   await card.locator('summary').click();assert(await card.locator('.med-workflow').isVisible());await card.locator('summary').click();
   assert.equal(await card.getByRole('link',{name:'관련 과제 상담'}).getAttribute('href'),'/contact?type=ax');
  }
  assert(sizes.every(s=>Math.abs(s.width-sizes[0].width)<1&&Math.abs(s.height-sizes[0].height)<1),'uniform preview size');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  assert.equal(await page.locator('#gaax').getByRole('link',{name:'서비스 둘러보기'}).getAttribute('href'),'https://gaax-dev.vercel.app/demo/advisor');
  if(width===390||width===1440)await page.locator('#gaax').screenshot({path:out+'/gaax-'+width+'.png',style:'header,.skip-link{visibility:hidden!important}'});
  await page.goto(base+'/ax/medical');for(const id of ['happy-life','happy-care']){await page.locator('#'+id+' .ax-screen-trigger').click();await page.getByRole('dialog').waitFor();await page.getByRole('dialog').locator('img').evaluate(e=>e.decode());await page.getByRole('button',{name:'확대 화면 닫기'}).click();}
  await page.goto(base+'/ax');assert.equal(await page.locator('.ax-hub-case').count(),8);assert.equal(await page.locator('#medical-ax-cases .ax-hub-case').count(),4);assert.equal(await page.locator('#industry-ax-cases .ax-hub-case').last().getByRole('link',{name:'사례 자세히 보기'}).getAttribute('href'),'/ax/cases#namsung-chemical');
  const hubImages=page.locator('.ax-hub-case .ax-screen-trigger');assert.equal(await hubImages.count(),6);
  for(const trigger of await hubImages.all()){
   await trigger.scrollIntoViewIfNeeded();const box=await trigger.boundingBox();const cardBox=await trigger.locator('xpath=ancestor::article').boundingBox();assert(box.width>cardBox.width*.95,'full-width case preview');assert(box.height>150,'large preview');
   assert.equal(await trigger.locator('xpath=ancestor::a').count(),0,'image must not be a navigation link');await trigger.locator('img').evaluate(e=>e.decode());
   const beforeUrl=page.url(),beforeScroll=await page.evaluate(()=>scrollY);await trigger.locator('img').click();await page.getByRole('dialog').waitFor();await page.getByRole('dialog').locator('img').evaluate(e=>e.decode());assert.equal(page.url(),beforeUrl);
   if(width<768){assert(await page.getByRole('dialog').locator('.ax-image-viewport').evaluate(e=>e.scrollWidth>e.clientWidth));await page.getByRole('button',{name:'화면 맞춤'}).click();assert.equal(await page.getByRole('button',{name:'원본 크기'}).getAttribute('aria-pressed'),'false');}
   await page.getByRole('button',{name:'확대 화면 닫기'}).click();assert.equal(page.url(),beforeUrl);assert(Math.abs(await page.evaluate(()=>scrollY)-beforeScroll)<3);assert(await trigger.evaluate(e=>e===document.activeElement));
  }
  if(width===390||width===1440){await page.locator('#medical-ax-cases .ax-hub-case').first().screenshot({path:out+'/hub-card-'+width+'.png',style:'header,.skip-link{visibility:hidden!important}'});await page.locator('#industry-ax-cases .ax-hub-case').filter({hasText:'GAAX'}).screenshot({path:out+'/hub-gaax-'+width+'.png',style:'header,.skip-link{visibility:hidden!important}'});}
  await page.locator('#industry-ax-cases .ax-hub-case').filter({hasText:'GAAX'}).getByRole('link',{name:'사례 자세히 보기'}).click();await page.waitForURL(base+'/ax/cases#gaax');
  await page.goto(base+'/insights');await page.getByRole('heading',{level:1,name:'환자와 병원을 위한 인사이트'}).waitFor();assert.equal(await page.locator('.med-page-hero,.ed-pvm-atlas,.med-pvm-lab').count(),0);assert(!(await page.locator('main').innerText()).includes('경험을 읽고, 현장에 연결합니다.'));assert(!(await page.locator('main').innerText()).includes('질문을 읽는 깊이가'));
  assert.equal(await page.locator('.med-report-card').count(),6);assert((await page.locator('.med-report-card').first().boundingBox()).y<900,'reports visible immediately');
  await page.getByRole('button',{name:'다음 페이지',exact:true}).click();assert.equal(await page.getByRole('button',{name:'2페이지',exact:true}).getAttribute('aria-current'),'page');
  for(const route of ['/ax','/insights']){await page.goto(base+route);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));if(width===390||width===1440)await page.screenshot({path:out+'/'+route.slice(1)+'-'+width+'.png'});}
  checks.push(`${width}px: four matching case previews, in-page modal/zoom/focus/scroll, medical viewer, 8-case hub with 6 large in-page previews, separate GAAX detail link, direct insights/pagination`);
 }
 assert.equal(popups,0);assert.deepEqual(errors,[]);writeFileSync(out+'/verification.json',JSON.stringify({base,checks,popups,errors},null,2));console.log(checks.map(c=>'PASS '+c).join('\n'));
} finally {await browser.close();}
