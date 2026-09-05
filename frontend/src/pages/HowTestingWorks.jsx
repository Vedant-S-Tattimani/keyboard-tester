import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { howTestingWorksContent } from '../i18n/content/howTestingWorks';

const HowTestingWorks = () => {
  const { language, t, getLocalizedPath } = useLanguage();
  const content = howTestingWorksContent[language] || howTestingWorksContent.en;

  useSEO({
    title: t('seo.howTestingWorks.title', 'How Keyboard Testing Works — Browser Event Diagnostics'),
    description: t('seo.howTestingWorks.desc', 'Learn how browser KeyboardEvents translate physical key presses into observable data for diagnostic testing.'),
    url: 'https://keyboardtester1.com/how-testing-works'
  });

  return (
    <main id="main-content" className="w-full max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-300">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">{content.title || t('footer.howTestingWorks', 'How Keyboard Testing Works')}</h1>
        <p className="text-xl text-muted-foreground">{content.subtitle}</p>
      </header>

      <section className="space-y-8 text-foreground/90 leading-relaxed">
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-black shrink-0">1</div>
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-wider mb-2">{content.step1Title}</h2>
            <p>
              {content.step1Text}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-black shrink-0">2</div>
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-wider mb-2">{content.step2Title}</h2>
            <p>
              {content.step2Text}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-black shrink-0">3</div>
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-wider mb-2">{content.step3Title}</h2>
            <p className="mb-4">
              {content.step3Text}
            </p>
            <div className="bg-muted/50 p-4 rounded-lg border border-border">
              <p className="mb-2 font-bold text-sm uppercase tracking-wider">{content.crucialPropertiesTitle}</p>
              <ul className="list-disc list-inside space-y-2 ml-2 text-sm">
                <li><code className="bg-background px-1 border border-border rounded font-mono">event.code</code>: {content.propCode.replace(/^event\.code:\s*/, '')}</li>
                <li><code className="bg-background px-1 border border-border rounded font-mono">event.key</code>: {content.propKey.replace(/^event\.key:\s*/, '')}</li>
                <li><code className="bg-background px-1 border border-border rounded font-mono">event.location</code>: {content.propLocation.replace(/^event\.location:\s*/, '')}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-black shrink-0">4</div>
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-wider mb-2">{content.step4Title}</h2>
            <p>
              {content.step4TextPart1}
              <Link to={getLocalizedPath('/ghosting-test')} className="text-primary hover:underline font-semibold">
                {content.step4GhostingLink}
              </Link>
              {content.step4TextPart2}
              <Link to={getLocalizedPath('/event-inspector')} className="text-primary hover:underline font-semibold">
                {content.step4InspectorLink}
              </Link>
              {content.step4TextPart3}
            </p>
          </div>
        </div>

      </section>
    </main>
  );
};

export default HowTestingWorks;
