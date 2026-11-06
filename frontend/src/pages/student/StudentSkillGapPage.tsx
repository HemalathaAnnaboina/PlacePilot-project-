import React, { useState, useEffect } from 'react';
import { aiApi } from '../../api/aiApi';
import { SkillGapAnalysis } from '../../types';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import {
  TrendingUp,
  Sparkles,
  BookOpen,
  Code,
  Clock,
  Compass,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

export const StudentSkillGapPage: React.FC = () => {
  const [targetRole, setTargetRole] = useState('Full Stack Java Developer');
  const [analysis, setAnalysis] = useState<SkillGapAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSkillGap = async (role: string) => {
    setLoading(true);
    try {
      const data = await aiApi.getSkillGap(role);
      setAnalysis(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillGap(targetRole);
  }, [targetRole]);

  const roles = [
    'Full Stack Java Developer',
    'Cloud & DevOps Engineer',
    'Data Engineer & ML Specialist',
    'Frontend TypeScript Engineer',
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>AI Career Readiness Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Skill Gap & Learning Roadmap Analyzer
          </h1>
          <p className="text-xs text-slate-500">
            Compare your profile against industry roles and receive structured curriculum modules
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500 hidden sm:block">
            Target Role:
          </label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="px-3.5 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-800 shadow-sm"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Generating tailored skill gap roadmap..." size="lg" />
      ) : analysis ? (
        <div className="space-y-6">
          {/* Readiness Meter Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="max-w-md">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Industry Alignment
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                Target Role: {analysis.targetRole}
              </h2>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                You currently possess {analysis.currentSkills.length} relevant competencies.{' '}
                {analysis.missingSkills.length === 0
                  ? 'Outstanding! Your skill set covers all core prerequisites for this profile.'
                  : `Mastering ${analysis.missingSkills.length} additional key technical skills will significantly increase your interview conversion.`}
              </p>
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-amber-50 border-2 border-amber-300 flex flex-col items-center justify-center font-extrabold text-slate-900">
                <span className="text-3xl leading-none">{analysis.currentReadinessPercentage}%</span>
                <span className="text-[10px] uppercase font-bold text-amber-700 mt-1">Ready</span>
              </div>
            </div>
          </div>

          {/* Current Skills vs Missing Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Your Current Validated Skills ({analysis.currentSkills.length})
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {analysis.currentSkills.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-medium border border-emerald-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Target Role Gaps ({analysis.missingSkills.length})
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {analysis.missingSkills.length === 0 ? (
                  <span className="text-xs text-emerald-600 font-medium">All core skills acquired!</span>
                ) : (
                  analysis.missingSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 font-medium border border-amber-200"
                    >
                      {s}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Step-by-Step Learning Roadmap */}
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-500" />
                <span>Actionable Learning Roadmap</span>
              </h3>
              <p className="text-xs text-slate-500">
                Curated modules, conceptual topics, resources, and portfolio capstone projects
              </p>
            </div>

            <div className="space-y-4">
              {analysis.learningRoadmap.map((mod, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs">
                        #{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{mod.skillName}</h4>
                        <span className="text-[11px] text-slate-400">
                          Estimated Commitment: {mod.estimatedTimeToLearn}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 w-fit">
                      {mod.priority} Priority
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Key Topics */}
                    <div>
                      <span className="font-bold text-slate-700 flex items-center gap-1.5 mb-2">
                        <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                        <span>Core Topics to Study</span>
                      </span>
                      <ul className="space-y-1 text-slate-600 list-disc list-inside">
                        {mod.keyTopics.map((top, i) => (
                          <li key={i}>{top}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Resources */}
                    <div>
                      <span className="font-bold text-slate-700 flex items-center gap-1.5 mb-2">
                        <Compass className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Recommended Learning Guides</span>
                      </span>
                      <ul className="space-y-1 text-slate-600 list-disc list-inside">
                        {mod.recommendedResources.map((res, i) => (
                          <li key={i}>{res}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Practical Project Idea */}
                  {mod.practicalProjectIdea && (
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs">
                      <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                        <Code className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Hands-On Capstone Project</span>
                      </span>
                      <p className="text-slate-600 leading-relaxed">
                        {mod.practicalProjectIdea}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Advice */}
          <div className="bg-amber-50/40 rounded-2xl p-5 border border-amber-200 text-xs text-slate-800">
            <h4 className="font-bold text-amber-950 flex items-center gap-1.5 mb-2 text-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              TPO Career Recommendations
            </h4>
            <ul className="space-y-1.5 list-disc list-inside text-slate-700">
              {analysis.personalizedAdvice.map((adv, idx) => (
                <li key={idx} className="leading-relaxed">
                  {adv}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

