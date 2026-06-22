'use client';

import React from 'react';
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: string;
  delta?: { value: string; positive: boolean };
  icon?: LucideIcon;
  sparkline?: number[];
  onClick?: () => void;
}

function MiniSparkline({ data }: { data: number[] }) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 32;
  const w = 80;
  const step = w / (data.length - 1);

  const points = data
    .map((v, i) => `${i * step},${h - ((v - min) / range) * h}`)
    .join(' ');

  return (
    <svg width={w} height={h} className="shrink-0" aria-hidden="true">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-primary"
      />
    </svg>
  );
}

export function KpiCard({ label, value, delta, icon: Icon, sparkline, onClick }: KpiCardProps) {
  const Wrapper = onClick ? 'button' : 'div';

  return (
    <Wrapper
      onClick={onClick}
      className={`
        bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-3
        ${onClick ? 'cursor-pointer hover:border-primary/30 hover:shadow-sm transition-all text-left w-full' : ''}
      `}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        {Icon && <Icon className="w-5 h-5 text-slate-400" />}
      </div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          {delta && (
            <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${delta.positive ? 'text-emerald-600' : 'text-red-500'}`}>
              {delta.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{delta.value}</span>
            </div>
          )}
        </div>
        {sparkline && <MiniSparkline data={sparkline} />}
      </div>
    </Wrapper>
  );
}

export function KpiCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse">
      <div className="h-4 w-24 bg-slate-200 rounded mb-4" />
      <div className="h-7 w-16 bg-slate-200 rounded mb-2" />
      <div className="h-3 w-20 bg-slate-100 rounded" />
    </div>
  );
}
