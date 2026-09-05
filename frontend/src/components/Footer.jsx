import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './Controls/LanguageSelector';
import ThemeSelector from './Controls/ThemeSelector';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-card border-t border-border mt-auto print:hidden">
      <div className="w-full max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Intro */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <img src="/logo.svg" alt="KeyCheck Logo" className="w-7 h-7 drop-shadow-sm" />
              <span className="text-xl font-black tracking-tighter text-primary uppercase">KeyCheck</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              A browser-based keyboard testing and diagnostic tool. <br /><br />
              Test your keyboard.<br />
              Understand your input.<br />
              Keep your keyboard data local.
            </p>
          </div>

          {/* Product Links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold uppercase tracking-wider text-xs mb-1">{t('footer.product', 'Product')}</h3>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm w-fit">{t('nav.keyboardTest', 'Keyboard Test')}</Link>
            <Link to="/ghosting-test" className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm w-fit">{t('nav.multiKeyTest', 'Ghosting Test')}</Link>
            <Link to="/typing-test" className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm w-fit">{t('nav.typingTest', 'Typing Test')}</Link>
            <Link to="/event-inspector" className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm w-fit">{t('inspector.title', 'Event Inspector')}</Link>
            <Link to="/compare" className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm w-fit">{t('compare.title', 'Keyboard Comparison')}</Link>
          </div>

          {/* Tools & Info Links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold uppercase tracking-wider text-xs mb-1">{t('footer.toolsInformation', 'Tools / Information')}</h3>
            <Link to="/keyboard-layouts" className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm w-fit">{t('footer.keyboardLayouts', 'Keyboard Layouts')}</Link>
            <Link to="/keyboard-limitations" className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm w-fit">{t('footer.keyboardLimitations', 'Keyboard Limitations')}</Link>
            <Link to="/how-testing-works" className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm w-fit">{t('footer.howTestingWorks', 'How Keyboard Testing Works')}</Link>
            <Link to="/accessibility" className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm w-fit">{t('footer.accessibility', 'Accessibility')}</Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm w-fit">{t('footer.privacy', 'Privacy')}</Link>
          </div>

          {/* Language & Appearance */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold uppercase tracking-wider text-xs mb-1">{t('footer.languageAppearance', 'Language / Appearance')}</h3>
            <div className="flex flex-col gap-2 w-full max-w-[200px]">
              <LanguageSelector />
              <ThemeSelector />
            </div>
            
            <h3 className="font-bold uppercase tracking-wider text-xs mt-4 mb-1">{t('footer.resources', 'Resources')}</h3>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm w-fit">
              {t('footer.github', 'GitHub')}
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-medium">
            {t('footer.copyright', '© 2026 Keyboard Tester')}
          </p>
          <div className="flex gap-4 items-center">
            <span className="text-xs font-semibold text-primary px-2 py-1 bg-primary/10 rounded-md">
              {t('footer.privacyStrap', 'Keyboard input stays in your browser.')}
            </span>
            <div className="flex gap-3 text-xs text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm">
                {t('footer.privacy', 'Privacy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
