import React, { createContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState(null); // 'en', 'hi', etc. Null means language selection page

    // Simple translation helper function
    const t = (key) => {
        if (!currentLanguage || !translations[currentLanguage]) {
            return translations['en'][key] || key;
        }
        return translations[currentLanguage][key] || translations['en'][key] || key;
    };

    const changeLanguage = (langCode) => {
        setCurrentLanguage(langCode);
        localStorage.setItem('yojana_lang', langCode);
    };

    const clearLanguage = () => {
        setCurrentLanguage(null);
        localStorage.removeItem('yojana_lang');
    };

    // Optionally load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('yojana_lang');
        if (saved && translations[saved]) {
            setCurrentLanguage(saved);
        }
    }, []);

    return (
        <LanguageContext.Provider value={{ currentLanguage, changeLanguage, clearLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
