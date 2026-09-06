import React from 'react';
import { TEST_MODES } from '../Keyboard/keyboardModes';
import { useLanguage } from '../../contexts/LanguageContext';

const ModeSelector = ({ activeMode, onChange, embedded }) => {
  const { t } = useLanguage();
  const content = (
    <div className="flex items-center gap-1">
      {Object.values(TEST_MODES).map((mode) => (
        <button
          key={mode.id}
          onClick={() => onChange(mode.id)}
          aria-pressed={activeMode === mode.id}
          className={`
            px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1
            ${activeMode === mode.id 
              ? 'bg-primary text-primary-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}
          `}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );

  if (embedded) return content;

  return (
    <div className="flex flex-col items-end gap-1">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
        {t('controls.mode', 'Test Mode')}
      </span>
      <div className="inline-flex bg-muted/50 p-1 rounded-lg border border-border/50">
        {content}
      </div>
    </div>
  );
};

export default ModeSelector;
