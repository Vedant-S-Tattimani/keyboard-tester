import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeSelector from './Controls/ThemeSelector';
import LanguageSelector from './Controls/LanguageSelector';
import SoundSelector from './Controls/SoundSelector';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="w-full flex flex-col items-center py-4 bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="w-full max-w-6xl px-4 flex flex-col lg:flex-row items-center justify-between gap-4">
        
        <div className="shrink-0">
          <NavLink to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
            <img src="/logo.svg" alt="KeyCheck Logo" className="w-8 h-8 drop-shadow-sm" />
            <span className="text-2xl font-black tracking-tighter text-primary uppercase">KeyCheck</span>
          </NavLink>
        </div>
        
        <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-3 flex-wrap justify-center">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-md font-medium transition-colors text-xs sm:text-sm uppercase tracking-wider ${
                isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50'
              }`
            }
          >
            {t('nav.keyboardTest')}
          </NavLink>
          <NavLink 
            to="/ghosting-test" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-md font-medium transition-colors text-xs sm:text-sm uppercase tracking-wider ${
                isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50'
              }`
            }
          >
            {t('nav.multiKeyTest')}
          </NavLink>
          <NavLink 
            to="/typing-test" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-md font-medium transition-colors text-xs sm:text-sm uppercase tracking-wider ${
                isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50'
              }`
            }
          >
            {t('nav.typingTest')}
          </NavLink>
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
