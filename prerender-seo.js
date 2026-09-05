import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { homeSeoContent } from './frontend/src/i18n/content/homeSeoContent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'frontend', 'dist');
const templateHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(templateHtmlPath)) {
  console.error('Error: template index.html not found in frontend/dist');
  process.exit(1);
}

const template = fs.readFileSync(templateHtmlPath, 'utf8');
const domain = 'https://keyboard-tester.keyboard-tester.workers.dev';

const langs = ['en', 'hi', 'fil', 'pt', 'id', 'uk', 'th', 'es', 'fr', 'de'];

for (const lang of langs) {
  const data = homeSeoContent[lang] || homeSeoContent.en;
  const canonicalUrl = `${domain}/${lang}`;

  let html = template;

  // 1. Language attribute
  html = html.replace(/<html\s+lang="[^"]*"/i, `<html lang="${lang}"`);

  // 2. Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${data.seoTitle}</title>`);

  // 3. Meta description
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${data.seoDesc}" />`);

  // 4. Canonical
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // 5. Replace keycheck.example.com placeholders with real domain
  html = html.replaceAll('https://keycheck.example.com', domain);

  // 6. Pre-render fallback H1 and two-line intro inside #root for search engines
  const serverFallback = `
    <header class="mb-12 text-center max-w-2xl mx-auto space-y-4 mt-4 md:mt-8" style="text-align: center; margin: 2rem auto; padding: 0 1rem;">
      <h1 class="text-3xl font-bold tracking-tight text-primary uppercase" style="font-size: 1.875rem; font-weight: 700;">${data.h1}</h1>
      <p class="text-muted-foreground text-sm leading-relaxed whitespace-pre-line" style="color: #6b7280; font-size: 0.875rem; line-height: 1.625; margin-top: 1rem;">${data.twoLineBio}</p>
    </header>
  `;
  html = html.replace(/<div\s+id="root">\s*<\/div>/i, `<div id="root">${serverFallback}</div>`);

  // Create language subdirectory
  const langDir = path.join(distDir, lang);
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true });
  }

  fs.writeFileSync(path.join(langDir, 'index.html'), html, 'utf8');
  console.log(`✓ Pre-rendered: /${lang}/index.html`);
}

// Also update the root dist/index.html (default English)
const enData = homeSeoContent.en;
let rootHtml = template;
rootHtml = rootHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${enData.seoTitle}</title>`);
rootHtml = rootHtml.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${enData.seoDesc}" />`);
rootHtml = rootHtml.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${domain}/en" />`);
rootHtml = rootHtml.replaceAll('https://keycheck.example.com', domain);
const rootFallback = `
  <header class="mb-12 text-center max-w-2xl mx-auto space-y-4 mt-4 md:mt-8" style="text-align: center; margin: 2rem auto; padding: 0 1rem;">
    <h1 class="text-3xl font-bold tracking-tight text-primary uppercase" style="font-size: 1.875rem; font-weight: 700;">${enData.h1}</h1>
    <p class="text-muted-foreground text-sm leading-relaxed whitespace-pre-line" style="color: #6b7280; font-size: 0.875rem; line-height: 1.625; margin-top: 1rem;">${enData.twoLineBio}</p>
  </header>
`;
rootHtml = rootHtml.replace(/<div\s+id="root">\s*<\/div>/i, `<div id="root">${rootFallback}</div>`);
fs.writeFileSync(templateHtmlPath, rootHtml, 'utf8');
console.log(`✓ Pre-rendered: /index.html`);
