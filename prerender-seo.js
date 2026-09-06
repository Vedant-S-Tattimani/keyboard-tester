import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { homeSeoContent } from './frontend/src/i18n/content/homeSeoContent.js';
import { en } from './frontend/src/i18n/locales/en.js';
import { hi } from './frontend/src/i18n/locales/hi.js';
import { fil } from './frontend/src/i18n/locales/fil.js';
import { pt } from './frontend/src/i18n/locales/pt.js';
import { id } from './frontend/src/i18n/locales/id.js';
import { uk } from './frontend/src/i18n/locales/uk.js';
import { th } from './frontend/src/i18n/locales/th.js';
import { es } from './frontend/src/i18n/locales/es.js';
import { fr } from './frontend/src/i18n/locales/fr.js';
import { de } from './frontend/src/i18n/locales/de.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'frontend', 'dist');
const templateHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(templateHtmlPath)) {
  console.error('Error: template index.html not found in frontend/dist');
  process.exit(1);
}

// Clean template by ensuring #root is empty and resetting canonical/hreflang/structured data placeholders
let rawTemplate = fs.readFileSync(templateHtmlPath, 'utf8');
const cleanTemplate = rawTemplate.replace(/<div\s+id="root">[\s\S]*?<\/div>/i, '<div id="root"></div>');

const domain = 'https://keyboardtester1.com';

const langs = ['en', 'hi', 'fil', 'pt', 'id', 'uk', 'th', 'es', 'fr', 'de'];
const translations = { en, hi, fil, pt, id, uk, th, es, fr, de };

function buildHtmlForLocale(lang, isRoot = false) {
  const data = homeSeoContent[lang] || homeSeoContent.en;
  const t = translations[lang] || translations.en;
  const canonicalUrl = isRoot ? `${domain}/` : `${domain}/${lang}`;
  const htmlLang = lang === 'pt' ? 'pt-BR' : lang;

  let html = cleanTemplate;

  // 1. Language attribute
  html = html.replace(/<html\s+lang="[^"]*"/i, `<html lang="${htmlLang}"`);

  // 2. Title & Meta description
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${data.seoTitle}</title>`);
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${data.seoDesc}" />`);

  // 3. Canonical Link
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // 4. Hreflang links for Home
  const hreflangTags = langs.map(l => 
    `<link rel="alternate" hreflang="${l}" href="${domain}/${l}" />`
  ).concat([
    `<link rel="alternate" hreflang="x-default" href="${domain}/en" />`
  ]).join('\n    ');

  html = html.replace(/(<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href="[^"]*"\s*\/?>\s*)+/i, `${hreflangTags}\n    `);

  // 5. Open Graph & Twitter
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${data.seoTitle}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${data.seoDesc}" />`);
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${data.seoTitle}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${data.seoDesc}" />`);

  // 6. Replace domain placeholders
  html = html.replaceAll('https://keycheck.example.com', domain);
  html = html.replaceAll('https://keyboard-tester.keyboard-tester.workers.dev', domain);

  // 7. Localized Schema.org JSON-LD Structured Data
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

  // 8. Rich Semantic Fallback inside #root for Search Engine Bots
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

  const multiKeyText = t['nav.multiKeyTest'] || 'Multi-Key Ghosting Test';
  const typingText = t['nav.typingTest'] || 'Typing Speed Test (WPM)';
  const inspectorText = t['inspector.title'] || 'Keyboard Event Inspector';

  const serverFallback = `
    <div style="width: 100%; padding: 2rem 1rem; display: flex; flex-direction: column; align-items: center;">
      <header style="text-align: center; margin: 1rem auto 2.5rem; padding: 0 1rem; max-width: 48rem;">
        <h1 style="font-size: 1.875rem; font-weight: 700; text-transform: uppercase; letter-spacing: -0.025em;">${data.h1}</h1>
        <p style="color: #6b7280; font-size: 0.875rem; line-height: 1.6; margin-top: 0.75rem; white-space: pre-line;">${data.twoLineBio}</p>
      </header>

      <!-- Pre-rendered Keyboard Placeholder -->
      <div style="width: 100%; max-width: 1240px; margin: 0 auto 0.75rem; height: 48px; border-radius: 0.75rem; border: 1px solid rgba(125, 125, 125, 0.18); background: rgba(125, 125, 125, 0.03);"></div>
      <div style="width: 100%; max-width: 1240px; min-height: 360px; margin: 0 auto; border-radius: 1rem; border: 1px solid rgba(125, 125, 125, 0.18); background: rgba(125, 125, 125, 0.02); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; color: #6b7280; font-family: sans-serif;">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.6;"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="6" y1="8" x2="6" y2="8"/><line x1="10" y1="8" x2="10" y2="8"/><line x1="14" y1="8" x2="14" y2="8"/><line x1="18" y1="8" x2="18" y2="8"/><line x1="6" y1="12" x2="6" y2="12"/><line x1="10" y1="12" x2="10" y2="12"/><line x1="14" y1="12" x2="14" y2="12"/><line x1="18" y1="12" x2="18" y2="12"/><line x1="7" y1="16" x2="17" y2="16"/></svg>
        <span style="font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.75;">KeyCheck Interactive Keyboard</span>
      </div>
      <div style="width: 100%; max-width: 1024px; min-height: 110px; margin: 1.5rem auto; border-radius: 0.75rem; border: 1px solid rgba(125, 125, 125, 0.15); background: rgba(125, 125, 125, 0.02);"></div>

      <!-- Pre-rendered SEO Guide & FAQ -->
      <main style="width: 100%; max-width: 64rem; margin: 2rem auto 0; text-align: left;">
        <section style="margin-top: 2rem;">
          <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem;">${data.guide.title}</h2>
          ${sectionsHtml}
          <nav style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(125, 125, 125, 0.2); display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="${langPrefix}/ghosting-test" style="font-size: 0.875rem; color: #2563eb; text-decoration: underline;">${multiKeyText}</a>
            <a href="${langPrefix}/typing-test" style="font-size: 0.875rem; color: #2563eb; text-decoration: underline;">${typingText}</a>
            <a href="${langPrefix}/event-inspector" style="font-size: 0.875rem; color: #2563eb; text-decoration: underline;">${inspectorText}</a>
          </nav>
        </section>
        <section style="margin-top: 2.5rem;">
          <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem;">${data.faq.title}</h2>
          <dl>
            ${faqHtml}
          </dl>
        </section>
      </main>
    </div>
  `;

  html = html.replace(/<div\s+id="root">[\s\S]*?<\/div>/i, `<div id="root">${serverFallback}</div>`);
  return html;
}

