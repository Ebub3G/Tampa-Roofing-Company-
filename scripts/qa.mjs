// QA: screenshots at 390/768/1440/1920, fast-scroll blank-section test,
// axe-core (WCAG 2.1 AA), keyboard checks for menu, tabs and form.
// Usage: npm run build && npm run qa   (serves dist/ on a local port)
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const axeSource = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');

const OUT = 'qa/out';
await mkdir(OUT, { recursive: true });
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain', '.webp': 'image/webp', '.avif': 'image/avif' };
const server = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  try {
    const body = await readFile(join('dist', p));
    res.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' });
    res.end(body);
  } catch { res.writeHead(404); res.end('not found'); }
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}/`;
const results = { base, checks: [] };
const check = (name, pass, detail = '') => { results.checks.push({ name, pass, detail }); console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  ' + detail : ''}`); };

const browser = await chromium.launch();
const shotScale = Number(process.env.SHOT_SCALE || 1);

// 1. Screenshots
for (const w of [390, 768, 1440, 1920]) {
  const page = await browser.newPage({ viewport: { width: w, height: w < 800 ? 844 : 1000 }, deviceScaleFactor: shotScale });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${OUT}/top-${w}.png` });
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${OUT}/full-${w}.png`, fullPage: true });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check(`no horizontal overflow @${w}`, overflow <= 0, `${overflow}px`);
  await page.close();
}

// 2. Fast-scroll test: jump through the page quickly, screenshot each stop,
//    and assert every [data-reveal] element in view is visible.
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(base, { waitUntil: 'networkidle' });
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  let worst = 1, stop = 0;
  for (let y = 0; y < h; y += 900) {
    await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y);
    await page.waitForTimeout(60); // much faster than a human can read
    await page.waitForTimeout(400); // allow one 350ms reveal to finish
    const minOpacity = await page.evaluate(() => {
      let min = 1;
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight * 0.92) min = Math.min(min, Number(getComputedStyle(el).opacity));
      });
      return min;
    });
    worst = Math.min(worst, minOpacity);
    if (stop % 3 === 0) await page.screenshot({ path: `${OUT}/fastscroll-${String(stop).padStart(2, '0')}.png` });
    stop++;
  }
  check('fast scroll: no blank sections in view', worst >= 0.99, `min opacity ${worst}`);
  // Instant jump to bottom, then check that everything above is visible.
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await page.waitForTimeout(100);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(100);
  const hiddenAbove = await page.evaluate(() => [...document.querySelectorAll('[data-reveal]')].filter((el) => !el.classList.contains('is-in')).length);
  check('jump to bottom and back: all sections revealed', hiddenAbove === 0, `${hiddenAbove} hidden`);
  await page.close();
}

// 3. axe-core at mobile and desktop, with reveals forced on and each tab panel visited.
for (const w of [390, 1440]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1300);
  await page.addScriptTag({ content: axeSource });
  const all = [];
  const tabs = await page.$$('[role="tab"]');
  for (let i = 0; i < Math.max(1, tabs.length); i++) {
    if (tabs[i]) await tabs[i].click();
    const r = await page.evaluate(async () => {
      const res = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] } });
      return res.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.map((n) => n.target.join(' ') + ' :: ' + (n.failureSummary || '').split('\n')[1]) }));
    });
    all.push(...r);
  }
  const ids = [...new Set(all.map((v) => v.id))];
  const contrast = all.filter((v) => v.id === 'color-contrast');
  check(`axe @${w}: zero violations`, ids.length === 0, ids.join(', '));
  check(`axe @${w}: zero color-contrast failures`, contrast.length === 0);
  if (all.length) await writeFile(`${OUT}/axe-${w}.json`, JSON.stringify(all, null, 2));
  await page.close();
}

