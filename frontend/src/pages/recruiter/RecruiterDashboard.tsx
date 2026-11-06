import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recruiterApi } from '../../api/recruiterApi';
import { PlacementDrive } from '../../types';
import { StatCard } from '../../components/common/StatCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import {
  Building2,
  Briefcase,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  Plus,
  CheckCircle2,
} from 'lucide-react';

export const RecruiterDashboard: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [drives, setDrives] = useState<PlacementDrive[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecruiterData = async () => {
      try {
        const [prof, drivesData] = await Promise.all([
          recruiterApi.getProfile(),
          recruiterApi.getMyDrives(),
        ]);
        setProfile(prof);
        setDrives(drivesData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchRecruiterData();
  }, []);

  if (loading) return <LoadingSpinner message="Loading recruiter dashboard..." size="lg" />;

  const totalApplicants = drives.reduce((sum, d) => sum + (d.totalApplicants || 0), 0);

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold mb-2">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Corporate Talent Partner</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            {profile?.company?.name || 'Company'} Hiring Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Welcome, {profile?.fullName} ({profile?.designation}). Review applicants, evaluate AI
            match rankings, and update interview stages.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/recruiter/drives"
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Job</span>
          </Link>
          <Link
            to="/recruiter/applicants"
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Review Applicants</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Drives"
          value={drives.length}
          subtitle="Campus hiring listings"
          icon={Briefcase}
          badge="Live"
          badgeColor="blue"
        />
        <StatCard
          title="Total Applicants"
          value={totalApplicants}
          subtitle="Candidates applied"
          icon={Users}
          badge="In Funnel"
          badgeColor="amber"
        />
        <StatCard
          title="Company Account"
          value={profile?.approved ? 'Authorized' : 'Pending'}
          subtitle="TPO Authentication"
          icon={Building2}
          badge={profile?.approved ? 'Verified' : 'Waitlist'}
          badgeColor={profile?.approved ? 'emerald' : 'purple'}
        />
        <StatCard
          title="Average CTC Offered"
          value={drives.length > 0 ? `₹ ${drives[0].packageLpa} LPA` : '₹ 14.5 LPA'}
          subtitle="Annual package"
          icon={Sparkles}
          badge="Competitive"
          badgeColor="emerald"
        />
      </div>

      {/* Drives Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Your Campus Job Openings</h3>
            <p className="text-xs text-slate-500">
              Deterministic cutoffs and student applications per drive
            </p>
          </div>
          <Link
            to="/recruiter/drives"
            className="text-xs font-semibold text-amber-600 hover:underline"
          >
            Manage Drives
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {drives.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="font-bold text-base text-slate-900">{d.title}</h4>
                  <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 text-xs">
                    ₹ {d.packageLpa} LPA
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mb-3">
                  {d.roleName} • {d.jobLocation}
                </p>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Min CGPA Cutoff:</span>
                    <span className="font-semibold text-slate-800">&ge; {d.minCgpa}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Allowed Branches:</span>
                    <span className="font-semibold text-slate-800">{d.eligibleBranches}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Active Backlogs:</span>
                    <span className="font-semibold text-slate-800">{d.maxBacklogsAllowed}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-400" />
                  {d.totalApplicants} Registered Applicants
                </span>

                <Link
                  to={`/recruiter/applicants?driveId=${d.id}`}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Review Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

