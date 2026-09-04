import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full flex flex-col items-center py-6 bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="mb-4">
        <span className="text-2xl font-black tracking-tighter text-primary uppercase">KeyCheck</span>
      </div>
      <nav className="flex gap-2 sm:gap-4 flex-wrap justify-center">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `px-3 py-2 rounded-md font-medium transition-colors text-xs sm:text-sm uppercase tracking-wider ${
              isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50'
            }`
          }
        >
          Keyboard Test
        </NavLink>
        <NavLink 
          to="/ghosting-test" 
          className={({ isActive }) => 
            `px-3 py-2 rounded-md font-medium transition-colors text-xs sm:text-sm uppercase tracking-wider ${
              isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50'
            }`
          }
        >
          Multi-Key Test
        </NavLink>
        <NavLink 
          to="/typing-test" 
          className={({ isActive }) => 
            `px-3 py-2 rounded-md font-medium transition-colors text-xs sm:text-sm uppercase tracking-wider ${
              isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50'
            }`
          }
        >
          Typing Test
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
