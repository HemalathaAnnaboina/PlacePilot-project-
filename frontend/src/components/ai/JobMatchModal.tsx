import React from 'react';
import { JobMatchResult } from '../../types';
import { Modal } from '../common/Modal';
import { Sparkles, Check, AlertCircle, Compass, Zap } from 'lucide-react';

interface JobMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: JobMatchResult | null;
}

export const JobMatchModal: React.FC<JobMatchModalProps> = ({ isOpen, onClose, match }) => {
  if (!match) return null;

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 70) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="AI Smart Job Match Intelligence"
      subtitle={`${match.companyName} • ${match.jobTitle}`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Score & Tier Header */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-amber-50/50 via-white to-amber-50/30 border border-amber-200/60">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center border font-bold ${getScoreColor(
                match.matchScore
              )}`}
            >
              <span className="text-2xl leading-none">{match.matchScore}%</span>
              <span className="text-[10px] uppercase font-semibold mt-0.5">Match</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900">{match.matchTier}</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  <Sparkles className="w-3 h-3 text-amber-600" /> AI Evaluated
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-md">{match.matchExplanation}</p>
            </div>
          </div>
        </div>

        {/* Skills Matched vs Missing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Matched Skills */}
          <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Check className="w-3 h-3" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Matching Skills ({match.matchingSkills.length})
              </h4>
            </div>
            {match.matchingSkills.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No direct keyword overlap found.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {match.matchingSkills.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-emerald-100/70 text-emerald-800 font-medium border border-emerald-200/50"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Missing Skills */}
          <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
                <AlertCircle className="w-3 h-3" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900">
                Skills to Acquire ({match.missingSkills.length})
              </h4>
            </div>
            {match.missingSkills.length === 0 ? (
              <p className="text-xs text-emerald-600 font-medium">You cover all required skills!</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {match.missingSkills.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-rose-100/70 text-rose-800 font-medium border border-rose-200/50"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Strengths & Actionable Advice */}
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Candidate Profile Strengths
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
              {match.matchStrengths.map((str, idx) => (
                <li key={idx} className="leading-relaxed">
                  {str}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/30 border border-amber-200/50">
            <div className="flex items-center gap-2 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4 text-amber-600" />
              Actionable Recommendations
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
              {match.actionableRecommendations.map((rec, idx) => (
                <li key={idx} className="leading-relaxed">
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-xl transition-colors shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};

