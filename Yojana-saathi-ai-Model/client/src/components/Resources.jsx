import React from 'react';
import { FileText, HelpCircle, Video, BookOpen, Download, Shield } from 'lucide-react';

const Resources = () => {
    const resourceItems = [
        { title: "Scheme Guidelines", icon: <FileText className="w-6 h-6" />, desc: "Detailed PDF guides for applying to specific schemes." },
        { title: "FAQ", icon: <HelpCircle className="w-6 h-6" />, desc: "Frequently asked questions by citizens." },
        { title: "Documentation Checklist", icon: <BookOpen className="w-6 h-6" />, desc: "A robust guide to required documents (Aadhaar, PAN, etc)." },
        { title: "Video Tutorials", icon: <Video className="w-6 h-6" />, desc: "Step-by-step application walkthroughs." },
        { title: "Citizen Help Manual", icon: <Shield className="w-6 h-6" />, desc: "Your rights and procedures under digital governance." },
        { title: "Downloadable PDFs", icon: <Download className="w-6 h-6" />, desc: "Printable forms for offline submissions." }
    ];

    return (
        <section id="resources" className="py-20 bg-white w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">Citizen Resources</h2>
                    <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full"></div>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600">
                        Access official guides, manuals, and templates to streamline your application process.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resourceItems.map((item, idx) => (
                        <div key={idx} className="flex items-start p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-shadow group cursor-pointer">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-navy text-white group-hover:bg-saffron transition-colors">
                                    {item.icon}
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-navy transition-colors">{item.title}</h3>
                                <p className="mt-1 text-slate-600 text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Resources;
