import React, { useState, useEffect } from 'react';
import { tpoApi } from '../../api/tpoApi';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Building2, CheckCircle2, XCircle, ShieldCheck, ShieldAlert, Mail, Phone } from 'lucide-react';

export const TpoRecruitersPage: React.FC = () => {
  const [recruiters, setRecruiters] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRecruiters = async () => {
    try {
      const data = await tpoApi.getRecruiters();
      setRecruiters(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const handleToggleApprove = async (recruiterId: number, currentApproved: boolean) => {
    try {
      await tpoApi.approveRecruiter(recruiterId, !currentApproved);
      setRecruiters((prev) =>
        prev.map((r) => (r.id === recruiterId ? { ...r, approved: !currentApproved } : r))
      );
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <LoadingSpinner message="Loading recruiter partners..." size="lg" />;

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Recruiter Partners & Approvals
        </h1>
        <p className="text-xs text-slate-500">
          Manage authorized company representatives and authenticate corporate hiring access
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {recruiters.map((rec) => (
          <div
            key={rec.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{rec.companyName}</h3>
                    <span className="text-[11px] text-slate-500">{rec.companyIndustry}</span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    rec.approved
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border-rose-200'
                  }`}
                >
                  {rec.approved ? 'Authorized' : 'Pending'}
                </span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs space-y-2">
                <div>
                  <span className="text-slate-400">Representative:</span>
                  <p className="font-bold text-slate-800">{rec.fullName}</p>
                  <p className="text-[11px] text-slate-500">{rec.designation}</p>
                </div>
                <div className="pt-1 text-[11px] text-slate-600 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{rec.email}</span>
                  </div>
                  {rec.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{rec.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleToggleApprove(rec.id, rec.approved)}
                className={`w-full py-2 px-3 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                  rec.approved
                    ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                    : 'bg-emerald-400 text-slate-950 border-emerald-500 hover:bg-emerald-500'
                }`}
              >
                {rec.approved ? (
                  <>
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Revoke Access</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Approve Recruiter</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

