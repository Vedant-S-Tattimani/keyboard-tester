import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { privacyContent } from '../i18n/content/privacy';

const Privacy = () => {
  const { language, t } = useLanguage();
  const content = privacyContent[language] || privacyContent.en;
  
  useSEO({
    title: t('seo.privacy.title', 'Privacy Policy — Local Data Processing'),
    description: t('seo.privacy.desc', 'Our privacy policy explains how your keyboard testing data remains local in your browser and is never transmitted.'),
    url: 'https://keyboardtester1.com/privacy'
  });

  return (
    <main id="main-content" className="w-full max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-300">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">{content.title || t('footer.privacy', 'Privacy Policy')}</h1>
        <p className="text-xl text-muted-foreground">{content.subtitle}</p>
      </header>

      <section className="space-y-6 text-foreground/90 leading-relaxed">
        
        <div className="bg-primary/10 border border-primary/20 p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold text-primary uppercase tracking-wider mb-2">{content.shortVersionTitle}</h2>
          <p className="font-medium text-lg">
            {content.shortVersionText}
          </p>
        </div>

        <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 mt-8">{content.localProcessingTitle}</h2>
        <p>
          {content.localProcessingText}
        </p>

        <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 mt-8">{content.localStorageTitle}</h2>
        <p>
          {content.localStorageIntro}
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          {content.localStorageItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="mt-4">
          {content.localStorageOutro}
        </p>

        <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 mt-8">{content.analyticsTitle}</h2>
        <p>
          {content.analyticsText}
        </p>

        <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 mt-8">{content.openSourceTitle}</h2>
        <p>
          {content.openSourceText}
        </p>

      </section>
    </main>
  );
};

export default Privacy;
