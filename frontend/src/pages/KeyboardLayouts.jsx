import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { keyboardLayoutsContent } from '../i18n/content/keyboardLayouts';

const KeyboardLayouts = () => {
  const { language, t, getLocalizedPath } = useLanguage();
  const content = keyboardLayoutsContent[language] || keyboardLayoutsContent.en;

  useSEO({
    title: t('seo.keyboardLayouts.title', 'Keyboard Layouts — Physical vs Logical Key Mapping'),
    description: t('seo.keyboardLayouts.desc', 'Explore how different physical keyboard layouts (QWERTY, AZERTY, etc.) interact with operating systems and browser events.'),
    url: 'https://keyboardtester1.com/keyboard-layouts'
  });

  return (
    <main id="main-content" className="w-full max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-300">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">{content.title || t('footer.keyboardLayouts', 'Keyboard Layouts')}</h1>
        <p className="text-xl text-muted-foreground">{content.subtitle}</p>
      </header>

      <section className="space-y-8 text-foreground/90 leading-relaxed">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-4">{content.layersTitle}</h2>
          <p className="mb-4">
            {content.layersIntro}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-muted/30 border border-border/50 rounded-lg">
              <h3 className="font-bold text-primary mb-2">{content.layer1Title}</h3>
              <p className="text-sm">{content.layer1Text}</p>
            </div>
            <div className="p-4 bg-muted/30 border border-border/50 rounded-lg">
              <h3 className="font-bold text-primary mb-2">{content.layer2Title}</h3>
              <p className="text-sm">{content.layer2Text}</p>
            </div>
            <div className="p-4 bg-muted/30 border border-border/50 rounded-lg">
              <h3 className="font-bold text-primary mb-2">{content.layer3Title}</h3>
              <p className="text-sm">{content.layer3Text}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-4">{content.supportedTitle}</h2>
          <p className="mb-4">
            {content.supportedIntro}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            {content.supportedItems.map((item, index) => {
              const [name, ...desc] = item.split(':');
              return (
                <li key={index}>
                  <strong>{name}:</strong>{desc.length > 0 ? desc.join(':') : ''}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-xl mt-8">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-2 text-amber-500">{content.whyMismatchTitle}</h2>
          <p className="text-sm">
            {content.whyMismatchText1}
          </p>
          <p className="text-sm mt-2">
            {content.whyMismatchText2}
          </p>
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

export default KeyboardLayouts;
