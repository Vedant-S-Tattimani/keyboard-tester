import React from 'react';
import { useLayout } from '../../hooks/useLayout';
import { layoutOptions } from '../Keyboard/layouts';

const LayoutSelector = () => {
  const { layout, setLayout } = useLayout();

  return (
    <div className="flex items-center gap-2 bg-card p-1 rounded-md border border-border shadow-sm w-max">
      {layoutOptions.map((option) => (
        <button
          key={option}
          onClick={() => setLayout(option)}
          className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-card ${
            layout === option
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
          }`}
          aria-pressed={layout === option}
          aria-label={`Select ${option} keyboard layout`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default LayoutSelector;
