// Read-only browser regression. Newsletter responses are mocked; no real submission is sent.
// Usage: PLAYWRIGHT_MODULE_PATH=/path/to/playwright PREVIEW_URL=http://127.0.0.1:5186 node scripts/verify-medical-preview.mjs
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const {
  chromium
} = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:5186';
const out = process.env.QA_OUTPUT || '/tmp/ls-medical-qa';
mkdirSync(out, {
  recursive: true
});
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH ? {
    executablePath: process.env.CHROME_PATH
  } : {})
});
const context = await browser.newContext({
  viewport: {
    width: 1440,
    height: 1000
  },
  reducedMotion: 'reduce'
});
const checks = [];
const errors = [];
function ok(name, detail = '') {
  checks.push({
    name,
    status: 'pass',
    detail
  });
  console.log('PASS', name);
}
context.on('page', p => p.on('pageerror', e => errors.push({
  url: p.url(),
  message: e.message
})));
const page = await context.newPage();
page.setDefaultTimeout(12000);
async function visit(url) {
  await page.goto(base + url);
  await page.locator('main h1').first().waitFor();
}
try {
  const before = execFileSync('git', ['show', 'HEAD:src/app/App.tsx'], {
    encoding: 'utf8'
  });
  const after = readFileSync('src/app/App.tsx', 'utf8');
  for (const route of before.matchAll(/<Route path="([^"]+)" element=\{([^\n]+)\}/g)) {
    if (['/', '/services', '/healthcare', '/about', '/business', '/projects', '/insights', '/patients'].includes(route[1])) continue;
    assert(after.includes(route[0]), `Existing route changed: ${route[1]}`);
  }
  for (const f of ['src/app/components/auth/ReportPasswordGate.tsx', 'src/app/components/auth/GuardedReportLink.tsx', 'src/app/components/auth/InsightsReportRoute.tsx', 'src/app/constants/reportAccess.ts', 'src/app/constants/publicSampleReportLinks.ts']) assert.equal(readFileSync(f, 'utf8'), execFileSync('git', ['show', `HEAD:${f}`], {
    encoding: 'utf8'
  }));
  ok('Existing report routes and access implementation unchanged');
  const routes = ['/', '/healthcare', '/projects', '/insights', '/ax', '/ax/medical', '/ax/cases', '/ax/medical/jeju', '/about', '/contact'];
  for (const width of [1440, 768, 390, 360]) {
    await page.setViewportSize({
      width,
      height: width >= 768 ? 1000 : 844
    });
    for (const route of routes) {
      await visit(route);
      await page.waitForFunction(expected => document.querySelector('link[rel="canonical"]')?.getAttribute('href') === expected, 'https://www.lsconsulting.co.kr' + route);
      assert.equal(await page.locator('main h1').count(), 1, `H1 count ${route}`);
      assert.equal(await page.locator('link[rel="canonical"]').count(), 1, `Canonical duplicates ${route}`);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://www.lsconsulting.co.kr' + route);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      assert.equal(overflow, false, `Overflow ${route} at ${width}`);
      assert.equal(await page.locator('body').innerText().then(s => /165개|15,000건|국내 유일|신규 환자 \+30%/.test(s)), false, `Old marketing claim ${route}`);
      if (width === 1440 || width === 390) {
        const slug = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
        await page.screenshot({
          path: path.join(out, `${slug}-${width}-top.png`),
          animations: 'disabled'
        });
        const section = page.locator('.med-site section').nth(1);
        if (await section.count()) {
          await section.scrollIntoViewIfNeeded();
          await page.screenshot({
            path: path.join(out, `${slug}-${width}-detail.png`),
            animations: 'disabled'
          });
        }
      }
    }
    ok(`10 marketing pages: H1, canonical, overflow and claims at ${width}px`);
  }
  await page.setViewportSize({
    width: 390,
    height: 844
  });
  await visit('/');
  await page.getByRole('button', {
    name: '메뉴 열기',
    exact: true
  }).click();
  await page.getByRole('dialog').waitFor();
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), '메뉴 닫기');
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('dialog').count(), 0);
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), '메뉴 열기');
  await page.getByRole('button', {
    name: '메뉴 열기',
    exact: true
  }).click();
  await page.getByRole('dialog').getByRole('link', {
    name: '의료컨설팅',
    exact: true
  }).click();
  await page.waitForURL('**/healthcare');
  assert.equal(await page.getByRole('dialog').count(), 0);
  ok('Mobile menu opens, focuses, closes with Escape and navigates');
  await page.setViewportSize({
    width: 1440,
    height: 1000
  });
  await visit('/projects');
  assert.equal(await page.locator('.med-project').count(), 10);
  assert.equal(await page.locator('#beautiful h2').innerText(), '뷰티풀한방병원');
  await page.getByRole('button', {
    name: '재활 연계',
    exact: true
  }).click();
  assert.equal(await page.locator('.med-project').count(), 1);
  assert.match(await page.locator('.med-project').innerText(), /러스크서울병원/);
  await page.getByRole('button', {
    name: '전체',
    exact: true
  }).click();
  assert.equal(await page.locator('.med-project').count(), 10);
  assert.equal(await page.locator('#beautiful h2').innerText(), '뷰티풀한방병원');
  ok('Hospital project filters');
  await visit('/healthcare');
  await page.locator('summary').first().click();
  assert.equal(await page.locator('details').first().getAttribute('open'), '');
  ok('Consulting FAQ expands');
  await visit('/insights');
  const count = await page.locator('.med-report-card').count();
  assert(count > 0 && count <= 6);
  assert(!/남성|건축 리포트|기업 AX/.test(await page.locator('.med-report-grid').innerText()));
  await page.getByRole('button', {
    name: '다음 페이지',
    exact: true
  }).click();
  assert.equal(await page.getByRole('button', {
    name: '2페이지',
    exact: true
  }).getAttribute('aria-current'), 'page');
  await page.getByRole('button', {
    name: '질환 인사이트',
    exact: true
  }).click();
  assert((await page.locator('.med-report-card').count()) > 0);
  let gated = false;
  page.once('dialog', async d => {
    gated = true;
    await d.dismiss();
  });
  const protectedCard = page.locator('.med-report-card').filter({
    hasText: '비밀번호 필요'
  }).first();
  await protectedCard.click();
  assert(gated);
  assert.equal(new URL(page.url()).pathname, '/insights');
  ok('Medical report pagination, category filter and guarded link');
  let newsletterRequests = 0;
  await page.route('**/functions/v1/*/newsletter', async route => {
    newsletterRequests++;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        message: '테스트 응답: 구독 완료'
      })
    });
  });
  await page.getByLabel('이메일 주소', {
    exact: true
  }).fill('preview@example.com');
  await page.getByRole('button', {
    name: '구독하기',
    exact: true
  }).click();
  await page.getByText('테스트 응답: 구독 완료').waitFor();
  assert.equal(newsletterRequests, 1);
  assert.equal(await page.getByLabel('이메일 주소', {
    exact: true
  }).inputValue(), '');
  await page.route('**/functions/v1/*/newsletter', route => route.abort());
  await page.getByLabel('이메일 주소', {
    exact: true
  }).fill('preview@example.com');
  await page.getByRole('button', {
    name: '구독하기',
    exact: true
  }).click();
  await page.getByText('네트워크 오류가 발생했습니다. 다시 시도해주세요.').waitFor();
  ok('Newsletter success and network error UI with mocked requests only');
  await visit('/contact?type=ax');
  assert.equal(await page.getByRole('button', {
    name: '기업 AX',
    exact: true
  }).getAttribute('aria-pressed'), 'true');
  await page.getByRole('button', {
    name: '상담·직원교육',
    exact: true
  }).click();
  await page.waitForURL(url => url.searchParams.get('topic') === '상담·직원교육');
  await page.waitForFunction(() => decodeURIComponent(document.querySelector('a[href^="mailto:"]')?.getAttribute('href') || '').includes('상담·직원교육'));
  const email = await page.getByRole('link', {
    name: '메일 앱 열기'
  }).getAttribute('href');
  assert(decodeURIComponent(email).includes('상담·직원교육'));
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.getByRole('button', {
    name: '이메일 주소 복사',
    exact: true
  }).click();
  await page.getByText('이메일 주소를 복사했습니다.', {
    exact: true
  }).waitFor();
  assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'fusionsfc@gmail.com');
  assert.equal(await page.getByRole('link', {
    name: '010-9297-0940',
    exact: true
  }).first().getAttribute('href'), 'tel:+821092970940');
  ok('Contact topic, mailto, telephone and clipboard');
  for (const [from, to] of [['/services', '/ax'], ['/business', '/ax/cases'], ['/services#cases', '/ax/cases'], ['/business#how', '/ax#process'], ['/healthcare#package', '/ax/medical/jeju#package'], ['/healthcare#happylifecare', '/ax/medical#happy-life'], ['/insights?domain=business', '/ax/cases?domain=business#business-insights'], ['/insights?domain=architecture', '/ax/cases?domain=architecture#business-insights']]) {
    await page.goto(base + from);
    await page.waitForURL(base + to);
    await page.locator('main h1').first().waitFor();
  }
  ok('Legacy routes, healthcare anchors and report-domain query links');
  await visit('/projects#rusk-seoul');
  await page.waitForFunction(() => {
    const y = document.getElementById('rusk-seoul').getBoundingClientRect().top;
    return y >= 70 && y < 200;
  });
  ok('Project hash scroll clears sticky header');
  for (const route of ['/disease/breast-cancer-report', '/insights/report/202601']) {
    await visit(route);
    await page.getByRole('heading', {
      name: '리포트 접근',
      exact: true
    }).waitFor();
    await page.getByPlaceholder('비밀번호', {
      exact: true
    }).fill('preview-invalid');
    await page.getByRole('button', {
      name: '확인',
      exact: true
    }).click();
    await page.getByRole('alert').waitFor();
  }
  ok('Static and dynamic protected reports still block unauthenticated access');
  for (const route of ['/report/breast-cancer-stage-care-strategy', '/reports/liver-cancer-2026-03', '/reports/weekly/liver-care-2026-06-w4', '/reports/business/enterprise-ax-state-2026']) {
    await visit(route);
    assert.equal(await page.getByRole('heading', {
      name: '리포트 접근',
      exact: true
    }).count(), 0);
    assert((await page.locator('main').innerText()).length > 500);
  }
  ok('Public, weekly and business reports remain readable');
  await visit('/patients');
  await page.getByRole('button', {
    name: '기존 AI 상담 열기',
    exact: true
  }).click();
  await page.getByRole('heading', {
    name: 'LS 암상담',
    exact: true
  }).waitFor();
  await page.getByRole('button', {
    name: '닫기',
    exact: true
  }).click();
  ok('Patient AI consultation remains reachable without sending a message');
  assert.deepEqual(errors, []);
  ok('No uncaught browser runtime errors');
} finally {
  writeFileSync(path.join(out, 'verification.json'), JSON.stringify({
    base,
    checks,
    errors
  }, null, 2));
  await browser.close();
}
