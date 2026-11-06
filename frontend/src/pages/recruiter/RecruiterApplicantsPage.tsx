import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { recruiterApi } from '../../api/recruiterApi';
import { applicationApi } from '../../api/applicationApi';
import { Application, ApplicationStatus, PlacementDrive } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Modal } from '../../components/common/Modal';
import {
  Users,
  Search,
  Filter,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Edit2,
  FileText,
} from 'lucide-react';

export const RecruiterApplicantsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const driveIdParam = searchParams.get('driveId');

  const [drives, setDrives] = useState<PlacementDrive[]>([]);
  const [selectedDriveId, setSelectedDriveId] = useState<number | null>(
    driveIdParam ? Number(driveIdParam) : null
  );
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal States
  const [selectedAppForStatus, setSelectedAppForStatus] = useState<Application | null>(null);
  const [targetStatus, setTargetStatus] = useState<ApplicationStatus>('SHORTLISTED');
  const [remarks, setRemarks] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Schedule Interview Modal
  const [selectedAppForInterview, setSelectedAppForInterview] = useState<Application | null>(null);
  const [roundName, setRoundName] = useState('Technical Interview 1');
  const [scheduledTime, setScheduledTime] = useState('');
  const [meetingLink, setMeetingLink] = useState('https://meet.google.com/abc-demo-room');
  const [location, setLocation] = useState('Google Meet');
  const [instructions, setInstructions] = useState('Prepare for Live Coding and System Architecture questions.');
  const [scheduling, setScheduling] = useState(false);

  const [inspectApp, setInspectApp] = useState<Application | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const myDrives = await recruiterApi.getMyDrives();
        setDrives(myDrives);

        const currentDriveId = selectedDriveId || (myDrives.length > 0 ? myDrives[0].id : null);
        if (currentDriveId) {
          setSelectedDriveId(currentDriveId);
          const apps = await recruiterApi.getDriveApplicants(currentDriveId);
          setApplicants(apps);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleSelectDrive = async (id: number) => {
    setSelectedDriveId(id);
    setLoading(true);
    try {
      const apps = await recruiterApi.getDriveApplicants(id);
      setApplicants(apps);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppForStatus) return;
    setUpdatingStatus(true);

    try {
      const updated = await applicationApi.updateStatus(
        selectedAppForStatus.id,
        targetStatus,
        remarks || `Status updated to ${targetStatus}`
      );
      setApplicants((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
      setSelectedAppForStatus(null);
      setRemarks('');
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleScheduleInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppForInterview) return;
    setScheduling(true);

    try {
      await applicationApi.scheduleInterview(selectedAppForInterview.id, {
        roundName,
        scheduledTime: scheduledTime || new Date(Date.now() + 86400000 * 2).toISOString(),
        meetingLink,
        location,
        instructions,
      });

      // Refresh applicants for updated status
      if (selectedDriveId) {
        const apps = await recruiterApi.getDriveApplicants(selectedDriveId);
        setApplicants(apps);
      }
      setSelectedAppForInterview(null);
    } catch (e) {
      console.error(e);
    } finally {
      setScheduling(false);
    }
  };

  const filtered = applicants.filter((a) => {
    const matchSearch =
      a.studentName.toLowerCase().includes(search.toLowerCase()) ||
      a.studentRollNumber.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  if (loading) return <LoadingSpinner message="Loading candidate applicants..." size="lg" />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Candidate Pipeline & Screening
          </h1>
          <p className="text-xs text-slate-500">
            Review student applications, inspect AI match scores, shortlist candidates, and schedule
            interview rounds
          </p>
        </div>

        {/* Drive Selector */}
        {drives.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 hidden sm:block">Drive:</span>
            <select
              value={selectedDriveId || ''}
              onChange={(e) => handleSelectDrive(Number(e.target.value))}
              className="px-3.5 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-800 shadow-sm"
            >
              {drives.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title} ({d.packageLpa} LPA)
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search candidate name or roll number..."
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
          <option value="ALL">All Application Stages</option>
          <option value="APPLIED">Applied</option>
          <option value="UNDER_REVIEW">Under Review</option>
          <option value="SHORTLISTED">Shortlisted</option>
          <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
          <option value="SELECTED">Selected / Offered</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* Applicants Table */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400">
          No applicants found matching this criteria for this placement drive.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Candidate</th>
                  <th className="py-3.5 px-4">Branch & CGPA</th>
                  <th className="py-3.5 px-4">AI Match</th>
                  <th className="py-3.5 px-4">Stage</th>
                  <th className="py-3.5 px-4">Applied</th>
                  <th className="py-3.5 px-4 text-right">Hiring Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{app.studentName}</div>
                      <div className="text-[11px] text-slate-400">
                        Roll: {app.studentRollNumber} • {app.studentEmail}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {app.studentBranch}
                      </span>
                      <span className="ml-2 font-bold text-slate-900">{app.studentCgpa} CGPA</span>
                    </td>

                    <td className="py-3 px-4">
                      {app.matchScore ? (
                        <span className="font-extrabold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 inline-flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          {app.matchScore}%
                        </span>
                      ) : (
                        'N/A'
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <StatusBadge status={app.status} size="sm" />
                    </td>

                    <td className="py-3 px-4 text-slate-500">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>

                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedAppForStatus(app);
                          setTargetStatus(app.status);
                        }}
                        className="px-2.5 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-xs"
                      >
                        Update Stage
                      </button>

                      <button
                        onClick={() => {
                          setSelectedAppForInterview(app);
                          const future = new Date(Date.now() + 86400000 * 2);
                          setScheduledTime(future.toISOString().slice(0, 16));
                        }}
                        className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg text-xs transition-colors border border-indigo-200"
                      >
                        Schedule Interview
                      </button>

                      <button
                        onClick={() => setInspectApp(app)}
                        className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                      >
                        History
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {selectedAppForStatus && (
        <Modal
          isOpen={!!selectedAppForStatus}
          onClose={() => setSelectedAppForStatus(null)}
          title={`Update Recruitment Stage: ${selectedAppForStatus.studentName}`}
          subtitle={`Current Stage: ${selectedAppForStatus.status.replace('_', ' ')}`}
          maxWidth="md"
        >
          <form onSubmit={handleUpdateStatus} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Stage
              </label>
              <select
                value={targetStatus}
                onChange={(e) => setTargetStatus(e.target.value as ApplicationStatus)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-semibold text-slate-800"
              >
                <option value="APPLIED">Applied</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="SHORTLISTED">Shortlisted</option>
                <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
                <option value="SELECTED">Selected / Offered</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Recruiter Remarks / Feedback (Logged in Audit History)
              </label>
              <textarea
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="e.g. Candidate demonstrated strong problem solving in screening."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedAppForStatus(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updatingStatus}
                className="px-5 py-2 text-xs font-bold bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl transition-all shadow-sm"
              >
                {updatingStatus ? 'Updating...' : 'Commit Status Update'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Schedule Interview Modal */}
      {selectedAppForInterview && (
        <Modal
          isOpen={!!selectedAppForInterview}
          onClose={() => setSelectedAppForInterview(null)}
          title={`Schedule Interview: ${selectedAppForInterview.studentName}`}
          subtitle={`Drive: ${selectedAppForInterview.driveTitle}`}
          maxWidth="lg"
        >
          <form onSubmit={handleScheduleInterview} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Interview Round Name
                </label>
                <input
                  type="text"
                  required
                  value={roundName}
                  onChange={(e) => setRoundName(e.target.value)}
                  placeholder="Technical Round 1"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  required
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Meeting Link
                </label>
                <input
                  type="url"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder="https://meet.google.com/xyz"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Google Meet / Campus Conference Room 2"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Candidate Instructions
              </label>
              <textarea
                rows={2}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="What should the candidate prepare or bring?"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedAppForInterview(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={scheduling}
                className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-sm"
              >
                {scheduling ? 'Scheduling...' : 'Dispatch Interview Invitation'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Inspect History Modal */}
      {inspectApp && (
        <Modal
          isOpen={!!inspectApp}
          onClose={() => setInspectApp(null)}
          title={`Application History: ${inspectApp.studentName}`}
          subtitle={`Drive: ${inspectApp.driveTitle}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            {inspectApp.matchExplanation && (
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900">
                <span className="font-bold block mb-0.5">AI Match Assessment:</span>
                <p className="leading-relaxed">{inspectApp.matchExplanation}</p>
              </div>
            )}

            <div>
              <span className="font-bold text-slate-800 block mb-2">Audit History</span>
              <div className="space-y-2 border-l-2 border-slate-100 pl-4">
                {inspectApp.history.map((h) => (
                  <div key={h.id} className="relative">
                    <span className="font-bold text-slate-800">
                      Moved to: {h.toStatus.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {new Date(h.createdAt).toLocaleString()} by {h.updatedBy || 'Recruiter'}
                    </span>
                    {h.remarks && (
                      <p className="text-slate-600 bg-slate-50 p-1.5 rounded mt-0.5">
                        {h.remarks}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setInspectApp(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

