import React from 'react';
import { ApplicationStatus } from '../../types';
import { Clock, Eye, CheckCircle2, Calendar, Award, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: ApplicationStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStyle = () => {
    switch (status) {
      case 'APPLIED':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: Clock,
          label: 'Applied',
        };
      case 'UNDER_REVIEW':
        return {
          bg: 'bg-purple-50 text-purple-700 border-purple-200',
          icon: Eye,
          label: 'Under Review',
        };
      case 'SHORTLISTED':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-300 font-semibold',
          icon: CheckCircle2,
          label: 'Shortlisted',
        };
      case 'INTERVIEW_SCHEDULED':
        return {
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold',
          icon: Calendar,
          label: 'Interview Scheduled',
        };
      case 'SELECTED':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold',
          icon: Award,
          label: 'Selected',
        };
      case 'REJECTED':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          icon: XCircle,
          label: 'Rejected',
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
          icon: Clock,
          label: status,
        };
    }
  };

  const { bg, icon: Icon, label } = getStyle();
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs gap-1' : 'px-2.5 py-1 text-xs gap-1.5';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${bg} ${sizeClasses}`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      {label}
    </span>
  );
};

