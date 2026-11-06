import React, { useState, useEffect } from 'react';
import { recruiterApi } from '../../api/recruiterApi';
import { driveApi } from '../../api/driveApi';
import { PlacementDrive } from '../../types';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Modal } from '../../components/common/Modal';
import { Briefcase, Plus, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RecruiterDrivesPage: React.FC = () => {
  const [drives, setDrives] = useState<PlacementDrive[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [roleName, setRoleName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobLocation, setJobLocation] = useState('Bengaluru / Hybrid');
  const [packageLpa, setPackageLpa] = useState<number>(14.0);
  const [minCgpa, setMinCgpa] = useState<number>(7.5);
  const [eligibleBranches, setEligibleBranches] = useState('CSE, IT, ECE');
  const [maxBacklogsAllowed, setMaxBacklogsAllowed] = useState<number>(0);
  const [graduationYear, setGraduationYear] = useState<number>(2027);
  const [requiredSkills, setRequiredSkills] = useState('Java, Spring Boot, React, SQL');
  const [saving, setSaving] = useState(false);

  const fetchDrives = async () => {
    try {
      const data = await recruiterApi.getMyDrives();
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

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await driveApi.createDrive({
        title,
        roleName,
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
      setShowModal(false);
      fetchDrives();
      setTitle('');
      setRoleName('');
      setJobDescription('');
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading job drives..." size="lg" />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Company Job Postings & Drives
          </h1>
          <p className="text-xs text-slate-500">
            Define role descriptions, required skills, and deterministic applicant cutoffs
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Opening</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {drives.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-bold text-base text-slate-900">{d.title}</h3>
                <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 text-xs">
                  ₹ {d.packageLpa} LPA
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-3">
                {d.roleName} • {d.jobLocation}
              </p>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1 mb-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Min CGPA:</span>
                  <span className="font-semibold text-slate-800">&ge; {d.minCgpa}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Branches:</span>
                  <span className="font-semibold text-slate-800">{d.eligibleBranches}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Max Backlogs:</span>
                  <span className="font-semibold text-slate-800">{d.maxBacklogsAllowed}</span>
                </div>
              </div>

              {d.requiredSkills && (
                <div className="flex flex-wrap gap-1">
                  {d.requiredSkills.split(',').map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                    >
                      {s.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-slate-400" />
                {d.totalApplicants} Applicants
              </span>

              <Link
                to={`/recruiter/applicants?driveId=${d.id}`}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1"
              >
                <span>Review Applicants</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Post New Campus Opening"
        subtitle="Specify eligibility requirements and job details"
        maxWidth="2xl"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Software Development Engineer - 2027"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Role Name</label>
              <input
                type="text"
                required
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="SDE-1 / Full Stack"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Package CTC (LPA)
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
              <input
                type="text"
                value={jobLocation}
                onChange={(e) => setJobLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Minimum CGPA Cutoff
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
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Max Backlogs
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
              Required Skills
            </label>
            <input
              type="text"
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
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
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-xs font-bold bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl transition-all shadow-sm"
            >
              {saving ? 'Posting...' : 'Publish Opening'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

