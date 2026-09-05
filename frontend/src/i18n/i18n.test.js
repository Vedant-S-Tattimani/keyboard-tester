import { describe, it, expect } from 'vitest';
import { languages, defaultLang, SUPPORTED_LANGUAGES, translations } from './index';
import { getLangFromPathname, getCleanPath, getLocalizedPath } from './utils';
import { passages, getRandomPassage } from '../utils/typingPassages';

describe('i18n configuration', () => {
  const expectedCodes = ['en', 'hi', 'fil', 'pt', 'id', 'uk', 'th', 'es', 'fr', 'de'];

  it('supports exactly the 10 target languages', () => {
    expect(Object.keys(languages).sort()).toEqual([...expectedCodes].sort());
    expect(SUPPORTED_LANGUAGES.map((l) => l.code).sort()).toEqual([...expectedCodes].sort());
    expect(Object.keys(translations).sort()).toEqual([...expectedCodes].sort());
  });

  it('default language is en', () => {
    expect(defaultLang).toBe('en');
  });

  it('every locale dictionary contains essential keys', () => {
    const requiredKeys = [
      'nav.keyboardTest',
      'nav.multiKeyTest',
      'nav.typingTest',
      'home.title',
      'controls.language',
      'ghosting.title',
      'typing.title',
      'inspector.title',
      'compare.title',
      'footer.keyboardTestDesc',
      'seo.home.title',
      'seo.home.desc',
      'seo.ghostingtest.title',
      'seo.typingtest.title',
      'seo.inspector.title',
      'seo.compare.title',
      'seo.keyboardLimitations.title',
      'seo.howTestingWorks.title',
      'seo.keyboardLayouts.title',
      'seo.accessibility.title',
      'seo.privacy.title'
    ];

    expectedCodes.forEach((code) => {
      const dict = translations[code];
      expect(dict, `Locale ${code} should exist`).toBeDefined();
      requiredKeys.forEach((key) => {
        expect(dict[key], `Locale ${code} should contain key "${key}"`).toBeDefined();
        expect(dict[key].length, `Locale ${code} key "${key}" should not be empty`).toBeGreaterThan(0);
      });
    });
  });

  it('getLangFromPathname extracts supported language from URL path', () => {
    expect(getLangFromPathname('/fil')).toBe('fil');
    expect(getLangFromPathname('/fil/ghosting-test')).toBe('fil');
    expect(getLangFromPathname('/es/typing-test')).toBe('es');
    expect(getLangFromPathname('/th')).toBe('th');
    expect(getLangFromPathname('/uk/compare')).toBe('uk');
    expect(getLangFromPathname('/')).toBeNull();
    expect(getLangFromPathname('/ghosting-test')).toBeNull();
    expect(getLangFromPathname('/unknown/test')).toBeNull();
  });

  it('getCleanPath strips language prefix', () => {
    expect(getCleanPath('/fil/ghosting-test')).toBe('/ghosting-test');
    expect(getCleanPath('/th')).toBe('/');
    expect(getCleanPath('/en/typing-test')).toBe('/typing-test');
    expect(getCleanPath('/ghosting-test')).toBe('/ghosting-test');
    expect(getCleanPath('/')).toBe('/');
  });

  it('getLocalizedPath creates localized paths', () => {
    expect(getLocalizedPath('/ghosting-test', 'fil')).toBe('/fil/ghosting-test');
    expect(getLocalizedPath('/es/typing-test', 'th')).toBe('/th/typing-test');
    expect(getLocalizedPath('/', 'de')).toBe('/de');
    expect(getLocalizedPath('/en', 'uk')).toBe('/uk');
  });

  it('all 10 languages have valid typing test passages', () => {
    expectedCodes.forEach((code) => {
      const list = passages[code];
      expect(Array.isArray(list), `Passages for ${code} should be an array`).toBe(true);
      expect(list.length, `Passages for ${code} should not be empty`).toBeGreaterThan(0);
      const random = getRandomPassage(code);
      expect(typeof random).toBe('string');
      expect(random.length).toBeGreaterThan(10);
    });
  });
});
