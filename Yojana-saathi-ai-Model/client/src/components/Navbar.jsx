import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

const Navbar = () => {
    const { t, clearLanguage } = useContext(LanguageContext);
    const navigate = useNavigate();

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            // If not on home page, navigate to home then scroll
            navigate(`/#${id}`);
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
                            <span className="text-2xl text-navy font-bold tracking-tight">{t('title')}</span>
                        </Link>
                    </div>
                    <div className="hidden md:ml-6 md:flex md:items-center space-x-8">
                        <Link to="/" className="text-slate-600 hover:text-navy font-medium transition-colors border-b-2 border-transparent hover:border-saffron pb-1">{t('home')}</Link>
                        <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-slate-600 hover:text-navy font-medium transition-colors cursor-pointer border-b-2 border-transparent hover:border-saffron pb-1">{t('about')}</a>
                        <a href="#resources" onClick={(e) => scrollToSection(e, 'resources')} className="text-slate-600 hover:text-navy font-medium transition-colors cursor-pointer border-b-2 border-transparent hover:border-saffron pb-1">{t('resources')}</a>
                        <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-slate-600 hover:text-navy font-medium transition-colors cursor-pointer border-b-2 border-transparent hover:border-saffron pb-1">{t('contactUs')}</a>

                        <Link to="/auth" className="flex items-center space-x-2 bg-navy text-white px-5 py-2.5 rounded-lg hover:bg-navy-hover transition shadow-sm hover:shadow-md border-2 border-transparent hover:border-saffron">
                            <LogIn className="w-4 h-4" />
                            <span className="font-semibold">{t('loginRegister')}</span>
                        </Link>

                        <div className="h-8 w-px bg-slate-200"></div>

                        <button onClick={clearLanguage} className="text-xs text-slate-500 hover:text-saffron transition-colors font-medium border border-slate-200 px-3 py-1.5 rounded bg-slate-50">
                            A→अ
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
