import React, { useState, useEffect } from 'react';
import { studentApi } from '../../api/studentApi';
import { StudentProfile } from '../../types';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import {
  UserCheck,
  Upload,
  FileText,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Save,
} from 'lucide-react';

export const StudentProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [uploadingResume, setUploadingResume] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form Fields
  const [rollNumber, setRollNumber] = useState('');
  const [branch, setBranch] = useState('CSE');
  const [cgpa, setCgpa] = useState<number>(8.0);
  const [graduationYear, setGraduationYear] = useState<number>(2027);
  const [activeBacklogs, setActiveBacklogs] = useState<number>(0);
  const [totalBacklogs, setTotalBacklogs] = useState<number>(0);
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');

  // Skill Input
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Intermediate');

  const fetchProfile = async () => {
    try {
      const data = await studentApi.getProfile();
      setProfile(data);
      setRollNumber(data.rollNumber || '');
      setBranch(data.branch || 'CSE');
      setCgpa(data.cgpa || 8.0);
      setGraduationYear(data.graduationYear || 2027);
      setActiveBacklogs(data.activeBacklogs || 0);
      setTotalBacklogs(data.totalBacklogs || 0);
      setPhone(data.phone || '');
      setBio(data.bio || '');
      setLinkedInUrl(data.linkedInUrl || '');
      setGithubUrl(data.githubUrl || '');
      setPortfolioUrl(data.portfolioUrl || '');
    } catch (e) {
      console.error(e);
      setMessage({ type: 'error', text: 'Failed to load profile details.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const updated = await studentApi.updateProfile({
        rollNumber,
        branch,
        cgpa: Number(cgpa),
        graduationYear: Number(graduationYear),
        activeBacklogs: Number(activeBacklogs),
        totalBacklogs: Number(totalBacklogs),
        phone,
        bio,
        linkedInUrl,
        githubUrl,
        portfolioUrl,
      });
      setProfile(updated);
      setMessage({ type: 'success', text: 'Academic profile successfully updated!' });
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update academic profile.',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingResume(true);
    setMessage(null);

    try {
      const updated = await studentApi.uploadResume(file);
      setProfile(updated);
      setMessage({
        type: 'success',
        text: `Resume "${file.name}" uploaded and parsed via Apache PDFBox! AI Analysis updated.`,
      });
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to parse resume PDF.',
      });
    } finally {
      setUploadingResume(false);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;

    try {
      const updated = await studentApi.addSkill(newSkill.trim(), newSkillLevel);
      setProfile(updated);
      setNewSkill('');
      setMessage({ type: 'success', text: `Skill "${newSkill.trim()}" added to your profile.` });
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Failed to add skill.' });
    }
  };

  const handleRemoveSkill = async (skillId: number) => {
    try {
      const updated = await studentApi.removeSkill(skillId);
      setProfile(updated);
    } catch (err: any) {
      console.error(err);
    }
  };

  if (loading) return <LoadingSpinner message="Loading profile..." size="lg" />;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Student Academic Profile
          </h1>
          <p className="text-xs text-slate-500">
            Manage your deterministic placement criteria, verified resume, and technical skills
          </p>
        </div>

        {profile?.verified && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>TPO Verified Profile</span>
          </div>
        )}
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-2.5 text-xs ${
            message.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Grid: Profile Form & Resume Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Academic Profile Form (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-500" />
              <span>Mandatory Placement Criteria</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Roll Number
                </label>
                <input
                  type="text"
                  required
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Branch
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="CSE">CSE (Computer Science)</option>
                  <option value="IT">IT (Information Technology)</option>
                  <option value="ECE">ECE (Electronics & Comm.)</option>
                  <option value="EEE">EEE (Electrical & Electronics)</option>
                  <option value="MECH">MECH (Mechanical)</option>
                  <option value="CIVIL">CIVIL (Civil Engineering)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cumulative CGPA
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  required
                  value={cgpa}
                  onChange={(e) => setCgpa(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Graduation Batch
                </label>
                <input
                  type="number"
                  required
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(parseInt(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Active Backlogs
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={activeBacklogs}
                  onChange={(e) => setActiveBacklogs(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 pt-3">
              Contact & Links
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 91234 56789"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  value={linkedInUrl}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  GitHub Profile
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Portfolio / Website
                </label>
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://myportfolio.dev"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bio / Career Objective
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Brief summary of engineering interests, projects and career goals..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 rounded-xl shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? 'Saving...' : 'Update Academic Profile'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Resume & Skills (1 col) */}
        <div className="space-y-6">
          {/* Resume Upload Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-500" />
              <span>Resume Management</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Parsed via Apache PDFBox securely on the backend
            </p>

            {profile?.resumeOriginalFilename ? (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 mb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <div className="text-xs">
                      <p className="font-bold text-slate-800 truncate max-w-[170px]">
                        {profile.resumeOriginalFilename}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        Uploaded {profile.resumeUploadedAt ? new Date(profile.resumeUploadedAt).toLocaleDateString() : 'Active'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-slate-200 text-center mb-4 text-xs text-slate-400">
                No resume uploaded yet.
              </div>
            )}

            <label className="block w-full">
              <div className="w-full py-2.5 px-4 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-xl transition-colors cursor-pointer text-center flex items-center justify-center gap-2 shadow-sm">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingResume ? 'Extracting Text...' : 'Upload PDF Resume'}</span>
              </div>
              <input
                type="file"
                accept=".pdf,.txt"
                onChange={handleResumeUpload}
                disabled={uploadingResume}
                className="hidden"
              />
            </label>
          </div>

          {/* Technical Skills Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Technical Skills</h3>
            <p className="text-xs text-slate-500 mb-3">
              Matched against drive requirements in job search
            </p>

            {/* Add Skill Form */}
            <form onSubmit={handleAddSkill} className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="e.g. Docker, Redis"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>

            {/* Current Skills List */}
            <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto">
              {profile?.skills.length === 0 ? (
                <span className="text-xs text-slate-400 italic">No skills added yet.</span>
              ) : (
                profile?.skills.map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 font-medium border border-amber-200/80"
                  >
                    <span>{s.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(s.id)}
                      className="text-amber-500 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

