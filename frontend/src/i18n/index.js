import { en } from './locales/en';
import { hi } from './locales/hi';
import { fil } from './locales/fil';
import { pt } from './locales/pt';
import { id } from './locales/id';
import { uk } from './locales/uk';
import { th } from './locales/th';
import { es } from './locales/es';
import { fr } from './locales/fr';
import { de } from './locales/de';

export const defaultLang = 'en';

export const languages = {
  en: 'English',
  hi: 'हिन्दी',
  fil: 'Filipino',
  pt: 'Português',
  id: 'Bahasa Indonesia',
  uk: 'Українська',
  th: 'ไทย',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch'
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'fil', name: 'Filipino' },
  { code: 'pt', name: 'Português' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'uk', name: 'Українська' },
  { code: 'th', name: 'ไทย' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' }
];

export const translations = {
  en,
  hi,
  fil,
  pt,
  id,
  uk,
  th,
  es,
  fr,
  de
};
