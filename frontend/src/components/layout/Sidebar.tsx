import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  UserCheck,
  Briefcase,
  FileText,
  Sparkles,
  TrendingUp,
  MessageSquare,
  Users,
  Building2,
  Megaphone,
  BarChart3,
  CheckCircle2,
  ListOrdered,
} from 'lucide-react';

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const { isStudent, isTpo, isRecruiter } = useAuth();

  const studentLinks: NavItem[] = [
    { to: '/student/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { to: '/student/profile', icon: UserCheck, label: 'Academic Profile' },
    { to: '/student/drives', icon: Briefcase, label: 'Placement Drives' },
    { to: '/student/applications', icon: ListOrdered, label: 'My Applications' },
    { to: '/student/resume-analyzer', icon: FileText, label: 'AI Resume Audit', badge: 'AI' },
    { to: '/student/skill-gap', icon: TrendingUp, label: 'AI Skill Gap', badge: 'AI' },
    { to: '/student/mock-interview', icon: MessageSquare, label: 'AI Mock Interview', badge: 'AI' },
  ];

  const tpoLinks: NavItem[] = [
    { to: '/tpo/dashboard', icon: LayoutDashboard, label: 'Placement Stats' },
    { to: '/tpo/drives', icon: Briefcase, label: 'Manage Drives' },
    { to: '/tpo/students', icon: Users, label: 'Student Directory' },
    { to: '/tpo/recruiters', icon: Building2, label: 'Recruiters & Companies' },
    { to: '/tpo/applications', icon: ListOrdered, label: 'Recruitment Funnel' },
    { to: '/tpo/ai-insights', icon: BarChart3, label: 'AI Placement Insights', badge: 'AI' },
    { to: '/tpo/announcements', icon: Megaphone, label: 'Announcements' },
  ];

  const recruiterLinks: NavItem[] = [
    { to: '/recruiter/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/recruiter/company', icon: Building2, label: 'Company Profile' },
    { to: '/recruiter/drives', icon: Briefcase, label: 'Job Postings' },
    { to: '/recruiter/applicants', icon: Users, label: 'Candidate Pipeline' },
  ];

  const links = isTpo ? tpoLinks : isRecruiter ? recruiterLinks : studentLinks;

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 min-h-[calc(100vh-61px)] p-4 flex flex-col justify-between flex-shrink-0">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          {isTpo ? 'TPO Portal' : isRecruiter ? 'Recruiter Hub' : 'Student Portal'}
        </div>

        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-slate-900 text-amber-300">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Embedded Help / Status Pill */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs mt-6">
        <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>PlacePilot Engine</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Rule-based eligibility engine and smart AI preparation suite.
        </p>
      </div>
    </aside>
  );
};