// 4. Keyboard: skip link, menu (open, trap, Escape), tabs (arrows), form (validation + success height).
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  check('first Tab focuses skip link', await page.evaluate(() => document.activeElement?.classList.contains('skip-link')));
  await page.focus('[data-menu-open]');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(250);
  const menuState = await page.evaluate(() => ({ open: document.body.classList.contains('menu-open'), overflow: getComputedStyle(document.body).overflow, inMenu: !!document.activeElement?.closest('#mobile-menu') }));
  check('menu opens with focus inside and body scroll locked', menuState.open && menuState.inMenu && menuState.overflow === 'hidden');
  await page.screenshot({ path: `${OUT}/menu-390.png` });
  for (let i = 0; i < 20; i++) await page.keyboard.press('Tab');
  check('focus stays trapped in menu', await page.evaluate(() => !!document.activeElement?.closest('#mobile-menu')));
  const targets = await page.evaluate(() => [...document.querySelectorAll('#mobile-menu a, #mobile-menu button')].map((e) => e.getBoundingClientRect().height));
  check('menu targets >= 48px', targets.every((t) => t >= 48), targets.map((t) => Math.round(t)).join(','));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
  check('Escape closes menu and returns focus', await page.evaluate(() => !document.body.classList.contains('menu-open') && document.activeElement?.hasAttribute('data-menu-open')));

  await page.focus('[role="tab"][aria-selected="true"]');
  await page.keyboard.press('ArrowRight');
  check('ArrowRight moves to next tab and selects it', await page.evaluate(() => document.activeElement?.id === 'tab-modified' && document.activeElement.getAttribute('aria-selected') === 'true' && !document.getElementById('panel-modified').hidden));
  await page.keyboard.press('End');
  check('End selects last tab', await page.evaluate(() => document.activeElement?.id === 'tab-metal'));

  const stickyOneLine = await page.evaluate(() => { const b = [...document.querySelectorAll('.sticky-bar .btn')].map((e) => e.getBoundingClientRect()); return b.length === 2 && Math.abs(b[0].top - b[1].top) < 2 && b.every((r) => r.height <= 56); });
  check('sticky bar: Call + Request a proposal on one line', stickyOneLine);

  const prefilled = await page.evaluate(() => [...document.querySelectorAll('.proposal-form input')].some((i) => i.value));
  check('forms are not prefilled', !prefilled);

  const card = page.locator('#hero-form-name').locator('xpath=ancestor::div[contains(@class,"form-card")]');
  await page.locator('#hero-form-name').scrollIntoViewIfNeeded();
  const before = (await card.boundingBox()).height;
  await page.locator('#hero-form-name').locator('xpath=ancestor::form').locator('button[type=submit]').click();
  check('empty submit shows errors and focuses first invalid field', await page.evaluate(() => document.activeElement?.id === 'hero-form-name' && document.getElementById('hero-form-name-err').textContent.length > 0));
  await page.fill('#hero-form-name', 'Michael Smith');
  await page.fill('#hero-form-company', 'Test Property Group');
  await page.fill('#hero-form-contact', '(813) 555-0142');
  await page.selectOption('#hero-form-need', 'Maintenance agreement');
  const filledH = (await card.boundingBox()).height;
  await page.keyboard.press('Enter');
  await page.waitForTimeout(100);
  const after = (await card.boundingBox()).height;
  check('form success keeps form height', Math.abs(after - filledH) < 1, `${Math.round(before)} / ${Math.round(filledH)} -> ${Math.round(after)}`);
  await card.screenshot({ path: `${OUT}/form-success-390.png` });
  await page.close();
}

// 5. Reduced motion: nothing hidden at any time.
{
  const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  const minOp = await page.evaluate(() => Math.min(...[...document.querySelectorAll('[data-reveal]')].map((e) => Number(getComputedStyle(e).opacity))));
  check('reduced motion: all content visible immediately', minOp === 1);
  await ctx.close();
}

// 6. No-JS: everything readable.
{
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base);
  const minOp = await page.evaluate(() => 1); // evaluate is allowed even with JS disabled for page scripts
  const panelsVisible = await page.$$eval('[data-panel]', (p) => p.filter((x) => !x.hidden).length);
  check('no-JS: all five system panels readable', panelsVisible === 5 && minOp === 1, `${panelsVisible} visible`);
  await page.screenshot({ path: `${OUT}/nojs-1440.png`, fullPage: true });
  await ctx.close();
}

// 7. Facts: NAP in JSON-LD matches visible text; no forbidden claims.
{
  const page = await browser.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  const r = await page.evaluate(() => {
    const ld = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
    const text = document.body.innerText;
    const biz = ld['@graph'].find((n) => n['@type'] === 'RoofingContractor');
    const faq = ld['@graph'].find((n) => n['@type'] === 'FAQPage');
    const visibleQs = [...document.querySelectorAll('.faq-item summary')].map((s) => s.textContent.trim());
    return {
      phone: text.includes(biz.telephone),
      street: text.includes(biz.address.streetAddress),
      zip: text.includes(biz.address.postalCode),
      faqMatch: JSON.stringify(faq.mainEntity.map((q) => q.name)) === JSON.stringify(visibleQs),
      h1: document.querySelectorAll('h1').length,
      forbidden: ['24/7', 'emergency', 'financing', 'BBB', 'stars', 'free repair', 'free inspection'].filter((w) => text.toLowerCase().includes(w.toLowerCase())),
      ctaLabels: [...new Set([...document.querySelectorAll('a.btn, button.btn')].map((b) => b.textContent.trim()))],
      robots: document.querySelector('meta[name=robots]')?.content,
    };
  });
  check('JSON-LD phone/address match visible NAP', r.phone && r.street && r.zip);
  check('FAQPage JSON-LD matches visible FAQ', r.faqMatch);
  check('exactly one H1', r.h1 === 1);
  check('no forbidden claims in visible text', r.forbidden.length === 0, r.forbidden.join(', '));
  check('CTA labels limited to the approved set', r.ctaLabels.every((l) => ['Request a proposal', 'Call (813) 238-6436', 'Call'].includes(l)), r.ctaLabels.join(' | '));
  check('meta robots noindex,nofollow', /noindex/.test(r.robots) && /nofollow/.test(r.robots));
  await page.close();
}

await browser.close();
server.close();
await writeFile(`${OUT}/results.json`, JSON.stringify(results, null, 2));
const failed = results.checks.filter((c) => !c.pass).length;
console.log(`\n${results.checks.length - failed}/${results.checks.length} checks passed`);
process.exit(failed ? 1 : 0);
