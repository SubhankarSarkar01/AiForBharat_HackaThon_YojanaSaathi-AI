import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import SchemeCard from '../components/SchemeCard';
import { API_URL } from '../config/api';

const SearchSchemes = () => {
    const [query, setQuery] = useState('');
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load all schemes initially
    useEffect(() => {
        fetchSchemes();
    }, []);

    const fetchSchemes = async (searchQuery = '') => {
        setLoading(true);
        setError(null);
        try {
            const url = searchQuery
                ? `${API_URL}/schemes/search?q=${encodeURIComponent(searchQuery)}`
                : `${API_URL}/schemes`;
            const res = await axios.get(url);
            setSchemes(res.data.data);
        } catch (err) {
            setError('Failed to fetch schemes. Ensure the backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchSchemes(query);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col items-center mb-12">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 text-center">
                    Search Government Schemes
                </h1>
                <p className="text-slate-600 text-center max-w-2xl mb-8">
                    Find the right schemes by searching via keywords like "Agriculture", "Student", or "Pension".
                </p>

                <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
                    <div className="relative flex items-center">
                        <SearchIcon className="absolute left-4 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search schemes by name or category..."
                            className="w-full pl-12 pr-32 py-4 bg-white border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-lg"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-full font-semibold hover:bg-blue-700 transition flex items-center disabled:opacity-50"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center mb-8 border border-red-200">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                </div>
            ) : (
                <>
                    <p className="text-slate-500 mb-6 font-medium">Found {schemes.length} schemes</p>
                    {schemes.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                            <p className="text-slate-500 text-lg">No schemes found matching your search.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {schemes.map((scheme) => (
                                <SchemeCard key={scheme.id} scheme={scheme} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchSchemes;
