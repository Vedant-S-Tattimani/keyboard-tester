import React from 'react';
import { usePlatform } from '../../hooks/usePlatform';
import { useLanguage } from '../../contexts/LanguageContext';

const platformOptions = [
  { id: 'windows', label: 'Windows', icon: '🪟' },
  { id: 'mac', label: 'Mac', icon: '🍎' }
];

const PlatformSelector = ({ embedded }) => {
  const { platform, setPlatform } = usePlatform();
  const { t } = useLanguage();

  const content = (
    <div className="flex items-center gap-1">
      {platformOptions.map((option) => {
        const isActive = platform === option.id;
        return (
          <button
            key={option.id}
            onClick={() => setPlatform(option.id)}
            className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
            aria-pressed={isActive}
            aria-label={`Select ${option.label} keyboard layout`}
          >
            <span className="text-xs leading-none">{option.icon}</span>
            <span>{t(`controls.platform.${option.id}`, option.label)}</span>
          </button>
        );
      })}
    </div>
  );

  if (embedded) return content;

  return (
    <div className="flex items-center gap-1 bg-card p-1 rounded-lg border border-border shadow-sm w-max">
      {content}
    </div>
  );
};

export default PlatformSelector;
