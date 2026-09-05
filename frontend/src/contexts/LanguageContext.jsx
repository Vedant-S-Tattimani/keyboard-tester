import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translations, defaultLang } from '../i18n';
import { getLangFromPathname, getCleanPath, getLocalizedPath } from '../i18n/utils';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const urlLang = getLangFromPathname(location.pathname);

  const [storedLang, setStoredLang] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('keyboard_tester_lang');
      if (saved && translations[saved]) return saved;
    }
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language.split('-')[0];
      if (translations[browserLang]) return browserLang;
    }
    return defaultLang;
  });

  // Effective language: priority is URL path language, then stored language
  const language = urlLang || storedLang;

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('keyboard_tester_lang', language);
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  const cleanPath = useMemo(() => getCleanPath(location.pathname), [location.pathname]);

  const setLanguage = useCallback((newLang) => {
    if (!translations[newLang]) return;
    setStoredLang(newLang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('keyboard_tester_lang', newLang);
    }
    const newPath = getLocalizedPath(location.pathname, newLang);
    navigate(newPath);
  }, [navigate, location.pathname]);

  const t = useCallback((key, defaultString) => {
    const dict = translations[language] || translations[defaultLang];
    return dict[key] || translations[defaultLang][key] || defaultString || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      cleanPath,
      getLocalizedPath: (p, l) => getLocalizedPath(p, l || language)
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
