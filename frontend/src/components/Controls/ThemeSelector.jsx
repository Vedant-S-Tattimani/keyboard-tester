import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="theme-select" className="text-xs font-bold text-muted-foreground uppercase sr-only">
        {t('controls.theme')}
      </label>
      <select
        id="theme-select"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="bg-card text-card-foreground border border-border rounded-md px-2 py-1 text-xs sm:text-sm uppercase font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-colors"
      >
        <option value="system">{t('controls.theme.system')}</option>
        <option value="light">{t('controls.theme.light')}</option>
        <option value="dark">{t('controls.theme.dark')}</option>
      </select>
    </div>
  );
};

export default ThemeSelector;