const subpages = [
  { path: 'ghosting-test', titleKey: 'seo.ghostingtest.title', descKey: 'seo.ghostingtest.desc', h1Key: 'nav.multiKeyTest' },
  { path: 'typing-test', titleKey: 'seo.typingtest.title', descKey: 'seo.typingtest.desc', h1Key: 'nav.typingTest' },
  { path: 'event-inspector', titleKey: 'seo.inspector.title', descKey: 'seo.inspector.desc', h1Key: 'inspector.title' },
  { path: 'compare', titleKey: 'seo.compare.title', descKey: 'seo.compare.desc', h1Key: 'compare.title' },
  { path: 'keyboard-limitations', titleKey: 'seo.keyboardLimitations.title', descKey: 'seo.keyboardLimitations.desc', h1Key: 'footer.keyboardLimitations' },
  { path: 'how-testing-works', titleKey: 'seo.howTestingWorks.title', descKey: 'seo.howTestingWorks.desc', h1Key: 'footer.howTestingWorks' },
  { path: 'keyboard-layouts', titleKey: 'seo.keyboardLayouts.title', descKey: 'seo.keyboardLayouts.desc', h1Key: 'footer.keyboardLayouts' },
  { path: 'accessibility', titleKey: 'seo.accessibility.title', descKey: 'seo.accessibility.desc', h1Key: 'footer.accessibility' },
  { path: 'privacy', titleKey: 'seo.privacy.title', descKey: 'seo.privacy.desc', h1Key: 'footer.privacy' },
];

function buildHtmlForSubpage(subpage, lang, isRoot = false) {
  const t = translations[lang] || translations.en;
  const canonicalUrl = isRoot ? `${domain}/${subpage.path}` : `${domain}/${lang}/${subpage.path}`;
  const htmlLang = lang === 'pt' ? 'pt-BR' : lang;
  const pageTitle = t[subpage.titleKey] || `${subpage.path} - KeyCheck`;
  const pageDesc = t[subpage.descKey] || '';
  const pageH1 = t[subpage.h1Key] || pageTitle;

  let html = cleanTemplate;

  // 1. Language attribute
  html = html.replace(/<html\s+lang="[^"]*"/i, `<html lang="${htmlLang}"`);

  // 2. Title & Meta description
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${pageTitle}</title>`);
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${pageDesc}" />`);

  // 3. Canonical Link
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // 4. Hreflang links for this subpage
  const hreflangTags = langs.map(l => 
    `<link rel="alternate" hreflang="${l}" href="${domain}/${l}/${subpage.path}" />`
  ).concat([
    `<link rel="alternate" hreflang="x-default" href="${domain}/en/${subpage.path}" />`
  ]).join('\n    ');

  html = html.replace(/(<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href="[^"]*"\s*\/?>\s*)+/i, `${hreflangTags}\n    `);

  // 5. Open Graph & Twitter
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${pageTitle}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${pageDesc}" />`);
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${pageTitle}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${pageDesc}" />`);

  // 6. Replace domain placeholders
  html = html.replaceAll('https://keycheck.example.com', domain);
  html = html.replaceAll('https://keyboard-tester.keyboard-tester.workers.dev', domain);

  // 7. Subpage Schema
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
      name: `KeyCheck - ${pageH1}`,
      url: canonicalUrl,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Windows, macOS, Linux, ChromeOS',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  ];
  const jsonLdMarkup = `<script type="application/ld+json" id="schema-structured-data">${JSON.stringify(structuredData)}</script>`;
  if (html.includes('id="schema-structured-data"')) {
    html = html.replace(/<script\s+type="application\/ld\+json"\s+id="schema-structured-data">[\s\S]*?<\/script>/i, jsonLdMarkup);
  } else {
    html = html.replace('</head>', `  ${jsonLdMarkup}\n  </head>`);
  }

  // 8. Server fallback for crawlers with visible localized H1
  const subpageFallback = `
    <div style="width: 100%; padding: 2rem 1rem; max-width: 64rem; margin: 0 auto; text-align: left;">
      <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">${pageH1}</h1>
      <p style="color: #6b7280; font-size: 1rem; line-height: 1.6;">${pageDesc}</p>
    </div>
  `;
  html = html.replace(/<div\s+id="root">[\s\S]*?<\/div>/i, `<div id="root">${subpageFallback}</div>`);

  return html;
}

