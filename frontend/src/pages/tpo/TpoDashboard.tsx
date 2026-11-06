import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tpoApi } from '../../api/tpoApi';
import { StatCard } from '../../components/common/StatCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import {
  Users,
  Briefcase,
  Award,
  TrendingUp,
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Megaphone,
} from 'lucide-react';

export const TpoDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await tpoApi.getStats();
        setStats(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner message="Calculating institutional metrics..." size="lg" />;

  const funnel = stats?.applicationFunnel || {};

  return (
    <div className="space-y-7">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>Training & Placement Cell Command Center</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Institutional Placement Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Real-time analytics across visiting employers, student eligibility, funnel conversion
            rates, and AI readiness insights.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/tpo/drives"
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Create Placement Drive</span>
          </Link>
          <Link
            to="/tpo/ai-insights"
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Placement Insights</span>
          </Link>
        </div>
      </div>

      {/* Main KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Registered Students"
          value={stats?.totalStudents || 0}
          subtitle="Verified placement profiles"
          icon={Users}
          badge="Batch 2027"
          badgeColor="blue"
        />
        <StatCard
          title="Overall Placement Rate"
          value={`${stats?.placementRate || 0}%`}
          subtitle={`${stats?.placedStudents || 0} students with verified offers`}
          icon={Award}
          badge="High Conversion"
          badgeColor="emerald"
        />
        <StatCard
          title="Average Package"
          value={`₹ ${stats?.averagePackage || 8.5} LPA`}
          subtitle={`Highest CTC: ₹ ${stats?.highestPackage || 24} LPA`}
          icon={TrendingUp}
          badge="Across Branches"
          badgeColor="amber"
        />
        <StatCard
          title="Partner Companies"
          value={stats?.totalCompanies || 0}
          subtitle={`${stats?.totalDrives || 0} recruitment drives held`}
          icon={Building2}
          badge="Active"
          badgeColor="purple"
        />
      </div>

      {/* Funnel & Branch Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application Funnel (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Campus Recruitment Funnel</h3>
              <p className="text-xs text-slate-500">Live student distribution across hiring stages</p>
            </div>
            <Link
              to="/tpo/applications"
              className="text-xs font-semibold text-amber-600 hover:underline"
            >
              Monitor Pipeline
            </Link>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { label: 'Applied', key: 'APPLIED', color: 'bg-blue-500' },
              { label: 'Under Review', key: 'UNDER_REVIEW', color: 'bg-purple-500' },
              { label: 'Shortlisted', key: 'SHORTLISTED', color: 'bg-amber-500' },
              { label: 'Interview Scheduled', key: 'INTERVIEW_SCHEDULED', color: 'bg-indigo-500' },
              { label: 'Selected / Placed', key: 'SELECTED', color: 'bg-emerald-500' },
            ].map((stage) => {
              const count = funnel[stage.key] || 0;
              const totalApps = stats?.totalStudents || 1;
              const pct = Math.min(100, Math.round((count / Math.max(1, totalApps)) * 100));

              return (
                <div key={stage.key} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{stage.label}</span>
                    <span className="font-bold text-slate-900">{count} candidates</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${stage.color} transition-all duration-500`}
                      style={{ width: `${Math.max(5, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Branch Distribution (1 col) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Branch Participation</h3>
            <p className="text-xs text-slate-500">Registered candidates by department</p>
          </div>

          <div className="space-y-3">
            {stats?.branchDistribution && stats.branchDistribution.length > 0 ? (
              stats.branchDistribution.map((b: any, idx: number) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-800">{b.branch}</span>
                  <span className="font-semibold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    {b.total} students
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 text-center py-4">No branch records found.</p>
            )}
          </div>

          <div className="pt-2">
            <Link
              to="/tpo/students"
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors text-center block"
            >
              Inspect Student Directory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

