// Regression: an open menu must fill the viewport, not inherit the header height.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:5187';
const out = process.env.QA_OUTPUT || '/tmp/ls-menu-check';
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
const checks = [];
try {
  for (const [width, height] of [[360,800],[390,844],[690,850],[768,1024],[1023,800],[812,390]]) {
    await page.setViewportSize({ width, height });
    await page.goto(base + '/projects');
    await page.getByRole('button', { name:'메뉴 열기', exact:true }).click();
    const dialog = page.getByRole('dialog', { name:'사이트 메뉴' });
    const box = await dialog.boundingBox();
    assert.equal(box.y, 0);
    assert.equal(box.height, height, `${width}px menu fills viewport`);
    assert.equal(box.width, width);
    assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
    // Hit-test before clicking: locator.click() alone can hide clipping bugs by scrolling.
    const links = dialog.locator('nav a');
    for (let i=0; i<await links.count(); i++) {
      const link = links.nth(i);
      if (height < 600) await link.scrollIntoViewIfNeeded();
      assert(await link.evaluate(el => {
        const r=el.getBoundingClientRect();
        const x=r.x+r.width/2, y=r.y+r.height/2;
        return y>0 && y<innerHeight && el.contains(document.elementFromPoint(x,y));
      }), `${width}x${height} visible and clickable item ${i}`);
    }
    if (height>=600) await page.screenshot({ path:`${out}/menu-${width}.png` });
    const target = dialog.getByRole('link', { name:'병원컨설팅', exact:true });
    if (height < 600) await target.scrollIntoViewIfNeeded();
    const rect = await target.boundingBox();
    await page.mouse.click(rect.x + rect.width/2, rect.y + rect.height/2);
    await page.waitForURL(base + '/healthcare');
    assert.equal(await dialog.count(), 0);
    assert.notEqual(await page.evaluate(() => document.body.style.overflow), 'hidden');
    await page.getByRole('button', { name:'메뉴 열기', exact:true }).click();
    await page.getByRole('button', { name:'메뉴 닫기', exact:true }).click();
    assert.equal(await dialog.count(), 0);
    checks.push(`${width}x${height}: full-height overlay, visible links, navigation, close, scroll unlock`);
    console.log('PASS',checks.at(-1));
  }
  await page.setViewportSize({ width:390,height:844 });
  await page.getByRole('button',{ name:'메뉴 열기',exact:true }).click();
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('dialog').count(),0);
  assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute('aria-label')),'메뉴 열기');
  await page.getByRole('button',{ name:'메뉴 열기',exact:true }).click();
  await page.setViewportSize({ width:1280,height:900 });
  await page.waitForFunction(()=>!document.querySelector('[role="dialog"]'));
  assert.notEqual(await page.evaluate(()=>document.body.style.overflow),'hidden');
  assert(await page.getByRole('navigation',{name:'주 메뉴',exact:true}).isVisible());
  assert.deepEqual(errors,[]);
  checks.push('Escape restores focus, desktop resize closes overlay, no browser runtime errors');
  writeFileSync(`${out}/verification.json`,JSON.stringify({base,checks,errors},null,2));
  console.log('PASS',checks.at(-1));
} finally { await browser.close(); }
