import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200 mt-12 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
                <p className="text-slate-500 flex items-center gap-1 mb-2">
                    Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for AI For Bharat Hackathon
                </p>
                <p className="text-slate-400 text-sm">
                    &copy; {new Date().getFullYear()} YojanaSaathi AI. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
