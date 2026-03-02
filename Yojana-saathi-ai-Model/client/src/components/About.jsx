import React from 'react';
import { ShieldCheck, Brain, Mic, Building } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-20 bg-slate-50 w-full overflow-hidden relative">
            <div className="absolute top-0 right-0 -m-32">
                <div className="bg-saffron/5 w-96 h-96 rounded-full blur-3xl mix-blend-multiply opacity-70"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">About Yojana Saathi AI</h2>
                    <div className="w-16 h-1 bg-india-green mx-auto mt-4 rounded-full"></div>
                    <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-600">
                        A citizen-centric digital platform designed to bridge the gap between Indian citizens and government welfare schemes through the power of Artificial Intelligence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-navy/20 transition-all group">
                        <div className="w-14 h-14 bg-navy/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-navy group-hover:text-white transition-colors text-navy">
                            <Brain className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">AI Eligibility Engine</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Our advanced algorithms match your unique profile parameters with thousands of central and state government schemes instantly.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-saffron/20 transition-all group">
                        <div className="w-14 h-14 bg-saffron/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-saffron group-hover:text-white transition-colors text-saffron">
                            <Mic className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Voice Assistant Support</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Access information naturally by speaking in your native language. Our system understands and responds to voice commands.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-india-green/20 transition-all group">
                        <div className="w-14 h-14 bg-india-green/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-india-green group-hover:text-white transition-colors text-india-green">
                            <ShieldCheck className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Fraud Prevention</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Robust security measures and real-time verification ensure that benefits reach the genuine intended beneficiaries securely.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-navy/20 transition-all group">
                        <div className="w-14 h-14 bg-navy/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-navy group-hover:text-white transition-colors text-navy">
                            <Building className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Transparent Governance</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Track your application status in real-time. We bring complete transparency to government benefit distribution.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
