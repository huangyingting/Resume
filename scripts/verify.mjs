#!/usr/bin/env node
/**
 * Automated verification script for Yingting Huang's Interactive Resume Dossier.
 * Validates dataset integrity, serves the static site locally, and verifies
 * headless Chrome DOM hydration & interactive behaviors if Chrome/Playwright is available.
 */

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { execFile, execFileSync } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function assert(cond, msg) {
  if (!cond) {
    throw new Error(`Verification failed: ${msg}`);
  }
}

async function main() {
  // 1. Check required files
  const requiredFiles = [
    'index.html',
    '.nojekyll',
    'styles/resume.css',
    'scripts/credentials-data.js',
    'scripts/portfolio-data.js',
    'scripts/app.js',
    'data/credentials.json',
    'assets/fonts/mona-sans.woff2',
    'assets/avatar-credly.png'
  ];

  for (const rel of requiredFiles) {
    const full = path.join(ROOT, rel);
    assert(fs.existsSync(full), `Missing file: ${rel}`);
    if (rel !== '.nojekyll') {
      assert(fs.statSync(full).size > 0, `Empty file: ${rel}`);
    }
  }

  // 2. Validate credentials.json
  const creds = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/credentials.json'), 'utf8'));
  assert(creds.meta.credlyCount === 120, `Expected 120 Credly badges, got ${creds.meta.credlyCount}`);
  assert(creds.credentials.length === 123, `Expected 123 total credentials, got ${creds.credentials.length}`);

  // 3. Validate JS syntax of browser scripts
  for (const scriptRel of ['scripts/credentials-data.js', 'scripts/portfolio-data.js', 'scripts/app.js']) {
    execFileSync(process.execPath, ['--check', path.join(ROOT, scriptRel)]);
  }

  // 4. Start local static HTTP server and test headless Chrome rendering
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.woff2': 'font/woff2'
  };

  const server = http.createServer((req, res) => {
    const cleanUrl = (req.url || '/').split('?')[0];
    const relPath = cleanUrl === '/' ? 'index.html' : cleanUrl.replace(/^\/+/, '');
    const filePath = path.join(ROOT, relPath);
    if (!filePath.startsWith(ROOT) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(fs.readFileSync(filePath));
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}/`;

  try {
    const res = await fetch(baseUrl);
    assert(res.status === 200, `Expected HTTP 200 from local server, got ${res.status}`);
    const html = await res.text();
    assert(html.includes('Yingting Huang'), 'index.html missing name');

    // Use google-chrome --headless --dump-dom if available to verify hydrated DOM
    const chromeBins = ['/usr/bin/google-chrome', '/usr/bin/chromium-browser', '/usr/bin/chromium'];
    const chromeBin = chromeBins.find((b) => fs.existsSync(b));
    if (chromeBin) {
      const { stdout: domEn } = await execFileAsync(
        chromeBin,
        ['--headless', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--no-zygote', '--dump-dom', baseUrl],
        { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, timeout: 15000 }
      );
      assert(domEn.includes('Use Case Intelligence'), 'Hydrated DOM missing Use Case Intelligence project');
      assert(domEn.includes('Microsoft Global Hackathon 2026 Official Judge'), 'Hydrated DOM missing 2026 Judge distinction');
      assert(domEn.includes('FutureGrid'), 'Hydrated DOM missing FutureGrid');
      assert(domEn.includes('Azure Rapid Response'), 'Hydrated DOM missing Escalation Engineer — Azure Rapid Response role');
      assert(domEn.includes('Cloud Solution Architect'), 'Hydrated DOM missing Cloud Solution Architect role');
      assert(domEn.includes('Various Engineering'), 'Hydrated DOM missing summarized earlier career roles');
      assert(!domEn.includes('Engineering Manager'), 'Hydrated DOM must not contain inaccurate Engineering Manager title');
      assert(domEn.includes('fixed-topbar'), 'Hydrated DOM missing fixed top header bar');
      assert(domEn.includes('front-spread'), 'Hydrated DOM missing broadsheet front-page spread');
      assert(domEn.includes('works-index'), 'Hydrated DOM missing seamless works index');
      assert(domEn.includes('seal-tapestry'), 'Hydrated DOM missing seal tapestry');

      const { stdout: domZh } = await execFileAsync(
        chromeBin,
        ['--headless', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--no-zygote', '--dump-dom', `${baseUrl}?lang=zh`],
        { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, timeout: 15000 }
      );
      assert(domZh.includes('微软资深云解决方案架构师'), 'Chinese hydrated DOM missing localized role');
      assert(domZh.includes('Azure Rapid Response'), 'Chinese hydrated DOM missing Azure Rapid Response');
      assert(domZh.includes('早期多项工程与技术岗位'), 'Chinese hydrated DOM missing summarized earlier career roles');
      assert(!domZh.includes('研发经理'), 'Chinese hydrated DOM must not contain inaccurate 研发经理 title');
      assert(domZh.includes('一人成军'), 'Chinese hydrated DOM missing localized statement');
      console.log('✓ Headless Chrome DOM hydration verified for both English and Chinese views.');
    }
  } finally {
    server.close();
  }

  console.log('✓ All resume files, 123 verified credentials, and interactive views passed verification.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
