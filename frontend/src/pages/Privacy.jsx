import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';

const Privacy = () => {
  const { t } = useLanguage();
  
  useSEO({
    title: t('seo.privacy.title', 'Privacy Policy — Local Data Processing'),
    description: t('seo.privacy.desc', 'Our privacy policy explains how your keyboard testing data remains local in your browser and is never transmitted.'),
    url: 'https://keycheck.example.com/privacy'
  });

  return (
    <main id="main-content" className="w-full max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-300">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">{t('footer.privacy', 'Privacy Policy')}</h1>
        <p className="text-xl text-muted-foreground">Keyboard input stays in your browser.</p>
      </header>

      <section className="space-y-6 text-foreground/90 leading-relaxed">
        
        <div className="bg-primary/10 border border-primary/20 p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold text-primary uppercase tracking-wider mb-2">The Short Version</h2>
          <p className="font-medium text-lg">
            We do not collect, store, or transmit your keystrokes. All diagnostic testing occurs entirely on your device.
          </p>
        </div>

        <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 mt-8">Local Processing</h2>
        <p>
          KeyCheck is a client-side web application. When you press keys during the Keyboard Test, Ghosting Test, or Typing Test, the Javascript running in your browser processes those events locally. There is no backend server receiving your keyboard input.
        </p>

        <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 mt-8">Local Storage</h2>
        <p>
          We use your browser's built-in <code>localStorage</code> and <code>sessionStorage</code> to remember your preferences and test history across page reloads. This includes:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Your preferred theme (Light/Dark).</li>
          <li>Your selected language.</li>
          <li>Your recent Keyboard Test coverage results (for the History and Compare tools).</li>
        </ul>
        <p className="mt-4">
          This data remains on your hard drive and is never uploaded. You can clear this data at any time by using the "Clear History" button on the homepage, or by clearing your browser's site data.
        </p>

        <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 mt-8">Analytics and Third Parties</h2>
        <p>
          KeyCheck does not integrate third-party analytics scripts (like Google Analytics), tracking pixels, or advertising networks. We do not track your IP address or associate your test results with any identifying information.
        </p>

        <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 mt-8">Open Source Verification</h2>
        <p>
          Because privacy claims are easy to make, we believe in transparency. The source code for KeyCheck is completely open-source and available on <a href="https://github.com" className="text-primary hover:underline">GitHub</a>. Anyone is free to audit the codebase to verify that no network requests containing user input are ever made.
        </p>

      </section>
    </main>
  );
};

export default Privacy;
