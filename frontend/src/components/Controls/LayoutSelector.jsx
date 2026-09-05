import React from 'react';
import { useLayout } from '../../hooks/useLayout';
import { layoutOptions } from '../Keyboard/layouts';

const LayoutSelector = ({ embedded }) => {
  const { layout, setLayout } = useLayout();

  const content = (
    <div className="flex items-center gap-1">
      {layoutOptions.map((option) => (
        <button
          key={option}
          onClick={() => setLayout(option)}
          className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
            layout === option
              ? 'bg-primary text-primary-foreground shadow-sm'
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

  if (embedded) return content;

  return (
    <div className="flex items-center gap-2 bg-card p-1 rounded-lg border border-border shadow-sm w-max">
      {content}
    </div>
  );
};

export default LayoutSelector;
