import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { homeSeoContent } from '../i18n/content/homeSeoContent';

function HomeSeoSection() {
  const { language, t, getLocalizedPath } = useLanguage();
  const content = homeSeoContent[language] || homeSeoContent.en;

  return (
    <section 
      aria-label={content.guide.title} 
      className="w-full max-w-5xl mt-16 space-y-12 text-left"
    >
      {/* Informative Guide Section */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2.5 h-6 bg-primary rounded-full" />
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {content.guide.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.guide.sections.map((section, idx) => (
            <article 
              key={idx} 
              className={`p-5 rounded-xl bg-muted/20 border border-border/60 space-y-2.5 ${
                idx === content.guide.sections.length - 1 ? 'md:col-span-2' : ''
              }`}
            >
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {idx + 1}
                </span>
                {section.heading}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {section.content}
              </p>
              {/* Contextual internal link for multi-key rollover */}
              {idx === 4 && (
                <div className="pt-2">
                  <Link 
                    to={getLocalizedPath('/ghosting-test')} 
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>{t('nav.multiKeyTest')}</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Quick Diagnostic Links Bar */}
        <div className="mt-8 pt-6 border-t border-border/50 flex flex-wrap gap-4 items-center justify-between text-xs text-muted-foreground">
          <span className="font-semibold uppercase tracking-wider text-card-foreground">{t('footer.toolsInformation', 'Related Diagnostic Tools')}:</span>
          <div className="flex flex-wrap gap-3">
            <Link 
              to={getLocalizedPath('/ghosting-test')} 
              className="px-3 py-1.5 rounded-lg bg-muted/40 hover:bg-muted/80 text-foreground transition-colors font-medium"
            >
              {t('nav.multiKeyTest')}
            </Link>
            <Link 
              to={getLocalizedPath('/typing-test')} 
              className="px-3 py-1.5 rounded-lg bg-muted/40 hover:bg-muted/80 text-foreground transition-colors font-medium"
            >
              {t('nav.typingTest')}
            </Link>
            <Link 
              to={getLocalizedPath('/event-inspector')} 
              className="px-3 py-1.5 rounded-lg bg-muted/40 hover:bg-muted/80 text-foreground transition-colors font-medium"
            >
              {t('inspector.title')}
            </Link>
          </div>
        </div>
      </div>

      {/* Localized FAQ Section */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2.5 h-6 bg-primary rounded-full" />
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {content.faq.title}
          </h2>
        </div>

        <div className="space-y-3.5">
          {content.faq.items.map((item, idx) => (
            <details 
              key={idx} 
              className="group border border-border rounded-xl bg-muted/10 p-4 transition-colors hover:border-primary/40 open:bg-muted/20"
            >
              <summary className="font-semibold text-sm sm:text-base text-foreground cursor-pointer list-none flex items-center justify-between select-none">
                <span>{item.q}</span>
                <span className="ml-4 transition-transform duration-200 group-open:rotate-180 text-muted-foreground">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border/40">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeSeoSection;
