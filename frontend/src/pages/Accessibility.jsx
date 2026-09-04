import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';

const Accessibility = () => {
  const { t } = useLanguage();
  
  useSEO({
    title: t('seo.accessibility.title', 'Accessibility Statement — Keyboard Tester'),
    description: t('seo.accessibility.desc', 'Read our accessibility statement and commitment to inclusive design for keyboard diagnostic tools.'),
    url: 'https://keycheck.example.com/accessibility'
  });

  return (
    <main id="main-content" className="w-full max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-300">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">{t('footer.accessibility', 'Accessibility')}</h1>
        <p className="text-xl text-muted-foreground">Our commitment to inclusive keyboard diagnostics.</p>
      </header>

      <section className="space-y-6 text-foreground/90 leading-relaxed">
        <p>
          KeyCheck is designed to be accessible to all users, regardless of how they navigate the web. Because our primary function involves complex keyboard interactions, ensuring that our application is usable via screen readers and alternative input devices is a core engineering priority.
        </p>

        <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 mt-8">Conformance Status</h2>
        <p>
          We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. Recent audits against the Vercel Web Interface Guidelines have driven improvements across our interface.
        </p>

        <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 mt-8">Accessibility Features</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Keyboard Navigation:</strong> All interactive elements, including diagnostic controls and data exports, are fully accessible via Tab navigation.</li>
          <li><strong>Visible Focus States:</strong> High-contrast focus rings are implemented globally using <code>focus-visible</code> to assist sighted keyboard users without impacting mouse users.</li>
          <li><strong>Screen Reader Support:</strong> Critical test states, timers, and WPM counters utilize <code>aria-live="polite"</code> regions to announce changes asynchronously.</li>
          <li><strong>Skip Links:</strong> A "Skip to main content" link is available to bypass the global navigation.</li>
          <li><strong>Reduced Motion:</strong> We respect the OS-level <code>prefers-reduced-motion</code> media query to disable animations for users with vestibular disorders.</li>
        </ul>

        <div className="bg-card border border-border p-6 rounded-xl mt-12">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-2">Feedback</h2>
          <p className="text-sm">
            Accessibility is an ongoing process. If you encounter any barriers while using KeyCheck, or if you rely on assistive technologies that behave unexpectedly with our keyboard event listeners, please reach out via our <a href="https://github.com" className="text-primary hover:underline">GitHub repository</a>.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Accessibility;
