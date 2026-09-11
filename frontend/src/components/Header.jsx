import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeSelector from './Controls/ThemeSelector';
import LanguageSelector from './Controls/LanguageSelector';
import SoundSelector from './Controls/SoundSelector';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const { t, getLocalizedPath } = useLanguage();

  return (
    <header className="w-full flex flex-col items-center py-4 bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="w-full max-w-6xl px-4 flex flex-col lg:flex-row items-center justify-between gap-4">
        
        <div className="shrink-0">
          <NavLink to={getLocalizedPath('/')} className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
            <img src="/logo.svg" alt="KeyCheck Logo" className="w-8 h-8 drop-shadow-sm" />
            <span className="text-2xl font-black tracking-tighter text-primary uppercase">KeyCheck</span>
          </NavLink>
        </div>
        
        <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-3 flex-wrap justify-center">
          <NavLink 
            to={getLocalizedPath('/')} 
            end
            className={({ isActive }) => 
              `px-3 py-2 rounded-md font-medium transition-colors text-xs sm:text-sm uppercase tracking-wider ${
                isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50'
              }`
            }
          >
            {t('nav.keyboardTest')}
          </NavLink>
          <NavLink 
            to={getLocalizedPath('/ghosting-test')} 
            className={({ isActive }) => 
              `px-3 py-2 rounded-md font-medium transition-colors text-xs sm:text-sm uppercase tracking-wider ${
                isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50'
              }`
            }
          >
            {t('nav.multiKeyTest')}
          </NavLink>
          <NavLink 
            to={getLocalizedPath('/typing-test')} 
            className={({ isActive }) => 
              `px-3 py-2 rounded-md font-medium transition-colors text-xs sm:text-sm uppercase tracking-wider ${
                isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50'
              }`
            }
          >
            {t('nav.typingTest')}
          </NavLink>
          <a 
            href="https://screen-tester.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            title={t('nav.screenTesterTitle', 'Screen Tester – Online Screen & Monitor Test')}
            className="px-3 py-2 rounded-md font-medium transition-colors text-xs sm:text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/50 inline-flex items-center gap-1.5 group"
          >
            <span>{t('nav.screenTester', 'Screen Tester')}</span>
            <svg 
              className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </nav>
        
        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-center">
          <LanguageSelector />
          <SoundSelector />
          <ThemeSelector />
        </div>
        
      </div>
    </header>
  );
};

export default Header;
