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
const domain = 'https://keyboardtester1.com';

const langs = ['en', 'hi', 'fil', 'pt', 'id', 'uk', 'th', 'es', 'fr', 'de'];

function buildHtmlForLocale(lang, isRoot = false) {
  const data = homeSeoContent[lang] || homeSeoContent.en;
  const canonicalUrl = isRoot ? `${domain}/` : `${domain}/${lang}`;
  const htmlLang = lang === 'pt' ? 'pt-BR' : lang;

  let html = template;

  // 1. Language attribute
  html = html.replace(/<html\s+lang="[^"]*"/i, `<html lang="${htmlLang}"`);

  // 2. Title & Meta description
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${data.seoTitle}</title>`);
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${data.seoDesc}" />`);

  // 3. Canonical Link
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // 4. Open Graph & Twitter
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${data.seoTitle}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${data.seoDesc}" />`);
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${data.seoTitle}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${data.seoDesc}" />`);

  // 5. Replace placeholders
  html = html.replaceAll('https://keycheck.example.com', domain);
  html = html.replaceAll('https://keyboard-tester.keyboard-tester.workers.dev', domain);

  // 6. Localized Schema.org JSON-LD Structured Data
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'KeyCheck',
      url: `${domain}/`,
      description: 'Free online keyboard tester to test every key, check rollover, and find stuck keys.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'KeyCheck Keyboard Tester',
      url: canonicalUrl,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Windows, macOS, Linux, ChromeOS',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      featureList: [
        'Real-time physical key press detection',
        'Multi-key rollover and anti-ghosting test',
        'Typing speed and accuracy test',
        'Raw KeyboardEvent diagnostic inspector',
        'Support for QWERTY, AZERTY, and QWERTZ layouts',
        'Windows and macOS modifier mapping'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faq.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a
        }
      }))
    }
  ];

  const jsonLdMarkup = `<script type="application/ld+json" id="schema-structured-data">${JSON.stringify(structuredData)}</script>`;
  if (html.includes('id="schema-structured-data"')) {
    html = html.replace(/<script\s+type="application\/ld\+json"\s+id="schema-structured-data">[\s\S]*?<\/script>/i, jsonLdMarkup);
  } else {
    html = html.replace('</head>', `  ${jsonLdMarkup}\n  </head>`);
  }

  // 7. Rich Semantic Fallback inside #root for Search Engine Bots
  const langPrefix = isRoot ? '' : `/${lang}`;
  const sectionsHtml = data.guide.sections.map((s, idx) => `
    <article style="margin-bottom: 1.5rem;">
      <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">${idx + 1}. ${s.heading}</h3>
      <p style="font-size: 0.875rem; line-height: 1.6; color: #4b5563;">${s.content}</p>
    </article>
  `).join('');

  const faqHtml = data.faq.items.map((item) => `
    <div style="margin-bottom: 1rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.75rem;">
      <dt style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.25rem;">${item.q}</dt>
      <dd style="font-size: 0.875rem; line-height: 1.5; color: #4b5563; margin-left: 0;">${item.a}</dd>
    </div>
  `).join('');

  const serverFallback = `
    <header style="text-align: center; margin: 2rem auto 1.5rem; padding: 0 1rem; max-width: 48rem;">
      <h1 style="font-size: 1.875rem; font-weight: 700; text-transform: uppercase;">${data.h1}</h1>
      <p style="color: #6b7280; font-size: 0.875rem; line-height: 1.6; margin-top: 0.75rem;">${data.twoLineBio}</p>
    </header>
    <main style="max-width: 56rem; margin: 0 auto; padding: 1rem;">
      <section style="margin-top: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem;">${data.guide.title}</h2>
        ${sectionsHtml}
        <nav style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #e5e7eb; display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="${langPrefix}/ghosting-test" style="font-size: 0.875rem; color: #2563eb; text-decoration: underline;">Multi-Key Ghosting Test</a>
          <a href="${langPrefix}/typing-test" style="font-size: 0.875rem; color: #2563eb; text-decoration: underline;">Typing Speed Test (WPM)</a>
          <a href="${langPrefix}/event-inspector" style="font-size: 0.875rem; color: #2563eb; text-decoration: underline;">Keyboard Event Inspector</a>
        </nav>
      </section>
      <section style="margin-top: 2.5rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem;">${data.faq.title}</h2>
        <dl>
          ${faqHtml}
        </dl>
      </section>
    </main>
  `;

  html = html.replace(/<div\s+id="root">\s*<\/div>/i, `<div id="root">${serverFallback}</div>`);
  return html;
}

// 1. Pre-render all 10 language paths
for (const lang of langs) {
  const html = buildHtmlForLocale(lang, false);
  const langDir = path.join(distDir, lang);
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true });
  }
  fs.writeFileSync(path.join(langDir, 'index.html'), html, 'utf8');
  console.log(`✓ Pre-rendered: /${lang}/index.html (${lang === 'pt' ? 'lang="pt-BR"' : `lang="${lang}"`})`);
}

// 2. Pre-render the root index.html (default English, canonical to root /)
const rootHtml = buildHtmlForLocale('en', true);
fs.writeFileSync(templateHtmlPath, rootHtml, 'utf8');
console.log(`✓ Pre-rendered: /index.html (default English, canonical https://keyboardtester1.com/)`);
