import React, { useState, useEffect } from 'react';
import { driveApi } from '../../api/driveApi';
import { aiApi } from '../../api/aiApi';
import { applicationApi } from '../../api/applicationApi';
import { EligibilityResult, JobMatchResult, PlacementDrive } from '../../types';
import { EligibilityModal } from '../../components/eligibility/EligibilityModal';
import { JobMatchModal } from '../../components/ai/JobMatchModal';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import {
  Briefcase,
  Search,
  Filter,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

export const StudentDrivesPage: React.FC = () => {
  const [drives, setDrives] = useState<PlacementDrive[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('ALL');
  const [eligibilityFilter, setEligibilityFilter] = useState<'ALL' | 'ELIGIBLE'>('ALL');

  // Modal States
  const [selectedEligibility, setSelectedEligibility] = useState<EligibilityResult | null>(null);
  const [selectedDriveForEligibility, setSelectedDriveForEligibility] = useState<PlacementDrive | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<JobMatchResult | null>(null);
  const [checkingEligibility, setCheckingEligibility] = useState(false);
  const [calculatingMatch, setCalculatingMatch] = useState(false);

  // Application Notification
  const [applyMessage, setApplyMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchDrives = async () => {
    try {
      const data = await driveApi.getDrivesForStudent();
      setDrives(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrives();
  }, []);

  const handleCheckEligibility = async (drive: PlacementDrive) => {
    setCheckingEligibility(true);
    setSelectedDriveForEligibility(drive);
    try {
      const res = await driveApi.checkEligibility(drive.id);
      setSelectedEligibility(res);
    } catch (e) {
      console.error(e);
    } finally {
      setCheckingEligibility(false);
    }
  };

  const handleViewAiMatch = async (drive: PlacementDrive) => {
    setCalculatingMatch(true);
    try {
      const res = await aiApi.getJobMatch(drive.id);
      setSelectedMatch(res);
    } catch (e) {
      console.error(e);
    } finally {
      setCalculatingMatch(false);
    }
  };

  const handleApply = async (driveId: number) => {
    setApplyMessage(null);
    try {
      await applicationApi.apply(driveId, 'Applied via Student Placement Portal');
      setApplyMessage({
        type: 'success',
        text: 'Application successfully submitted! You can track stages in My Applications.',
      });
      fetchDrives(); // Refresh states
    } catch (err: any) {
      setApplyMessage({
        type: 'error',
        text: err.response?.data?.message || 'Application submission failed.',
      });
    }
  };

  const filteredDrives = drives.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.companyName.toLowerCase().includes(search.toLowerCase()) ||
      d.roleName.toLowerCase().includes(search.toLowerCase());

    const matchesBranch =
      branchFilter === 'ALL' || d.eligibleBranches.toUpperCase().includes(branchFilter.toUpperCase());

    const matchesEligibility =
      eligibilityFilter === 'ALL' || (eligibilityFilter === 'ELIGIBLE' && d.userEligible);

    return matchesSearch && matchesBranch && matchesEligibility;
  });

  if (loading) return <LoadingSpinner message="Loading placement drives..." size="lg" />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Campus Placement Drives
        </h1>
        <p className="text-xs text-slate-500">
          Explore visiting companies, check deterministic cutoffs, and view AI job match insights
        </p>
      </div>

      {applyMessage && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-2.5 text-xs ${
            applyMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {applyMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{applyMessage.text}</span>
        </div>
      )}

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search role, company or tech stack..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/50"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 text-slate-700"
          >
            <option value="ALL">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
          </select>

          <select
            value={eligibilityFilter}
            onChange={(e) => setEligibilityFilter(e.target.value as any)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 text-slate-700"
          >
            <option value="ALL">All Drives</option>
            <option value="ELIGIBLE">Only Eligible For Me</option>
          </select>
        </div>
      </div>

      {/* Drives Grid */}
      {filteredDrives.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400">
          No placement drives matched your search or eligibility criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredDrives.map((drive) => (
            <div
              key={drive.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Company & CTC */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-800 text-sm overflow-hidden flex-shrink-0">
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
                      <h3 className="font-bold text-base text-slate-900 leading-snug">
                        {drive.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">{drive.companyName}</p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 block">
                      ₹ {drive.packageLpa} LPA
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Annual CTC</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {drive.jobDescription}
                </p>

                {/* Criteria Chips */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1.5 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Min CGPA Cutoff:</span>
                    <span className="font-semibold text-slate-800">&ge; {drive.minCgpa}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Permitted Branches:</span>
                    <span className="font-semibold text-slate-800 truncate max-w-[200px]">
                      {drive.eligibleBranches}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Max Active Backlogs:</span>
                    <span className="font-semibold text-slate-800">
                      {drive.maxBacklogsAllowed === 0 ? 'Zero backlogs' : drive.maxBacklogsAllowed}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Target Graduation Batch:</span>
                    <span className="font-semibold text-slate-800">{drive.graduationYear}</span>
                  </div>
                </div>

                {/* Tech Stack */}
                {drive.requiredSkills && (
                  <div className="mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Required Competencies
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {drive.requiredSkills.split(',').map((s, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                        >
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions: Check Eligibility & AI Match & Apply */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  {/* Eligibility Pill */}
                  <button
                    onClick={() => handleCheckEligibility(drive)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                      drive.userEligible
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{drive.userEligible ? 'Eligible • Verify' : 'Ineligible • Reason'}</span>
                  </button>

                  {/* AI Match Button */}
                  <button
                    onClick={() => handleViewAiMatch(drive)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{drive.matchScore ? `${drive.matchScore}% AI Match` : 'AI Match'}</span>
                  </button>
                </div>

                {/* Apply Button */}
                <div>
                  {drive.userApplied ? (
                    <div className="w-full py-2.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold text-center">
                      Applied • Status: {drive.userApplicationStatus?.replace('_', ' ')}
                    </div>
                  ) : drive.userEligible ? (
                    <button
                      onClick={() => handleApply(drive.id)}
                      className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <span>Apply to Placement Drive</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleCheckEligibility(drive)}
                      className="w-full py-2.5 px-4 bg-slate-100 text-slate-500 hover:bg-slate-200 text-xs font-semibold rounded-xl transition-colors text-center"
                    >
                      Ineligible (View Exact Cutoff Gaps)
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <EligibilityModal
        isOpen={!!selectedEligibility}
        onClose={() => setSelectedEligibility(null)}
        result={selectedEligibility}
        onApply={
          selectedDriveForEligibility
            ? () => handleApply(selectedDriveForEligibility.id)
            : undefined
        }
        alreadyApplied={selectedDriveForEligibility?.userApplied}
      />

      <JobMatchModal
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
        match={selectedMatch}
      />
    </div>
  );
};

