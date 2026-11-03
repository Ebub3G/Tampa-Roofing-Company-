// Lighthouse (mobile, default throttling) against the built site.
// Usage: npm run build && npm run lighthouse
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  try {
    const body = await readFile(join('dist', p));
    const headers = { 'content-type': types[extname(p)] || 'application/octet-stream' };
    if (p.startsWith('/_astro/')) headers['cache-control'] = 'public, max-age=31536000, immutable';
    res.writeHead(200, headers); res.end(body);
  } catch { res.writeHead(404); res.end(); }
}).listen(0);
const url = `http://localhost:${server.address().port}/`;
const chromePath = process.env.CHROME_PATH || '/opt/pw-browsers/chromium';
let exe = chromePath;
try { const { chromium } = await import('playwright'); exe = chromium.executablePath(); } catch {}
const chrome = await chromeLauncher.launch({ chromePath: exe, chromeFlags: ['--headless=new', '--no-sandbox'] });
const { lhr } = await lighthouse(url, { port: chrome.port, output: 'json', formFactor: 'mobile', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] });
await chrome.kill(); server.close();
await mkdir('qa/out', { recursive: true });
await writeFile('qa/out/lighthouse.json', JSON.stringify(lhr, null, 2));
const scores = Object.fromEntries(Object.entries(lhr.categories).map(([k, v]) => [k, Math.round(v.score * 100)]));
console.log(scores);
console.log('CLS', lhr.audits['cumulative-layout-shift'].displayValue, '| LCP', lhr.audits['largest-contentful-paint'].displayValue, '| TBT', lhr.audits['total-blocking-time'].displayValue);
for (const [k, v] of Object.entries(lhr.categories)) for (const r of v.auditRefs) { const a = lhr.audits[r.id]; if (a.score !== null && a.score < 0.9 && r.weight > 0) console.log(`  [${k}] ${a.id}: ${a.title} (${a.displayValue || a.score})`); }
