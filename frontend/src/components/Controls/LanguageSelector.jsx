import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'pt', name: 'Português' },
  { code: 'it', name: 'Italiano' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'zh', name: '中文' },
  { code: 'ar', name: 'العربية' },
  { code: 'he', name: 'עברית' },
  { code: 'ru', name: 'Русский' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' }
];

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="text-xs font-bold text-muted-foreground uppercase sr-only">
        {t('controls.language')}
      </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-card text-card-foreground border border-border rounded-md px-2 py-1 text-xs sm:text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-colors"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
