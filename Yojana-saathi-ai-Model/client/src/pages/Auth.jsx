import React, { useState, useContext } from 'react';
import { Shield, KeyRound, Smartphone, LogIn, UserPlus } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

const Auth = () => {
    const [authMode, setAuthMode] = useState('login'); // 'login', 'register', 'forgot'
    const { t } = useContext(LanguageContext);

    const toggleMode = (mode) => {
        setAuthMode(mode);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background styling elements */}
            <div className="absolute top-0 right-0 -m-32">
                <div className="bg-saffron/10 w-96 h-96 rounded-full blur-3xl opacity-70"></div>
            </div>
            <div className="absolute bottom-0 left-0 -m-32">
                <div className="bg-india-green/10 w-96 h-96 rounded-full blur-3xl opacity-70"></div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="flex justify-center flex-col items-center">
                    <img src="/emblem.svg" alt="Emblem" className="h-16 w-auto mb-4" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
                    <h2 className="text-center text-3xl font-extrabold text-navy">
                        {t('title')}
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-600">
                        Citizen Authentication Portal
                    </p>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl relative z-10 border-t-4 border-saffron rounded-t-lg">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-t-0 border-slate-200">

                    {/* Tabs */}
                    <div className="flex border-b border-slate-200 mb-8">
                        <button
                            onClick={() => toggleMode('login')}
                            className={`flex-1 py-4 text-center font-medium text-sm transition-colors relative ${authMode === 'login' ? 'text-navy' : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            <LogIn className="w-5 h-5 mx-auto mb-1" />
                            {t('login') || 'Login'}
                            {authMode === 'login' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy rounded-t-md"></div>}
                        </button>
                        <button
                            onClick={() => toggleMode('register')}
                            className={`flex-1 py-4 text-center font-medium text-sm transition-colors relative ${authMode === 'register' ? 'text-india-green' : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            <UserPlus className="w-5 h-5 mx-auto mb-1" />
                            {t('register') || 'Register'}
                            {authMode === 'register' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-india-green rounded-t-md"></div>}
                        </button>
                    </div>

                    <div className="mt-6">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label htmlFor="mobile" className="block text-sm font-medium text-slate-700">
                                    {t('mobileNumber') || 'Mobile Number (Aadhaar linked)'}
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Smartphone className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        id="mobile"
                                        type="tel"
                                        required
                                        className="block w-full pl-10 sm:text-sm border-slate-300 rounded-md focus:ring-navy focus:border-navy py-3 border bg-slate-50"
                                        placeholder="Enter 10-digit mobile number"
                                    />
                                </div>
                            </div>

                            {(authMode === 'register' || authMode === 'forgot') && (
                                <div>
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="otp" className="block text-sm font-medium text-slate-700">
                                            {t('otp') || 'OTP Verification'}
                                        </label>
                                        <button type="button" className="text-xs text-saffron font-medium hover:underline">Get OTP</button>
                                    </div>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Shield className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            id="otp"
                                            type="text"
                                            className="block w-full pl-10 sm:text-sm border-slate-300 rounded-md focus:ring-navy focus:border-navy py-3 border bg-slate-50"
                                            placeholder="Enter 6-digit OTP"
                                        />
                                    </div>
                                </div>
                            )}

                            {authMode !== 'forgot' && (
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                        {authMode === 'register' ? t('createPassword') || 'Create Password' : t('password') || 'Password'}
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <KeyRound className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            id="password"
                                            type="password"
                                            required
                                            className="block w-full pl-10 sm:text-sm border-slate-300 rounded-md focus:ring-navy focus:border-navy py-3 border bg-slate-50"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            )}

                            {authMode === 'register' && (
                                <div>
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700">
                                        {t('confirmPassword') || 'Confirm Password'}
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <KeyRound className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            id="confirm-password"
                                            type="password"
                                            required
                                            className="block w-full pl-10 sm:text-sm border-slate-300 rounded-md focus:ring-navy focus:border-navy py-3 border bg-slate-50"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            )}

                            {authMode === 'forgot' && (
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                        {t('createPassword') || 'Create New Password'}
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <KeyRound className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            id="password"
                                            type="password"
                                            required
                                            className="block w-full pl-10 sm:text-sm border-slate-300 rounded-md focus:ring-navy focus:border-navy py-3 border bg-slate-50"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            )}

                            {authMode === 'login' && (
                                <div className="flex items-center justify-end">
                                    <div className="text-sm">
                                        <button type="button" onClick={() => toggleMode('forgot')} className="font-medium text-navy hover:text-navy-hover">
                                            {t('forgotPassword') || 'Forgot your password?'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${authMode === 'register' ? 'bg-india-green hover:bg-india-green-hover focus:ring-india-green' : 'bg-navy hover:bg-navy-hover focus:ring-navy'
                                        }`}
                                >
                                    {authMode === 'login' ? (t('login') || 'Sign In') :
                                        authMode === 'register' ? (t('register') || 'Register') : 'Reset Password'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 text-center text-xs text-slate-500">
                        By proceeding, you agree to the Terms & Conditions and Privacy Policy of digital governance platforms.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
