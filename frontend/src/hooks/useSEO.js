import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../i18n';

export const useSEO = ({ title, description, url }) => {
  const { language, cleanPath } = useLanguage();

  useEffect(() => {
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
    }

    // 3. Base URL & Canonical
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://keyboardtester1.com';
    const subpath = cleanPath === '/' ? '' : cleanPath;
    const currentLang = language || 'en';
    const canonicalUrl = `${origin}/${currentLang}${subpath}`;

    // Update og:url
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', url || canonicalUrl);

    // Update Canonical
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 4. Clean up any obsolete hreflang tags
    const validCodes = new Set(SUPPORTED_LANGUAGES.map((l) => l.code));
    validCodes.add('x-default');
    const existingAlternateLinks = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingAlternateLinks.forEach((link) => {
      const code = link.getAttribute('hreflang');
      if (!validCodes.has(code)) {
        link.remove();
      }
    });

    // 5. Inject & Update hreflang tags for each supported language
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

    // 6. Inject & Update x-default tag (pointing to default en route)
    let xDefaultLink = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
    if (!xDefaultLink) {
      xDefaultLink = document.createElement('link');
      xDefaultLink.setAttribute('rel', 'alternate');
      xDefaultLink.setAttribute('hreflang', 'x-default');
      document.head.appendChild(xDefaultLink);
    }
    xDefaultLink.setAttribute('href', `${origin}/en${subpath}`);

    // 7. Update HTML lang and direction attributes
    document.documentElement.lang = currentLang;
    document.documentElement.dir = 'ltr';
  }, [title, description, url, language, cleanPath]);
};
