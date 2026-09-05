import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../i18n';
import { homeSeoContent } from '../i18n/content/homeSeoContent';

export const useSEO = ({ title, description, url }) => {
  const { language, cleanPath } = useLanguage();

  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://keyboardtester1.com';
    const subpath = cleanPath === '/' ? '' : cleanPath;
    const currentLang = language || 'en';
    const canonicalUrl = `${origin}/${currentLang}${subpath}`;
    const effectiveUrl = url || canonicalUrl;

    // 1. Page Title
    if (title) {
      document.title = title;

      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', title);

      let twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (!twitterTitle) {
        twitterTitle = document.createElement('meta');
        twitterTitle.setAttribute('name', 'twitter:title');
        document.head.appendChild(twitterTitle);
      }
      twitterTitle.setAttribute('content', title);
    }

    // 2. Meta Description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);

      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (!ogDescription) {
        ogDescription = document.createElement('meta');
        ogDescription.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescription);
      }
      ogDescription.setAttribute('content', description);

      let twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (!twitterDescription) {
        twitterDescription = document.createElement('meta');
        twitterDescription.setAttribute('name', 'twitter:description');
        document.head.appendChild(twitterDescription);
      }
      twitterDescription.setAttribute('content', description);
    }

    // 3. Open Graph Type, Site Name & Image
    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      document.head.appendChild(ogType);
    }
    ogType.setAttribute('content', 'website');

    let ogSiteName = document.querySelector('meta[property="og:site_name"]');
    if (!ogSiteName) {
      ogSiteName = document.createElement('meta');
      ogSiteName.setAttribute('property', 'og:site_name');
      document.head.appendChild(ogSiteName);
    }
    ogSiteName.setAttribute('content', 'KeyCheck');

    const ogImageUrl = `${origin}/logo.svg`;
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', ogImageUrl);

    let twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
      twitterCard = document.createElement('meta');
      twitterCard.setAttribute('name', 'twitter:card');
      document.head.appendChild(twitterCard);
    }
    twitterCard.setAttribute('content', 'summary');

    // 4. Update og:url
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', effectiveUrl);

    // 5. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 6. Clean up any obsolete hreflang tags
    const validCodes = new Set(SUPPORTED_LANGUAGES.map((l) => l.code));
    validCodes.add('x-default');
    const existingAlternateLinks = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingAlternateLinks.forEach((link) => {
      const code = link.getAttribute('hreflang');
      if (!validCodes.has(code)) {
        link.remove();
      }
    });

    // 7. Inject & Update hreflang tags for each supported language
    SUPPORTED_LANGUAGES.forEach(({ code }) => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${code}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', code);
        document.head.appendChild(link);
      }
      link.setAttribute('href', `${origin}/${code}${subpath}`);
    });

    // 8. Inject & Update x-default tag (pointing to default en route)
    let xDefaultLink = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
    if (!xDefaultLink) {
      xDefaultLink = document.createElement('link');
      xDefaultLink.setAttribute('rel', 'alternate');
      xDefaultLink.setAttribute('hreflang', 'x-default');
      document.head.appendChild(xDefaultLink);
    }
    xDefaultLink.setAttribute('href', `${origin}/en${subpath}`);

    // 9. Update HTML lang (pt -> pt-BR as required by spec) and direction attributes
    const htmlLang = currentLang === 'pt' ? 'pt-BR' : currentLang;
    document.documentElement.lang = htmlLang;
    document.documentElement.dir = 'ltr';

    // 10. Inject / Update Schema.org Structured Data (WebSite, WebApplication, FAQPage)
    if (cleanPath === '/' || cleanPath === '') {
      const seoData = homeSeoContent[currentLang] || homeSeoContent.en;
      const structuredData = [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'KeyCheck',
          url: `${origin}/`,
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
          mainEntity: seoData.faq.items.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a
            }
          }))
        }
      ];

      let schemaScript = document.getElementById('schema-structured-data');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'schema-structured-data';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, url, language, cleanPath]);
};
