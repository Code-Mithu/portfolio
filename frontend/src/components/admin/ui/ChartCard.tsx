'use client';

import React from 'react';

interface ChartCardProps {
  title: string;
  controls?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({ title, controls, footer, children, className = '' }: ChartCardProps) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 ${className}`}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {controls && <div className="flex items-center gap-2">{controls}</div>}
      </div>
      <div className="p-5">{children}</div>
      {footer && (
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 rounded-b-xl">
          {footer}
        </div>
      )}
    </div>
  );
}

export function ChartCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 animate-pulse">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="h-4 w-32 bg-slate-200 rounded" />
        <div className="h-4 w-20 bg-slate-100 rounded" />
      </div>
      <div className="p-5">
        <div className="h-48 bg-slate-100 rounded-lg" />
      </div>
    </div>
  );
}
