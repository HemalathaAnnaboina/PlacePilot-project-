import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { studentApi } from '../../api/studentApi';
import { driveApi } from '../../api/driveApi';
import { applicationApi } from '../../api/applicationApi';
import { tpoApi } from '../../api/tpoApi';
import {
  Application,
  PlacementAnnouncement,
  PlacementDrive,
  StudentProfile,
} from '../../types';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import {
  Briefcase,
  CheckCircle2,
  Calendar,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileText,
  Megaphone,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [drives, setDrives] = useState<PlacementDrive[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [announcements, setAnnouncements] = useState<PlacementAnnouncement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profData, drivesData, appsData, annData] = await Promise.all([
          studentApi.getProfile(),
          driveApi.getDrivesForStudent(),
          applicationApi.getMyApplications(),
          tpoApi.getAnnouncements('STUDENTS'),
        ]);
        setProfile(profData);
        setDrives(drivesData);
        setApplications(appsData);
        setAnnouncements(annData);
      } catch (e) {
        console.error('Failed to load dashboard data', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading your placement dashboard..." size="lg" />;
  }

  const appliedCount = applications.length;
  const shortlistedCount = applications.filter((a) => a.status === 'SHORTLISTED').length;
  const interviewCount = applications.filter((a) => a.status === 'INTERVIEW_SCHEDULED').length;
  const selectedCount = applications.filter((a) => a.status === 'SELECTED').length;

  return (
    <div className="space-y-7">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-400/90 via-amber-300 to-amber-200/90 rounded-3xl p-6 sm:p-8 text-slate-950 shadow-sm">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 text-amber-300 text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Placement Session 2026-2027</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {profile?.fullName || user?.fullName}!
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-800 leading-relaxed">
            Your academic record shows{' '}
            <span className="font-bold">{profile?.branch}</span> with{' '}
            <span className="font-bold">{profile?.cgpa} CGPA</span> and{' '}
            <span className="font-bold">{profile?.activeBacklogs} active backlogs</span>.{' '}
            {profile?.resumeUrl
              ? 'Resume is uploaded and indexed by AI.'
              : 'Upload your PDF resume to unlock automated ATS auditing!'}
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link
              to="/student/drives"
              className="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-amber-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Browse Eligible Drives</span>
            </Link>
            <Link
              to="/student/mock-interview"
              className="px-4 py-2 bg-white/90 hover:bg-white text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Practice AI Mock Interview</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Announcements Ticker */}
      {announcements.length > 0 && (
        <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3">
          <Megaphone className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-bold text-amber-950">Campus Placement Notice:</span>
              <span className="font-semibold text-slate-800">{announcements[0].title}</span>
            </div>
            <p className="text-slate-600 line-clamp-1">{announcements[0].content}</p>
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Applications"
          value={appliedCount}
          subtitle="Submitted this season"
          icon={Briefcase}
          badge="Live"
          badgeColor="blue"
        />
        <StatCard
          title="Shortlisted"
          value={shortlistedCount}
          subtitle="Passed resume audit"
          icon={CheckCircle2}
          badge="Active"
          badgeColor="amber"
        />
        <StatCard
          title="Interviews"
          value={interviewCount}
          subtitle="Rounds scheduled"
          icon={Calendar}
          badge="Upcoming"
          badgeColor="purple"
        />
        <StatCard
          title="Offers Extended"
          value={selectedCount}
          subtitle="Final selections"
          icon={Award}
          badge="Selected"
          badgeColor="emerald"
        />
      </div>

      {/* Two Column Layout: Recommended Drives & Active Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Placement Drives (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Featured Placement Drives</h2>
              <p className="text-xs text-slate-500">
                Sorted by deterministic eligibility and AI skill match
              </p>
            </div>
            <Link
              to="/student/drives"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {drives.slice(0, 3).map((drive) => (
              <div
                key={drive.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:border-amber-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 flex-shrink-0 text-sm overflow-hidden">
                    {drive.companyLogo ? (
                      <img
                        src={drive.companyLogo}
                        alt={drive.companyName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      drive.companyName.charAt(0)
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{drive.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">{drive.companyName}</span>
                      <span>•</span>
                      <span>{drive.jobLocation}</span>
                      <span>•</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        ₹ {drive.packageLpa} LPA
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-2.5">
                      {drive.userEligible ? (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          ✓ Eligible
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                          ✕ Ineligible
                        </span>
                      )}

                      {drive.matchScore && (
                        <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          {drive.matchScore}% AI Match
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  <Link
                    to="/student/drives"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors text-center"
                  >
                    View Details
                  </Link>
                  <span className="text-[10px] text-slate-400">
                    Deadline: {drive.applicationDeadline ? new Date(drive.applicationDeadline).toLocaleDateString() : 'Rolling'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Applications Tracker & Quick Tools */}
        <div className="space-y-6">
          {/* Applications Snippet */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-bold text-slate-900">Recent Applications</h3>
              <Link
                to="/student/applications"
                className="text-[11px] font-semibold text-amber-600 hover:underline"
              >
                Track All
              </Link>
            </div>

            {applications.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-400">
                You haven't applied to any drives yet.
              </div>
            ) : (
              <div className="space-y-3">
                {applications.slice(0, 3).map((app) => (
                  <div
                    key={app.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {app.companyName}
                      </span>
                      <StatusBadge status={app.status} size="sm" />
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{app.roleName}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Applied {new Date(app.appliedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Placement Readiness Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>AI Readiness Hub</span>
            </div>
            <h4 className="text-sm font-bold">Fast-Track Your Interview Prep</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Run an ATS keyword audit on your resume, spot missing technical skills, and answer
              mock technical questions with instant grading.
            </p>

            <div className="mt-4 space-y-2">
              <Link
                to="/student/resume-analyzer"
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-medium text-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>AI Resume Audit</span>
                </div>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>

              <Link
                to="/student/skill-gap"
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-medium text-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                  <span>AI Skill Gap Roadmap</span>
                </div>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

