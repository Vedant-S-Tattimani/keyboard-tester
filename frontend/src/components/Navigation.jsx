import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="w-full flex flex-wrap justify-center gap-2 md:gap-4 py-4 px-2 bg-card border-b border-border shadow-sm sticky top-0 z-50 print:hidden">
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          `px-3 md:px-4 py-2 rounded-md font-medium transition-colors text-xs md:text-sm uppercase tracking-wider ${
            isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50'
          }`
        }
      >
        Keyboard Test
      </NavLink>
      <NavLink 
        to="/ghosting-test" 
        className={({ isActive }) => 
          `px-3 md:px-4 py-2 rounded-md font-medium transition-colors text-xs md:text-sm uppercase tracking-wider ${
            isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50'
          }`
        }
      >
        Multi-Key Test
      </NavLink>
      <NavLink 
        to="/typing-test" 
        className={({ isActive }) => 
          `px-3 md:px-4 py-2 rounded-md font-medium transition-colors text-xs md:text-sm uppercase tracking-wider ${
            isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50'
          }`
        }
      >
        Typing Test
      </NavLink>
      <NavLink 
        to="/event-inspector" 
        className={({ isActive }) => 
          `px-3 md:px-4 py-2 rounded-md font-medium transition-colors text-xs md:text-sm uppercase tracking-wider ${
            isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50'
          }`
        }
      >
        Event Inspector
      </NavLink>
      <NavLink 
        to="/compare" 
        className={({ isActive }) => 
          `px-3 md:px-4 py-2 rounded-md font-medium transition-colors text-xs md:text-sm uppercase tracking-wider ${
            isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50'
          }`
        }
      >
        Compare
      </NavLink>
    </nav>
  );
};

export default Navigation;
