import { translations, defaultLang } from './index';

export function getLangFromPathname(pathname) {
  if (!pathname) return null;
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (first && translations[first]) {
    return first;
  }
  return null;
}

export function getCleanPath(pathname) {
  if (!pathname) return '/';
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] && translations[segments[0]]) {
    segments.shift();
  }
  return '/' + segments.join('/');
}

export function getLocalizedPath(pathname, targetLang) {
  const clean = getCleanPath(pathname);
  if (clean === '/' || clean === '') {
    return `/${targetLang}`;
  }
  return `/${targetLang}${clean}`;
}

export function useTranslations(lang) {
  const dict = translations[lang] || translations[defaultLang];
  return function t(key, defaultString) {
    return dict[key] || translations[defaultLang][key] || defaultString || key;
  };
}
