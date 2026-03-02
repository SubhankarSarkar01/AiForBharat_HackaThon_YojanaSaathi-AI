import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import SchemeCard from '../components/SchemeCard';
import { API_URL } from '../config/api';
import { LanguageContext } from '../context/LanguageContext';

const SchemeRecommendation = () => {
    const { currentLanguage } = useContext(LanguageContext);
    const [formData, setFormData] = useState({
        age: '',
        income: '',
        category: 'General',
        state: ''
    });

    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasRecommended, setHasRecommended] = useState(false);
    const [aiSummary, setAiSummary] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setHasRecommended(false);
        setAiSummary('');

        try {
            const res = await axios.post(`${API_URL}/recommendations`, {
                ...formData,
                language: currentLanguage || 'en'
            });
            setRecommendations(res.data.data);
            setAiSummary(res.data.aiSummary || '');
            setHasRecommended(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to get recommendations. Ensure the backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12 animate-fade-in-up">
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                    <Sparkles className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                    AI Scheme Assistant
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                    Tell us about yourself, and our AI will instantly match you with government schemes you are eligible for.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Form Section */}
                <div className="lg:col-span-4 transition-all duration-500">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 sticky top-24">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                            Your Profile
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    required
                                    min="0"
                                    max="120"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                                    placeholder="e.g. 35"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Annual Family Income (₹)</label>
                                <input
                                    type="number"
                                    name="income"
                                    required
                                    min="0"
                                    value={formData.income}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                                    placeholder="e.g. 250000"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                                >
                                    <option value="General">General</option>
                                    <option value="OBC">OBC</option>
                                    <option value="SC">SC</option>
                                    <option value="ST">ST</option>
                                    <option value="EWS">EWS</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">State (Optional)</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                                    placeholder="e.g. Maharashtra"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl hover:-translate-y-1 flex justify-center items-center disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                {loading ? (
                                    <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Analyzing...</>
                                ) : (
                                    'Find Schemes for Me'
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-8">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center mb-8 border border-red-200">
                            {error}
                        </div>
                    )}

                    {!hasRecommended && !loading && !error && (
                        <div className="h-full flex flex-col justify-center items-center bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                                <Sparkles className="w-10 h-10 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 mb-2">Ready to find your benefits</h3>
                            <p className="text-slate-500 max-w-sm">
                                Fill out the profile form on the left to see personalized scheme recommendations tailored just for you.
                            </p>
                        </div>
                    )}

                    {hasRecommended && (
                        <div className="animate-fade-in-up">
                            {aiSummary && (
                                <div className="mb-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
                                    <p className="text-xs uppercase tracking-wide text-blue-700 font-semibold mb-1">AI Summary</p>
                                    <p className="text-sm text-slate-700 whitespace-pre-wrap">{aiSummary}</p>
                                </div>
                            )}

                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-slate-900">Recommended for You</h2>
                                <span className="bg-green-100 text-green-700 font-bold px-4 py-1.5 rounded-full text-sm">
                                    {recommendations.length} Matches Found
                                </span>
                            </div>

                            {recommendations.length === 0 ? (
                                <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                    <p className="text-slate-600 text-lg">We couldn't find any schemes perfectly matching this profile right now.</p>
                                    <p className="text-slate-400 mt-2">Try adjusting your age or income criteria.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {recommendations.map((scheme) => (
                                        <SchemeCard key={scheme.id} scheme={scheme} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SchemeRecommendation;
