import React, { useState, useEffect } from 'react';
import { aiApi } from '../../api/aiApi';
import { studentApi } from '../../api/studentApi';
import { driveApi } from '../../api/driveApi';
import { AiResumeAnalysis, PlacementDrive, StudentProfile } from '../../types';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import {
  FileText,
  Sparkles,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Layers,
  GraduationCap,
  Briefcase,
  Target,
  RefreshCw,
} from 'lucide-react';

export const StudentResumeAnalyzerPage: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [drives, setDrives] = useState<PlacementDrive[]>([]);
  const [analysis, setAnalysis] = useState<AiResumeAnalysis | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      try {
        const [profData, drivesData] = await Promise.all([
          studentApi.getProfile(),
          driveApi.getActiveDrives(),
        ]);
        setProfile(profData);
        setDrives(drivesData);

        const initialAnalysis = await aiApi.analyzeResume();
        setAnalysis(initialAnalysis);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleRunAnalysis = async (jobId?: number) => {
    setAnalyzing(true);
    try {
      const res = await aiApi.analyzeResume(jobId);
      setAnalysis(res);
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const updatedProfile = await studentApi.uploadResume(file);
      setProfile(updatedProfile);
      const res = await aiApi.analyzeResume(selectedJobId);
      setAnalysis(res);
    } catch (e) {
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Analyzing resume with AI..." size="lg" />;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>AI Resume Optimization Suite</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Resume Quality & ATS Compatibility Audit
          </h1>
          <p className="text-xs text-slate-500">
            Extracts resume text securely using Apache PDFBox to detect skills, quantify impact, and
            target job keywords
          </p>
        </div>

        {/* Upload & Re-run Controls */}
        <div className="flex items-center gap-2">
          <label className="cursor-pointer">
            <div className="px-3.5 py-2 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl transition-colors shadow-sm flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5 text-slate-500" />
              <span>{uploading ? 'Extracting...' : 'Upload PDF'}</span>
            </div>
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>

          <button
            onClick={() => handleRunAnalysis(selectedJobId)}
            disabled={analyzing}
            className="px-4 py-2 text-xs font-bold bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${analyzing ? 'animate-spin' : ''}`} />
            <span>{analyzing ? 'Auditing...' : 'Re-Analyze'}</span>
          </button>
        </div>
      </div>

      {/* Target Job Keyword Comparison Dropdown */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Target className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <div>
            <h3 className="text-xs font-bold text-slate-900">Compare Against Placement Drive</h3>
            <p className="text-[11px] text-slate-500">
              Audit missing keywords specifically required for a selected visiting recruiter
            </p>
          </div>
        </div>

        <select
          value={selectedJobId || ''}
          onChange={(e) => {
            const val = e.target.value ? Number(e.target.value) : undefined;
            setSelectedJobId(val);
            handleRunAnalysis(val);
          }}
          className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-700"
        >
          <option value="">General Benchmark (No specific job)</option>
          {drives.map((d) => (
            <option key={d.id} value={d.id}>
              {d.companyName} — {d.title}
            </option>
          ))}
        </select>
      </div>

      {analysis && (
        <div className="space-y-6">
          {/* Top Score Meters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Overall Resume Quality
              </span>
              <div className="text-4xl font-extrabold text-slate-900 mt-2">
                {analysis.overallScore}%
              </div>
              <p className="text-xs text-slate-400 mt-1">Weighted holistic evaluation</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                ATS Compatibility
              </span>
              <div className="text-4xl font-extrabold text-emerald-700 mt-2">
                {analysis.atsCompatibilityScore}%
              </div>
              <p className="text-xs text-slate-400 mt-1">Applicant Tracking System filter score</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                Quantified Impact
              </span>
              <div className="text-4xl font-extrabold text-indigo-700 mt-2">
                {analysis.impactScore}%
              </div>
              <p className="text-xs text-slate-400 mt-1">Action verbs and measurable results</p>
            </div>
          </div>

          {/* Executive Assessment */}
          <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-200/80 text-xs text-slate-800 leading-relaxed">
            <span className="font-bold text-amber-950 flex items-center gap-1.5 text-sm mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Executive Assessment
            </span>
            {analysis.executiveSummary}
          </div>

          {/* Extracted Skills & Missing Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recognized Skills */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-3">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>Extracted Engineering Skills ({analysis.identifiedSkills.length})</span>
              </h3>
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

            {/* Missing Keywords for Target Job */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-3">
                <Target className="w-4 h-4 text-rose-500" />
                <span>Recommended Keywords to Add ({analysis.recommendedKeywords.length})</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {analysis.recommendedKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-rose-50 text-rose-900 font-medium border border-rose-200"
                  >
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Strengths</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {analysis.keyStrengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Actionable Improvements</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {analysis.areasOfImprovement.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bullet Point Rewrites */}
          {analysis.bulletPointImprovements && analysis.bulletPointImprovements.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                AI Bullet Point Rewriter (STAR Impact Formulation)
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Replace passive task statements with quantified engineering impact
              </p>

              <div className="space-y-3">
                {analysis.bulletPointImprovements.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50/60 border border-slate-200 text-xs"
                  >
                    <div className="text-slate-500 mb-1.5">
                      <span className="font-bold text-rose-600">Before: </span>
                      <span>"{b.original}"</span>
                    </div>
                    <div className="text-emerald-900 font-medium bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-emerald-800 block mb-0.5">
                          Upgraded Formulation:
                        </span>
                        <span>"{b.suggested}"</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2 italic pl-6">{b.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

