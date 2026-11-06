import React from 'react';
import { AiResumeAnalysis } from '../../types';
import { Modal } from '../common/Modal';
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Layers, GraduationCap, Briefcase } from 'lucide-react';

interface ResumeAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: AiResumeAnalysis | null;
}

export const ResumeAnalysisModal: React.FC<ResumeAnalysisModalProps> = ({
  isOpen,
  onClose,
  analysis,
}) => {
  if (!analysis) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="AI Resume Analysis & ATS Quality Audit"
      subtitle="Comprehensive breakdown of skills, impact metrics, and resume optimization"
      maxWidth="3xl"
    >
      <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-1">
        {/* Score Meters */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50/60 to-white border border-amber-200 text-center">
            <span className="text-xs uppercase font-bold text-amber-700 tracking-wider">Overall Score</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">{analysis.overallScore}%</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Resume Quality</p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50/60 to-white border border-emerald-200 text-center">
            <span className="text-xs uppercase font-bold text-emerald-700 tracking-wider">ATS Score</span>
            <div className="text-3xl font-extrabold text-emerald-800 mt-1">{analysis.atsCompatibilityScore}%</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Screening Readiness</p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/60 to-white border border-indigo-200 text-center">
            <span className="text-xs uppercase font-bold text-indigo-700 tracking-wider">Impact Score</span>
            <div className="text-3xl font-extrabold text-indigo-800 mt-1">{analysis.impactScore}%</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Action Verbs & Metrics</p>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
          <span className="font-bold text-slate-900 mr-1 flex items-center gap-1.5 mb-1 text-sm">
            <Sparkles className="w-4 h-4 text-amber-500" /> Executive Assessment
          </span>
          {analysis.executiveSummary}
        </div>

        {/* Identified Skills & Extracted Sections */}
        <div className="space-y-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2">
              <Layers className="w-4 h-4 text-amber-500" /> Recognized Skills ({analysis.identifiedSkills.length})
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {analysis.identifiedSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 font-medium border border-amber-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-xs font-bold uppercase text-slate-600 flex items-center gap-1.5 mb-1.5">
                <GraduationCap className="w-4 h-4 text-indigo-500" /> Extracted Education
              </span>
              <ul className="text-xs text-slate-600 space-y-1">
                {analysis.detectedEducation.map((edu, idx) => (
                  <li key={idx}>• {edu}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-xs font-bold uppercase text-slate-600 flex items-center gap-1.5 mb-1.5">
                <Briefcase className="w-4 h-4 text-emerald-500" /> Detected Projects & Exp
              </span>
              <ul className="text-xs text-slate-600 space-y-1">
                {analysis.detectedProjects.map((p, idx) => (
                  <li key={idx}>• {p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-emerald-50/30 border border-emerald-200">
            <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Profile Strengths
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {analysis.keyStrengths.map((s, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/30 border border-amber-200">
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" /> Opportunities for Improvement
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {analysis.areasOfImprovement.map((imp, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AI Bullet Point Rewrite Recommendations */}
        {analysis.bulletPointImprovements && analysis.bulletPointImprovements.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Suggested Bullet Point Upgrades (Impact-Driven Phrasing)
            </h4>
            <div className="space-y-2.5">
              {analysis.bulletPointImprovements.map((b, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <div className="text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-rose-600">Original: </span>"{b.original}"
                  </div>
                  <div className="text-xs text-emerald-800 font-medium flex items-start gap-1.5 mt-1 bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>"{b.suggested}"</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 italic pl-5">{b.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

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

