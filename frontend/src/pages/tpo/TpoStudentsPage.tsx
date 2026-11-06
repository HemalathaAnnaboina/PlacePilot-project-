import React, { useState, useEffect } from 'react';
import { tpoApi } from '../../api/tpoApi';
import { StudentProfile } from '../../types';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Modal } from '../../components/common/Modal';
import {
  Users,
  Search,
  CheckCircle2,
  XCircle,
  FileText,
  ShieldCheck,
  ShieldAlert,
  ExternalLink,
} from 'lucide-react';

export const TpoStudentsPage: React.FC = () => {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('ALL');
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  const fetchStudents = async () => {
    try {
      const data = await tpoApi.getStudents();
      setStudents(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleToggleVerify = async (studentId: number, currentStatus: boolean) => {
    try {
      await tpoApi.verifyStudent(studentId, !currentStatus);
      setStudents((prev) =>
        prev.map((s) => (s.id === studentId ? { ...s, verified: !currentStatus } : s))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = students.filter((s) => {
    const matchSearch =
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());

    const matchBranch = branchFilter === 'ALL' || s.branch === branchFilter;
    return matchSearch && matchBranch;
  });

  if (loading) return <LoadingSpinner message="Loading student roster..." size="lg" />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Student Verification & Directory
        </h1>
        <p className="text-xs text-slate-500">
          Inspect student academic credentials, verify placement eligibility, and view uploaded
          resumes
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search student by name, roll, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <select
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
          className="px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-700 w-full sm:w-auto"
        >
          <option value="ALL">All Branches</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="MECH">MECH</option>
        </select>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Roll Number</th>
                <th className="py-3.5 px-4">Branch</th>
                <th className="py-3.5 px-4">CGPA</th>
                <th className="py-3.5 px-4">Backlogs</th>
                <th className="py-3.5 px-4">Batch</th>
                <th className="py-3.5 px-4">Verification</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{s.fullName}</div>
                    <div className="text-[11px] text-slate-400">{s.email}</div>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                    {s.rollNumber}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {s.branch}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">{s.cgpa}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-semibold px-2 py-0.5 rounded-full ${
                        s.activeBacklogs === 0
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {s.activeBacklogs} active
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{s.graduationYear}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleToggleVerify(s.id, s.verified)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                        s.verified
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                      }`}
                    >
                      {s.verified ? (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Verified</span>
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                          <span>Unverified</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedStudent(s)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Inspect Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Profile Inspection Modal */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Student Profile: ${selectedStudent.fullName}`}
          subtitle={`Roll: ${selectedStudent.rollNumber} • ${selectedStudent.branch}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400">Email:</span>
                <p className="font-semibold text-slate-800">{selectedStudent.email}</p>
              </div>
              <div>
                <span className="text-slate-400">Phone:</span>
                <p className="font-semibold text-slate-800">
                  {selectedStudent.phone || 'Not provided'}
                </p>
              </div>
              <div>
                <span className="text-slate-400">CGPA:</span>
                <p className="font-bold text-slate-900">{selectedStudent.cgpa} / 10.0</p>
              </div>
              <div>
                <span className="text-slate-400">Backlogs:</span>
                <p className="font-bold text-slate-900">
                  {selectedStudent.activeBacklogs} Active ({selectedStudent.totalBacklogs} History)
                </p>
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-800 block mb-1.5">Registered Skills</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedStudent.skills.map((sk) => (
                  <span
                    key={sk.id}
                    className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 font-medium border border-amber-200"
                  >
                    {sk.name} ({sk.proficiencyLevel})
                  </span>
                ))}
              </div>
            </div>

            {selectedStudent.bio && (
              <div>
                <span className="font-bold text-slate-800 block mb-1">Career Objective</span>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {selectedStudent.bio}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <span className="text-[11px] text-slate-400">
                Status:{' '}
                <strong className={selectedStudent.verified ? 'text-emerald-700' : 'text-rose-700'}>
                  {selectedStudent.verified ? 'Approved by TPO' : 'Pending Verification'}
                </strong>
              </span>

              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-semibold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

