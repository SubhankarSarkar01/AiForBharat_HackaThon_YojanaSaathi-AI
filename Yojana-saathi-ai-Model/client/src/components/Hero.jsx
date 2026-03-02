import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Search } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useContext(LanguageContext);

    return (
        <div className="relative overflow-hidden bg-white">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -m-32">
                <div className="bg-saffron/10 w-96 h-96 rounded-full blur-3xl mix-blend-multiply opacity-70"></div>
            </div>
            <div className="absolute top-0 left-0 -m-32">
                <div className="bg-india-green/10 w-96 h-96 rounded-full blur-3xl mix-blend-multiply opacity-70"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pb-32 lg:pt-32 lg:pb- ৪০">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl mb-6">
                        <span className="block">{t('heroTitle')}</span>
                    </h1>
                    <h2 className="mt-3 max-w-md mx-auto text-2xl text-navy font-semibold sm:text-3xl md:mt-5 md:max-w-3xl mb-4">
                        {t('heroSubtitle')}
                    </h2>
                    <p className="max-w-md mx-auto text-lg text-slate-600 sm:text-xl md:max-w-3xl mb-10">
                        {t('heroSupporting')}
                    </p>

                    <div className="mt-10 sm:flex sm:justify-center gap-4">
                        <div className="rounded-md shadow">
                            <Link
                                to="/recommend"
                                className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-navy hover:bg-navy-hover transition-all duration-300 md:text-xl shadow-[0_0_15px_rgba(0,0,128,0.3)] hover:shadow-saffron/50"
                            >
                                <Bot className="w-6 h-6 mr-2" />
                                {t('getRecommendations')}
                            </Link>
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-3">
                            <Link
                                to="/search"
                                className="w-full flex items-center justify-center px-8 py-4 border-2 border-india-green text-lg font-medium rounded-lg text-india-green bg-white hover:bg-india-green/5 transition-all duration-300 md:text-xl"
                            >
                                <Search className="w-6 h-6 mr-2" />
                                {t('searchAllSchemes')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
