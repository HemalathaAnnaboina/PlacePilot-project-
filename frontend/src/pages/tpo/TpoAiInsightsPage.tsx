import React, { useState, useEffect } from 'react';
import { aiApi } from '../../api/aiApi';
import { TpoInsights } from '../../types';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import {
  Sparkles,
  TrendingUp,
  BarChart3,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
} from 'lucide-react';

export const TpoAiInsightsPage: React.FC = () => {
  const [insights, setInsights] = useState<TpoInsights | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const data = await aiApi.getTpoInsights();
        setInsights(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  if (loading) return <LoadingSpinner message="Synthesizing placement intelligence..." size="lg" />;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="border-b border-slate-200 pb-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold mb-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Predictive Institutional Placement Analytics</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          AI Placement Insights & Trends
        </h1>
        <p className="text-xs text-slate-500">
          Aggregated employer demand patterns, department readiness indices, and actionable TPO
          interventions
        </p>
      </div>

      {insights && (
        <div className="space-y-6">
          {/* Top Banner KPI */}
          <div className="bg-gradient-to-r from-amber-400/90 via-amber-300 to-amber-200 rounded-3xl p-6 sm:p-8 text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900/80">
                Institutional Placement Conversion
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-0.5">
                {insights.overallPlacementRate}% Placement Conversion
              </h2>
              <p className="text-xs text-slate-800 mt-1 max-w-md">
                Based on {insights.totalStudentsPlaced} offers across{' '}
                {insights.totalApplicationsSubmitted} candidate applications this placement season.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-950/90 text-white p-4 rounded-2xl border border-slate-800 flex-shrink-0">
              <div className="text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  Avg Package
                </span>
                <span className="text-xl font-extrabold text-amber-400">
                  ₹ {insights.averagePackageLpa} LPA
                </span>
              </div>
              <div className="w-px h-8 bg-slate-700" />
              <div className="text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  Highest CTC
                </span>
                <span className="text-xl font-extrabold text-emerald-400">
                  ₹ {insights.highestPackageLpa} LPA
                </span>
              </div>
            </div>
          </div>

          {/* Two Columns: In-Demand Skills & Department Readiness */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top In-Demand Skills */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-500" />
                  <span>Frequently Demanded Skills by Visiting Recruiters</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Percentage of active drives explicitly requiring each competency
                </p>
              </div>

              <div className="space-y-3 pt-1">
                {insights.topInDemandSkills.map((sk, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{sk.skillName}</span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                            sk.trend === 'HIGH'
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {sk.trend} DEMAND
                        </span>
                      </div>
                      <span className="font-semibold text-slate-600">
                        {sk.percentageDemand}% of drives ({sk.driveCount})
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-400 transition-all duration-500"
                        style={{ width: `${sk.percentageDemand}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Readiness Index */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-500" />
                  <span>Department Readiness & Eligibility Index</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Students meeting standard cutoffs (CGPA &gt;= 7.0, 0 active backlogs)
                </p>
              </div>

              <div className="space-y-3 pt-1">
                {insights.branchReadinessMetrics.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">{b.branch}</span>
                      <span className="text-[11px] text-slate-500">
                        {b.eligibleStudents} of {b.totalStudents} eligible • Avg CGPA {b.averageCgpa}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 block text-xs">
                        {b.readinessScore}% Ready
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Trends & Actionable Interventions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Key Trends */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Empirical Placement Trends</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {insights.keyTrends.map((trend, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span className="leading-relaxed">{trend}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Strategic Interventions */}
            <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-200 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Actionable Recommendations for TPO Cell</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-800">
                {insights.strategicRecommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