// 1. Pre-render home pages for all 10 languages
for (const lang of langs) {
  const html = buildHtmlForLocale(lang, false);
  const langDir = path.join(distDir, lang);
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true });
  }
  fs.writeFileSync(path.join(langDir, 'index.html'), html, 'utf8');
  console.log(`✓ Pre-rendered: /${lang}/index.html (${lang === 'pt' ? 'lang="pt-BR"' : `lang="${lang}"`})`);
}

// 2. Pre-render root home page (default English, canonical to root /)
const rootHtml = buildHtmlForLocale('en', true);
fs.writeFileSync(templateHtmlPath, rootHtml, 'utf8');
console.log(`✓ Pre-rendered: /index.html (default English, canonical ${domain}/)`);

// 3. Pre-render all subpages for each language and root
for (const sub of subpages) {
  // Pre-render root subpage (e.g. /ghosting-test/index.html)
  const rootSubHtml = buildHtmlForSubpage(sub, 'en', true);
  const rootSubDir = path.join(distDir, sub.path);
  if (!fs.existsSync(rootSubDir)) {
    fs.mkdirSync(rootSubDir, { recursive: true });
  }
  fs.writeFileSync(path.join(rootSubDir, 'index.html'), rootSubHtml, 'utf8');

  // Pre-render localized subpages (e.g. /hi/ghosting-test/index.html)
  for (const lang of langs) {
    const subHtml = buildHtmlForSubpage(sub, lang, false);
    const subDir = path.join(distDir, lang, sub.path);
    if (!fs.existsSync(subDir)) {
      fs.mkdirSync(subDir, { recursive: true });
    }
    fs.writeFileSync(path.join(subDir, 'index.html'), subHtml, 'utf8');
  }
  console.log(`✓ Pre-rendered subpage across 10 languages: /${sub.path}`);
}

// 4. Generate comprehensive multilingual sitemap.xml
function generateSitemap() {
  const routes = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    ...subpages.map(s => ({
      path: s.path,
      priority: ['ghosting-test', 'typing-test'].includes(s.path) ? '0.9' : '0.8',
      changefreq: ['ghosting-test', 'typing-test'].includes(s.path) ? 'weekly' : 'monthly'
    }))
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const r of routes) {
    const isRootRoute = r.path === '';
    
    // Root URL entry
    const rootLoc = isRootRoute ? `${domain}/` : `${domain}/${r.path}`;
    xml += `  <url>\n`;
    xml += `    <loc>${rootLoc}</loc>\n`;
    for (const l of langs) {
      const altHref = isRootRoute ? `${domain}/${l}` : `${domain}/${l}/${r.path}`;
      xml += `    <xhtml:link rel="alternate" hreflang="${l}" href="${altHref}" />\n`;
    }
    const xDefaultHref = isRootRoute ? `${domain}/en` : `${domain}/en/${r.path}`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefaultHref}" />\n`;
    xml += `    <changefreq>${r.changefreq}</changefreq>\n`;
    xml += `    <priority>${r.priority}</priority>\n`;
    xml += `  </url>\n`;

    // Localized URL entries
    for (const l of langs) {
      const loc = isRootRoute ? `${domain}/${l}` : `${domain}/${l}/${r.path}`;
      xml += `  <url>\n`;
      xml += `    <loc>${loc}</loc>\n`;
      for (const otherLang of langs) {
        const altHref = isRootRoute ? `${domain}/${otherLang}` : `${domain}/${otherLang}/${r.path}`;
        xml += `    <xhtml:link rel="alternate" hreflang="${otherLang}" href="${altHref}" />\n`;
      }
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefaultHref}" />\n`;
      xml += `    <changefreq>${r.changefreq}</changefreq>\n`;
      xml += `    <priority>${r.priority}</priority>\n`;
      xml += `  </url>\n`;
    }
  }

  xml += `</urlset>\n`;

  const sitemapDistPath = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(sitemapDistPath, xml, 'utf8');
  
  // Also keep frontend/public/sitemap.xml updated
  const sitemapPublicPath = path.join(__dirname, 'frontend', 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPublicPath, xml, 'utf8');
  console.log('✓ Generated comprehensive multilingual sitemap.xml with full hreflang mapping.');
}

generateSitemap();
console.log('✓ All 10 language routes and subpages pre-rendered successfully.');
