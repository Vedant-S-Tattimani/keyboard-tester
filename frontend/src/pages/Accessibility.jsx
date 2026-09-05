import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { accessibilityContent } from '../i18n/content/accessibility';

const Accessibility = () => {
  const { language, t } = useLanguage();
  const content = accessibilityContent[language] || accessibilityContent.en;

  useSEO({
    title: t('seo.accessibility.title', 'Accessibility Statement — Keyboard Tester'),
    description: t('seo.accessibility.desc', 'Read our accessibility statement and commitment to inclusive design for keyboard diagnostic tools.'),
    url: 'https://keyboardtester1.com/accessibility'
  });

  return (
    <main id="main-content" className="w-full max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-300">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">{content.title || t('footer.accessibility', 'Accessibility')}</h1>
        <p className="text-xl text-muted-foreground">{content.subtitle}</p>
      </header>

      <section className="space-y-6 text-foreground/90 leading-relaxed">
        <p>
          {content.intro}
        </p>

        <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 mt-8">{content.conformanceTitle}</h2>
        <p>
          {content.conformanceText}
        </p>

        <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 mt-8">{content.featuresTitle}</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          {content.features.map((feature, index) => (
            <li key={index}>
              <strong>{feature.label}</strong> {feature.text}
            </li>
          ))}
        </ul>

        <div className="bg-card border border-border p-6 rounded-xl mt-12">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-2">{content.feedbackTitle}</h2>
          <p className="text-sm">
            {content.feedbackText}{' '}
            <a href="https://github.com" className="text-primary hover:underline font-semibold" target="_blank" rel="noreferrer">
              {content.feedbackLinkText}
            </a>
            {content.feedbackSuffix}
          </p>
        </div>
      </section>
    </main>
  );
};

export default Accessibility;
