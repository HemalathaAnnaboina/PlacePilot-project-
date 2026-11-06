import React from 'react';
import { EligibilityResult } from '../../types';
import { Modal } from '../common/Modal';
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: EligibilityResult | null;
  onApply?: () => void;
  alreadyApplied?: boolean;
}

export const EligibilityModal: React.FC<EligibilityModalProps> = ({
  isOpen,
  onClose,
  result,
  onApply,
  alreadyApplied = false,
}) => {
  if (!result) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Deterministic Eligibility Verification"
      subtitle={`${result.companyName} • ${result.driveTitle}`}
      maxWidth="xl"
    >
      <div className="space-y-5">
        {/* Overall Status Banner */}
        <div
          className={`p-4 rounded-xl border flex items-start gap-3.5 ${
            result.eligible
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
              : 'bg-rose-50/80 border-rose-200 text-rose-900'
          }`}
        >
          {result.eligible ? (
            <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base">
                {result.eligible ? 'Eligible to Apply' : 'Ineligible for this Drive'}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${
                  result.eligible
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-rose-100 text-rose-800 border-rose-300'
                }`}
              >
                {result.status}
              </span>
            </div>
            <p className="text-xs mt-1 text-slate-700 leading-relaxed">
              {result.summaryMessage}
            </p>
          </div>
        </div>

        {/* Criteria Breakdown Grid */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
            Rule-by-Rule Criterion Assessment (Deterministic Engine)
          </h4>
          <div className="space-y-2">
            {result.criteria.map((c, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border transition-all ${
                  c.passed
                    ? 'bg-white border-slate-200 hover:border-emerald-300'
                    : 'bg-rose-50/40 border-rose-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    {c.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600" />
                    )}
                    <span className="text-sm font-semibold text-slate-800">
                      {c.criterionName}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                      c.passed ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {c.passed ? 'PASSED' : 'FAILED'}
                  </span>
                </div>

                <div className="grid grid-cols-2 text-xs text-slate-600 pl-6 gap-2 my-1">
                  <div>
                    <span className="text-slate-400">Your Record: </span>
                    <span className="font-medium text-slate-800">{c.studentValue || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Cutoff Requirement: </span>
                    <span className="font-medium text-slate-800">{c.requiredValue}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 pl-6 mt-1 italic">{c.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Close
          </button>

          {result.eligible && !alreadyApplied && onApply && (
            <button
              onClick={() => {
                onClose();
                onApply();
              }}
              className="px-5 py-2 text-sm font-semibold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-xl transition-colors shadow-sm"
            >
              Proceed to Apply
            </button>
          )}

          {alreadyApplied && (
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200">
              Already Applied
            </span>
          )}
        </div>
      </div>
    </Modal>
  );
};

