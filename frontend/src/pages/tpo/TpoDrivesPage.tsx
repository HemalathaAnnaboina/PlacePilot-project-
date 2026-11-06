import React, { useState, useEffect } from 'react';
import { driveApi } from '../../api/driveApi';
import { recruiterApi } from '../../api/recruiterApi';
import { PlacementDrive } from '../../types';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Modal } from '../../components/common/Modal';
import {
  Briefcase,
  Plus,
  Search,
  CheckCircle2,
  Calendar,
  Building2,
  DollarSign,
  Users,
  Edit2,
  Clock,
} from 'lucide-react';

export const TpoDrivesPage: React.FC = () => {
  const [drives, setDrives] = useState<PlacementDrive[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [roleName, setRoleName] = useState('');
  const [companyId, setCompanyId] = useState<number>(1);
  const [jobDescription, setJobDescription] = useState('');
  const [jobLocation, setJobLocation] = useState('Bengaluru (Hybrid)');
  const [packageLpa, setPackageLpa] = useState<number>(12.0);
  const [minCgpa, setMinCgpa] = useState<number>(7.5);
  const [eligibleBranches, setEligibleBranches] = useState('CSE, IT, ECE');
  const [maxBacklogsAllowed, setMaxBacklogsAllowed] = useState<number>(0);
  const [graduationYear, setGraduationYear] = useState<number>(2027);
  const [requiredSkills, setRequiredSkills] = useState('Java, Spring Boot, React, SQL');

  const [saving, setSaving] = useState(false);

  const fetchDrives = async () => {
    try {
      const data = await driveApi.getAllDrives();
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

  const handleCreateDrive = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await driveApi.createDrive({
        title,
        roleName,
        companyId: Number(companyId),
        jobDescription,
        jobLocation,
        packageLpa: Number(packageLpa),
        minCgpa: Number(minCgpa),
        eligibleBranches,
        maxBacklogsAllowed: Number(maxBacklogsAllowed),
        graduationYear: Number(graduationYear),
        requiredSkills,
        status: 'ACTIVE',
      });
      setShowCreateModal(false);
      fetchDrives();
      // Reset form
      setTitle('');
      setRoleName('');
      setJobDescription('');
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const filteredDrives = drives.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.companyName.toLowerCase().includes(search.toLowerCase()) ||
      d.roleName.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner message="Loading placement drives..." size="lg" />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            College Placement Drives
          </h1>
          <p className="text-xs text-slate-500">
            Create and configure placement drives with deterministic criteria cutoffs
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>New Placement Drive</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search drives by company or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>

      {/* Drives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredDrives.map((drive) => (
          <div
            key={drive.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  {drive.companyName}
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-1">{drive.title}</h3>
                <p className="text-xs text-slate-500">
                  {drive.roleName} • {drive.jobLocation}
                </p>
              </div>

              <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 text-xs">
                ₹ {drive.packageLpa} LPA
              </span>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {drive.jobDescription}
            </p>

            {/* Criteria Specs */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Min CGPA:</span>
                <span className="font-semibold text-slate-800">&ge; {drive.minCgpa}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Branches:</span>
                <span className="font-semibold text-slate-800">{drive.eligibleBranches}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Max Backlogs:</span>
                <span className="font-semibold text-slate-800">{drive.maxBacklogsAllowed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Batch:</span>
                <span className="font-semibold text-slate-800">{drive.graduationYear}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                {drive.totalApplicants} Applicants
              </span>
              <span className="text-[10px] text-slate-400">
                Created {new Date(drive.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Drive Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Campus Placement Drive"
        subtitle="Define deterministic eligibility cutoffs and hiring criteria"
        maxWidth="2xl"
      >
        <form onSubmit={handleCreateDrive} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Drive Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Software Engineer - Campus 2027"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Role Name
              </label>
              <input
                type="text"
                required
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="Full Stack Engineer"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Annual Package (CTC in LPA)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                required
                value={packageLpa}
                onChange={(e) => setPackageLpa(parseFloat(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Job Location
              </label>
              <input
                type="text"
                value={jobLocation}
                onChange={(e) => setJobLocation(e.target.value)}
                placeholder="Bengaluru / Hybrid"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 pt-2 border-t border-slate-100">
            Mandatory Eligibility Cutoffs (Deterministic Engine)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Min CGPA Cutoff
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                required
                value={minCgpa}
                onChange={(e) => setMinCgpa(parseFloat(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Eligible Branches
              </label>
              <input
                type="text"
                required
                value={eligibleBranches}
                onChange={(e) => setEligibleBranches(e.target.value)}
                placeholder="CSE, IT, ECE"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Max Backlogs Allowed
              </label>
              <input
                type="number"
                min="0"
                required
                value={maxBacklogsAllowed}
                onChange={(e) => setMaxBacklogsAllowed(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Required Skills (Comma separated)
            </label>
            <input
              type="text"
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
              placeholder="Java, Spring Boot, React, PostgreSQL, Docker"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Job Description
            </label>
            <textarea
              rows={3}
              required
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Details regarding the team, tech stack, and responsibilities..."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-xs font-bold bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl transition-all shadow-sm"
            >
              {saving ? 'Creating...' : 'Publish Placement Drive'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

