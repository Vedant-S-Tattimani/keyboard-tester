import { enPassages } from './en';
import { hiPassages } from './hi';
import { filPassages } from './fil';
import { ptPassages } from './pt';
import { idPassages } from './id';
import { ukPassages } from './uk';
import { thPassages } from './th';
import { esPassages } from './es';
import { frPassages } from './fr';
import { dePassages } from './de';

export const passages = {
  en: enPassages,
  hi: hiPassages,
  fil: filPassages,
  pt: ptPassages,
  id: idPassages,
  uk: ukPassages,
  th: thPassages,
  es: esPassages,
  fr: frPassages,
  de: dePassages
};

export const getRandomPassage = (lang = 'en') => {
  const p = passages[lang] || passages.en;
  return p[Math.floor(Math.random() * p.length)];
};
