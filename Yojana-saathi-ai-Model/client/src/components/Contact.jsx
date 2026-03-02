import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-slate-50 w-full border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">Contact Us</h2>
                    <div className="w-16 h-1 bg-india-green mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Government Helpdesk</h3>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <Phone className="w-6 h-6 text-navy" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">National Toll-Free</p>
                                    <p className="text-lg font-bold text-slate-900">1800-11-0000</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <Phone className="w-6 h-6 text-saffron" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Regional Helpline</p>
                                    <p className="text-lg font-bold text-slate-900">1070</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <Mail className="w-6 h-6 text-india-green" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Email Support</p>
                                    <p className="text-lg font-medium text-slate-900">support@yojanasaathi.gov.in</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <Clock className="w-6 h-6 text-slate-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Office Timings</p>
                                    <p className="text-lg font-medium text-slate-900">Monday - Friday, 9:00 AM - 6:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Send an Inquiry</h3>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                                <input type="text" id="name" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-navy focus:ring-navy sm:text-sm p-3 border" placeholder="e.g. Rahul Sharma" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Mobile Number</label>
                                <input type="tel" id="phone" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-navy focus:ring-navy sm:text-sm p-3 border" placeholder="Enter 10-digit number" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
                                <textarea id="message" rows={4} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-navy focus:ring-navy sm:text-sm p-3 border" placeholder="How can we help you?"></textarea>
                            </div>
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-navy hover:bg-navy-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy transition-colors">
                                Submit Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
