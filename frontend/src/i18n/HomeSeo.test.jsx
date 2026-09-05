import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { homeSeoContent } from './content/homeSeoContent';
import HomeSeoSection from '../components/HomeSeoSection';
import { LanguageProvider } from '../contexts/LanguageContext';
import { BrowserRouter } from 'react-router-dom';

describe('International Home SEO Content & Component Verification', () => {
  const targetLangs = ['en', 'hi', 'fil', 'pt', 'id', 'uk', 'th', 'es', 'fr', 'de'];

  it('contains complete SEO content for all 10 languages', () => {
    expect(Object.keys(homeSeoContent).sort()).toEqual([...targetLangs].sort());

    targetLangs.forEach((lang) => {
      const data = homeSeoContent[lang];
      expect(data, `SEO data for ${lang} must exist`).toBeDefined();
      expect(data.primaryKeyword.length, `${lang} primaryKeyword`).toBeGreaterThan(0);
      expect(data.seoTitle.length, `${lang} seoTitle`).toBeGreaterThan(10);
      expect(data.seoDesc.length, `${lang} seoDesc`).toBeGreaterThan(40);
      expect(data.h1.length, `${lang} h1`).toBeGreaterThan(0);
      expect(data.twoLineBio.length, `${lang} twoLineBio`).toBeGreaterThan(30);

      // Semantic keywords: at least 5
      expect(Array.isArray(data.semanticKeywords)).toBe(true);
      expect(data.semanticKeywords.length).toBeGreaterThanOrEqual(5);

      // Guide: 5 sections
      expect(data.guide).toBeDefined();
      expect(data.guide.sections).toHaveLength(5);
      data.guide.sections.forEach((s) => {
        expect(s.heading.length).toBeGreaterThan(0);
        expect(s.content.length).toBeGreaterThan(20);
      });

      // FAQ: 5 items
      expect(data.faq).toBeDefined();
      expect(data.faq.items).toHaveLength(5);
      data.faq.items.forEach((item) => {
        expect(item.q.length).toBeGreaterThan(0);
        expect(item.a.length).toBeGreaterThan(15);
      });
    });
  });

  it('matches required H1s precisely across all 10 languages', () => {
    expect(homeSeoContent.en.h1).toBe('Test Your Keyboard');
    expect(homeSeoContent.hi.h1).toBe('अपना कीबोर्ड टेस्ट करें');
    expect(homeSeoContent.fil.h1).toBe('Subukan ang Iyong Keyboard');
    expect(homeSeoContent.pt.h1).toBe('Teste Seu Teclado');
    expect(homeSeoContent.id.h1).toBe('Tes Keyboard Anda');
    expect(homeSeoContent.uk.h1).toBe('Перевірте свою клавіатуру');
    expect(homeSeoContent.th.h1).toBe('ทดสอบคีย์บอร์ดของคุณ');
    expect(homeSeoContent.es.h1).toBe('Prueba tu Teclado');
    expect(homeSeoContent.fr.h1).toBe('Testez votre Clavier');
    expect(homeSeoContent.de.h1).toBe('Testen Sie Ihre Tastatur');
  });

  it('renders HomeSeoSection in English and localized languages', () => {
    window.history.pushState({}, '', '/de');
    const { unmount } = render(
      <BrowserRouter>
        <LanguageProvider>
          <HomeSeoSection />
        </LanguageProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('So testen Sie Ihre Tastatur online')).toBeDefined();
    expect(screen.getByText('Häufig gestellte Fragen (FAQ)')).toBeDefined();
    expect(screen.getByText('Wie kann ich meine Tastatur online testen?')).toBeDefined();
    unmount();
  });
});
