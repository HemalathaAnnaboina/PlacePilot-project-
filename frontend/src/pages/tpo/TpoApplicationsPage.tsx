import React, { useState, useEffect } from 'react';
import { applicationApi } from '../../api/applicationApi';
import { Application, ApplicationStatus } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ListOrdered, Search, Building2, Calendar, FileText } from 'lucide-react';

export const TpoApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const data = await applicationApi.getAllApplications();
        setApplications(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <LoadingSpinner message="Loading applications pipeline..." size="lg" />;

  const filtered = applications.filter((a) => {
    const matchStatus = statusFilter === 'ALL' || a.status === statusFilter;
    const matchSearch =
      a.studentName.toLowerCase().includes(search.toLowerCase()) ||
      a.companyName.toLowerCase().includes(search.toLowerCase()) ||
      a.studentRollNumber.toLowerCase().includes(search.toLowerCase()) ||
      a.roleName.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          College-Wide Application Pipeline
        </h1>
        <p className="text-xs text-slate-500">
          Monitor application progression and audit logs across all campus placement drives
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search candidate, company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-700 w-full sm:w-auto"
        >
          <option value="ALL">All Stages</option>
          <option value="APPLIED">Applied</option>
          <option value="UNDER_REVIEW">Under Review</option>
          <option value="SHORTLISTED">Shortlisted</option>
          <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
          <option value="SELECTED">Selected / Placed</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Branch & CGPA</th>
                <th className="py-3.5 px-4">Company & Drive</th>
                <th className="py-3.5 px-4">Stage</th>
                <th className="py-3.5 px-4">Match Score</th>
                <th className="py-3.5 px-4">Applied Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{app.studentName}</div>
                    <div className="text-[11px] text-slate-400">{app.studentRollNumber}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {app.studentBranch}
                    </span>
                    <span className="ml-2 font-bold text-slate-900">{app.studentCgpa} CGPA</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{app.companyName}</div>
                    <div className="text-[11px] text-slate-500">{app.roleName}</div>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={app.status} size="sm" />
                  </td>
                  <td className="py-3 px-4">
                    {app.matchScore ? (
                      <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        {app.matchScore}%
                      </span>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

