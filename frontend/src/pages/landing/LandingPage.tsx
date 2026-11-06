import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Briefcase,
  TrendingUp,
  FileText,
  Users,
  CheckCircle2,
  ArrowRight,
  Zap,
  Building2,
  GraduationCap,
} from 'lucide-react';
import { Footer } from '../../components/layout/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center font-black text-slate-950 shadow-sm">
              <span className="text-lg">P</span>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Place<span className="text-amber-500">Pilot</span>
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Explore Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>AI-Powered Smart College Placement Management System</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Bridging Students, TPOs, & Recruiters with{' '}
            <span className="relative inline-block text-slate-900">
              <span className="relative z-10">Intelligent Automation</span>
              <span className="absolute bottom-1.5 left-0 right-0 h-3 bg-amber-300/60 -z-0 rounded-sm" />
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Replace chaotic spreadsheets with a centralized, deterministic placement platform.
            Evaluate criteria with zero bias, accelerate recruiter shortlisting, and coach students
            with tailored AI mock interviews and resume optimization.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/login"
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Launch Live System</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-2xl transition-colors shadow-sm"
            >
              One-Click Role Logins
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm">
              <span className="text-xs text-slate-400 font-medium">Placement Rate</span>
              <div className="text-2xl font-bold text-slate-900 mt-0.5">92.4%</div>
              <span className="text-[11px] text-emerald-600 font-semibold">↑ College Average</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm">
              <span className="text-xs text-slate-400 font-medium">Average CTC</span>
              <div className="text-2xl font-bold text-slate-900 mt-0.5">14.5 LPA</div>
              <span className="text-[11px] text-amber-600 font-semibold">Tier-1 & Product</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm">
              <span className="text-xs text-slate-400 font-medium">Deterministic Rule Engine</span>
              <div className="text-2xl font-bold text-slate-900 mt-0.5">100%</div>
              <span className="text-[11px] text-indigo-600 font-semibold">Zero Hallucinations</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm">
              <span className="text-xs text-slate-400 font-medium">Recruiting Workflow</span>
              <div className="text-2xl font-bold text-slate-900 mt-0.5">5 Stages</div>
              <span className="text-[11px] text-purple-600 font-semibold">Audited History</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars Section */}
      <section className="py-16 px-6 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Role-Based Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
              Purpose-Built Portals for the Placement Ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student */}
            <div className="rounded-2xl p-6 bg-slate-50 border border-slate-200 hover:border-amber-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Student Portal</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Empowering candidates with genuine AI feedback, eligibility verification, and ATS
                  resume audits.
                </p>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Deterministic rule eligibility verification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>AI Resume parsing & ATS keyword scoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Interactive role-specific mock interviews</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Skill-gap roadmap & learning suggestions</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/login"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800"
              >
                <span>Login as Student</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* TPO */}
            <div className="rounded-2xl p-6 bg-slate-50 border border-slate-200 hover:border-purple-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">TPO / Admin Hub</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Complete centralized command over placement statistics, drives, verification, and
                  institutional readiness.
                </p>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Institutional placement analytics & CTC metrics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Branch readiness metrics & skill demand trends</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Student profile verification & recruiter approvals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Targeted campus-wide placement announcements</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/login"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-800"
              >
                <span>Login as TPO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Recruiter */}
            <div className="rounded-2xl p-6 bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Recruiter Suite</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Publish openings with strict cutoffs, review verified candidate resumes, and update
                  interview stages seamlessly.
                </p>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Custom job postings with deterministic cutoffs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>AI match rankings for applicants</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Multi-round interview scheduling with links</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>One-click stage updates with audit logging</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/login"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800"
              >
                <span>Login as Recruiter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-amber-50/50 to-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center mx-auto mb-4 font-black text-slate-950 text-xl shadow-sm">
            P
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Experience PlacePilot Today
          </h2>
          <p className="mt-3 text-sm text-slate-600 max-w-xl mx-auto">
            Log in with pre-seeded test accounts for Students, TPO Officers, and Recruiters with
            full database records and active drives.
          </p>
          <div className="mt-6">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 rounded-2xl shadow-md hover:shadow-lg transition-all"
            >
              <span>Explore All Dashboards</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

