import React from 'react';
import { Calendar, Tag, ChevronRight } from 'lucide-react';

const SchemeCard = ({ scheme }) => {
    const hasDeadline = Boolean(scheme.deadline);
    const score = typeof scheme.matchScore === 'number' ? scheme.matchScore : null;
    const reasons = Array.isArray(scheme.recommendationReasons) ? scheme.recommendationReasons : [];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group cursor-pointer">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                        <Tag className="w-3 h-3" />
                        {scheme.category}
                    </span>
                    {hasDeadline && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                            <Calendar className="w-3 h-3" />
                            Deadline: {new Date(scheme.deadline).toLocaleDateString()}
                        </span>
                    )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {scheme.name}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {scheme.description}
                </p>

                {score !== null && (
                    <div className="mb-4 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold">
                        Match Score: {score}%
                    </div>
                )}

                <div className="bg-slate-50 rounded-lg p-3 mb-4">
                    <p className="text-sm font-semibold text-slate-800 mb-1">Benefits:</p>
                    <p className="text-sm text-green-700">{scheme.benefits}</p>
                </div>

                {reasons.length > 0 && (
                    <div className="bg-indigo-50 rounded-lg p-3 mb-4 border border-indigo-100">
                        <p className="text-sm font-semibold text-indigo-900 mb-1">Why recommended:</p>
                        <p className="text-xs text-indigo-700">{reasons.join(' • ')}</p>
                    </div>
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                <div className="text-sm text-slate-500">
                    <span className="font-semibold text-slate-700">Ages:</span> {scheme.eligibility.minAge}+
                </div>
                <button className="text-blue-600 font-semibold text-sm flex items-center group-hover:text-blue-700">
                    Apply Now <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default SchemeCard;
