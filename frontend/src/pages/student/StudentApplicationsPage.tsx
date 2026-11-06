import React, { useState, useEffect } from 'react';
import { applicationApi } from '../../api/applicationApi';
import { Application, ApplicationStatus } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import {
  ListOrdered,
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
} from 'lucide-react';

export const StudentApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const fetchApplications = async () => {
    try {
      const data = await applicationApi.getMyApplications();
      setApplications(data);
      if (data.length > 0) setSelectedApp(data[0]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <LoadingSpinner message="Loading your applications..." size="lg" />;

  const workflowStages: ApplicationStatus[] = [
    'APPLIED',
    'UNDER_REVIEW',
    'SHORTLISTED',
    'INTERVIEW_SCHEDULED',
    'SELECTED',
  ];

  const getStageIndex = (status: ApplicationStatus) => {
    if (status === 'REJECTED') return -1;
    return workflowStages.indexOf(status);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Application Tracking & Stages
        </h1>
        <p className="text-xs text-slate-500">
          Monitor your recruitment progress across each stage with full audit timestamps
        </p>
      </div>

      {applications.length === 0 ? (
        <EmptyState
          title="No Applications Submitted"
          description="Explore active placement drives and submit your profile to begin tracking interview stages."
          actionText="Browse Placement Drives"
          onAction={() => (window.location.href = '/student/drives')}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications List (1 col) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Submitted Applications ({applications.length})
            </h3>
            <div className="space-y-2.5">
              {applications.map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedApp?.id === app.id
                      ? 'bg-amber-50/70 border-amber-400 shadow-sm'
                      : 'bg-white border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-slate-900 truncate">
                      {app.companyName}
                    </span>
                    <StatusBadge status={app.status} size="sm" />
                  </div>
                  <p className="text-xs text-slate-600 truncate">{app.roleName}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                    <span>Applied {new Date(app.appliedAt).toLocaleDateString()}</span>
                    {app.matchScore && (
                      <span className="font-bold text-amber-700 bg-amber-100/60 px-1.5 py-0.2 rounded">
                        {app.matchScore}% Match
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Detail & Workflow Tracker (2 cols) */}
          {selectedApp && (
            <div className="lg:col-span-2 space-y-6">
              {/* Top Summary Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                      Application #{selectedApp.id}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                      {selectedApp.driveTitle}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      {selectedApp.companyName} • {selectedApp.roleName}
                    </p>
                  </div>
                  <StatusBadge status={selectedApp.status} size="md" />
                </div>

                {/* Workflow Stepper */}
                <div className="pt-6 pb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                    Recruitment Funnel Progress
                  </h4>

                  {selectedApp.status === 'REJECTED' ? (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-xs text-rose-800">
                      <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                      <div>
                        <span className="font-bold block">Application Status: Rejected</span>
                        <span>Candidate was not shortlisted for further rounds. Keep practicing!</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      {/* Stepper Bar */}
                      <div className="grid grid-cols-5 gap-1 relative">
                        {workflowStages.map((stage, idx) => {
                          const currentIdx = getStageIndex(selectedApp.status);
                          const isPassed = idx <= currentIdx;
                          const isCurrent = idx === currentIdx;

                          return (
                            <div key={stage} className="flex flex-col items-center text-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all z-10 ${
                                  isPassed
                                    ? 'bg-amber-400 text-slate-950 font-black shadow-sm ring-4 ring-amber-100'
                                    : 'bg-slate-100 text-slate-400'
                                }`}
                              >
                                {isPassed ? '✓' : idx + 1}
                              </div>
                              <span
                                className={`text-[10px] font-semibold mt-2 max-w-[80px] leading-tight ${
                                  isCurrent
                                    ? 'text-slate-950 font-bold'
                                    : isPassed
                                    ? 'text-slate-700'
                                    : 'text-slate-400'
                                }`}
                              >
                                {stage.replace('_', ' ')}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Scheduled Interviews Box */}
              {selectedApp.interviews && selectedApp.interviews.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    <span>Scheduled Interview Rounds</span>
                  </h3>

                  <div className="space-y-3">
                    {selectedApp.interviews.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-xs text-indigo-950">{item.roundName}</h4>
                            <span className="text-[10px] font-semibold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                              {item.result}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              {new Date(item.scheduledTime).toLocaleString()}
                            </span>
                            <span>•</span>
                            <span>{item.location || 'Online Meet'}</span>
                          </div>
                          {item.instructions && (
                            <p className="text-[11px] text-slate-500 mt-2 bg-white/80 p-2 rounded-lg border border-indigo-100">
                              Instructions: {item.instructions}
                            </p>
                          )}
                        </div>

                        {item.meetingLink && (
                          <a
                            href={item.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm flex-shrink-0"
                          >
                            <span>Join Meeting</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Application History & Audit Timeline */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Audit History Timeline</span>
                </h3>

                <div className="relative pl-6 space-y-4 border-l-2 border-slate-100">
                  {selectedApp.history.map((h) => (
                    <div key={h.id} className="relative">
                      <div className="absolute -left-[31px] top-0.5 w-3 h-3 rounded-full bg-amber-400 border-2 border-white shadow-xs" />
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">
                          Status Transition: {h.toStatus.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(h.createdAt).toLocaleString()}
                        </span>
                      </div>
                      {h.remarks && (
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100 mt-1">
                          Remarks: {h.remarks}
                        </p>
                      )}
                      <span className="text-[10px] text-slate-400 block mt-1">
                        Updated by: {h.updatedBy || 'System Recruiter'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

