import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../i18n';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('keyboard_tester_lang');
    if (saved && translations[saved]) return saved;
    // Fallback to browser language
    const browserLang = navigator.language.split('-')[0];
    return translations[browserLang] ? browserLang : 'en';
  });

  useEffect(() => {
    localStorage.setItem('keyboard_tester_lang', language);
    document.documentElement.lang = language;
    
    // RTL Support
    const rtlLanguages = ['ar', 'he', 'fa'];
    const dir = rtlLanguages.includes(language) ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
  }, [language]);

  const t = useCallback((key, defaultString) => {
    const dict = translations[language] || translations['en'];
    return dict[key] || translations['en'][key] || defaultString || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
