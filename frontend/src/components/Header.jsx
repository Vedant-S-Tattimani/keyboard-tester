import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeSelector from './Controls/ThemeSelector';
import LanguageSelector from './Controls/LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="w-full flex flex-col items-center py-6 bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="w-full max-w-5xl px-4 flex flex-col md:flex-row justify-between items-center relative gap-4">
        
        <div className="flex-1 md:flex-none">
          <span className="text-2xl font-black tracking-tighter text-primary uppercase">KeyCheck</span>
        </div>
        
        <nav aria-label="Main navigation" className="flex flex-1 justify-center gap-2 sm:gap-4 flex-wrap">
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
        
        <div className="flex flex-1 justify-center md:justify-end gap-2 md:absolute md:right-4">
          <LanguageSelector />
          <ThemeSelector />
        </div>
        
      </div>
    </header>
  );
};

export default Header;
