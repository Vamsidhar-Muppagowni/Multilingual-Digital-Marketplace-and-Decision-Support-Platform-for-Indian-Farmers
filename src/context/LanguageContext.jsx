import React, { createContext, useState, useContext } from 'react';
import en from '../i18/en.json';
import te from '../i18/te.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState(en);

  const switchLanguage = (lang) => {
    setLanguage(lang);
    if (lang === 'en') {
      setTranslations(en);
    } else if (lang === 'te') {
      setTranslations(te);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t: (key) => translations[key] || key }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
