import React from 'react';
import { TEST_MODES } from '../Keyboard/keyboardModes';

const ModeSelector = ({ activeMode, onChange }) => {
  return (
    <div className="flex flex-col items-end gap-1">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
        Test Mode
      </span>
      <div className="inline-flex bg-muted/50 p-1 rounded-lg border border-border/50">
        {Object.values(TEST_MODES).map((mode) => (
          <button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            className={`
              px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background
              ${activeMode === mode.id 
                ? 'bg-background text-foreground shadow-sm border border-border' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/80 border border-transparent'}
            `}
          >
            {mode.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModeSelector;
