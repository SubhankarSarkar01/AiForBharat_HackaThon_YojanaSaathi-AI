import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const LanguageSelection = () => {
    const { changeLanguage } = useContext(LanguageContext);

    const languages = [
        { code: 'en', name: translations.en.languageName },
        { code: 'hi', name: translations.hi.languageName },
        { code: 'bn', name: translations.bn.languageName },
        { code: 'ur', name: translations.ur.languageName },
        { code: 'mr', name: translations.mr.languageName },
        { code: 'ta', name: translations.ta.languageName },
        { code: 'te', name: translations.te.languageName },
        { code: 'kn', name: translations.kn.languageName },
        { code: 'gu', name: translations.gu.languageName },
        { code: 'pa', name: translations.pa.languageName },
        { code: 'ml', name: translations.ml.languageName },
        { code: 'or', name: translations.or.languageName },
        { code: 'as', name: translations.as.languageName }
    ];

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
            {/* Background Image Setup Placeholder with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")', // Example Indian culture collage / soft background
                }}
            >
                <div className="absolute inset-0 bg-navy/85 backdrop-blur-sm"></div>
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
                        Select Your Language
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-bold text-saffron mb-4 drop-shadow-md">
                        अपनी भाषा चुनें
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-bold text-india-green drop-shadow-md">
                        আপনার ভাষা নির্বাচন করুন
                    </h3>
                    <p className="mt-6 text-slate-200 text-lg">
                        Choose your preferred language to customize your portal experience
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className="bg-white/95 hover:bg-white text-slate-800 text-xl font-medium py-6 px-4 rounded-xl shadow-lg border-2 border-transparent hover:border-saffron hover:shadow-saffron/20 hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-2xl">{lang.name}</span>
                                <span className="text-sm text-slate-500 font-normal uppercase tracking-wider">{lang.code}</span>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-16 text-white/60 text-sm">
                    A Government of India Initiative Digital Platform
                </div>
            </div>
        </div>
    );
};

export default LanguageSelection;
