import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { keyboardLimitationsContent } from '../i18n/content/keyboardLimitations';

const KeyboardLimitations = () => {
  const { language, t, getLocalizedPath } = useLanguage();
  const content = keyboardLimitationsContent[language] || keyboardLimitationsContent.en;
  
  useSEO({
    title: t('seo.keyboardLimitations.title', 'Keyboard Limitations — What Browser Keyboard Tests Can Detect'),
    description: t('seo.keyboardLimitations.desc', 'Understand the technical limitations of browser-based keyboard testing, including ghosting, polling rates, and OS-level shortcuts.'),
    url: 'https://keyboardtester1.com/keyboard-limitations'
  });

  return (
    <main id="main-content" className="w-full max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-300">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">{t('footer.keyboardLimitations', 'Keyboard Limitations')}</h1>
        <p className="text-xl text-muted-foreground">{content.subtitle}</p>
      </header>

      <section className="space-y-8 text-foreground/90 leading-relaxed">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-4">{content.howItWorksTitle}</h2>
          <p className="mb-4">
            {content.howItWorksP1}
          </p>
          <p>
            {content.howItWorksP2}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 mt-8">{content.canDetectTitle}</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            {content.canDetectItems.map((item, index) => (
              <li key={index}>
                <strong>{item.label}</strong> {item.text}{' '}
                {item.linkText && (
                  <Link to={getLocalizedPath(item.linkUrl || '/ghosting-test')} className="text-primary hover:underline font-semibold">
                    {item.linkText}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 mt-8">{content.cannotDetectTitle}</h2>
          <p className="mb-4 text-muted-foreground">{content.cannotDetectIntro}</p>
          <ul className="list-disc list-inside space-y-4 ml-4">
            {content.cannotDetectItems.map((item, index) => (
              <li key={index}>
                <strong>{item.label}</strong> {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 mt-8">{content.interceptionTitle}</h2>
          <p className="mb-4">
            {content.interceptionIntro}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            {content.interceptionItems.map((item, index) => (
              <li key={index}>
                <strong>{item.label}</strong> {item.text}
              </li>
            ))}
          </ul>
        </div>
      </section>
      
      <div className="mt-12 text-center">
        <Link to={getLocalizedPath('/')} className="px-6 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-wider rounded-md hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
          {content.goToTestButton || 'Go to Keyboard Test'}
        </Link>
      </div>
    </main>
  );
};

export default KeyboardLimitations;
