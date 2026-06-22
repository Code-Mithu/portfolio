import React from 'react';

type Status = 'published' | 'draft' | 'archived' | 'scheduled' | 'active' | 'inactive' | 'new' | 'contacted' | 'qualified' | 'won' | 'lost';

const STATUS_STYLES: Record<Status, string> = {
  published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  draft: 'bg-slate-50 text-slate-600 border-slate-200',
  archived: 'bg-amber-50 text-amber-700 border-amber-200',
  scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  inactive: 'bg-slate-50 text-slate-600 border-slate-200',
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  contacted: 'bg-purple-50 text-purple-700 border-purple-200',
  qualified: 'bg-amber-50 text-amber-700 border-amber-200',
  won: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  lost: 'bg-red-50 text-red-600 border-red-200',
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${STATUS_STYLES[status] ?? STATUS_STYLES.draft} ${className}`}
    >
      {status}
    </span>
  );
}
