import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { homeSeoContent } from '../i18n/content/homeSeoContent';

function HomeSeoSection() {
  const { language } = useLanguage();
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
                idx === 4 ? 'md:col-span-2' : ''
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
            </article>
          ))}
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
