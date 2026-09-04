import { enPassages } from './en';
import { hiPassages } from './hi';
import { esPassages } from './es';
import { frPassages } from './fr';
import { dePassages } from './de';
import { ptPassages } from './pt';
import { itPassages } from './it';
import { jaPassages } from './ja';
import { koPassages } from './ko';
import { zhPassages } from './zh';
import { arPassages } from './ar';
import { hePassages } from './he';
import { ruPassages } from './ru';
import { bnPassages } from './bn';
import { taPassages } from './ta';
import { tePassages } from './te';

export const passages = {
  en: enPassages,
  hi: hiPassages,
  es: esPassages,
  fr: frPassages,
  de: dePassages,
  pt: ptPassages,
  it: itPassages,
  ja: jaPassages,
  ko: koPassages,
  zh: zhPassages,
  ar: arPassages,
  he: hePassages,
  ru: ruPassages,
  bn: bnPassages,
  ta: taPassages,
  te: tePassages
};

export const getRandomPassage = (lang = 'en') => {
  const p = passages[lang] || passages.en;
  return p[Math.floor(Math.random() * p.length)];
};
