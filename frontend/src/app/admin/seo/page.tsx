'use client';

import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/layout/AdminPageWrapper';
import { KpiCard } from '@/components/admin/ui/KpiCard';
import { ChartCard } from '@/components/admin/ui/ChartCard';
import { BarChart } from '@/components/admin/ui/BarChart';
import {
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronRight,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react';

interface SeoIssue {
  id: string;
  severity: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  affectedPages: string[];
}

const MOCK_ISSUES: SeoIssue[] = [
  { id: '1', severity: 'error', title: 'Missing meta descriptions', description: '3 pages lack meta descriptions.', affectedPages: ['/blog/react-tips', '/blog/typescript-guide', '/projects/dashboard'] },
  { id: '2', severity: 'error', title: 'Broken internal links', description: '2 internal links return 404 errors.', affectedPages: ['/about', '/projects'] },
  { id: '3', severity: 'warning', title: 'Missing alt text on images', description: '5 images missing alt attributes.', affectedPages: ['/projects/ecommerce', '/blog/css-grid'] },
  { id: '4', severity: 'warning', title: 'Title tags too long', description: '2 pages have title tags exceeding 60 characters.', affectedPages: ['/blog/scalable-apis', '/case-studies/techcorp'] },
  { id: '5', severity: 'info', title: 'Consider adding structured data', description: 'Adding FAQ schema could improve search visibility.', affectedPages: ['/blog'] },
];

const PAGE_SCORES = [
  { label: 'Home', value: 95 },
  { label: 'About', value: 88 },
  { label: 'Projects', value: 82 },
  { label: 'Blog', value: 76 },
  { label: 'Contact', value: 91 },
];

const SEVERITY_STYLES = {
  error: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
  warning: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
  info: { icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
};

export default function SeoPage() {
  const [selectedIssue, setSelectedIssue] = useState<SeoIssue | null>(null);
  const [search, setSearch] = useState('');

  const errorCount = MOCK_ISSUES.filter((i) => i.severity === 'error').length;
  const warningCount = MOCK_ISSUES.filter((i) => i.severity === 'warning').length;

  return (
    <AdminPageWrapper
      title="SEO Manager"
      breadcrumbs={[{ label: 'Insights' }, { label: 'SEO' }]}
    >
      {/* SEO Score Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 mb-3">
              <span className="text-3xl font-bold text-emerald-600">82</span>
            </div>
            <p className="text-sm font-medium text-slate-900">SEO Score</p>
            <p className="text-xs text-slate-500 mt-1">Good — room for improvement</p>
          </div>
        </div>
        <div className="md:col-span-3 grid grid-cols-3 gap-4">
          <KpiCard label="Errors" value={String(errorCount)} delta={{ value: '-1', positive: true }} icon={XCircle} />
          <KpiCard label="Warnings" value={String(warningCount)} delta={{ value: '+1', positive: false }} icon={AlertTriangle} />
          <KpiCard label="Indexed Pages" value="12" delta={{ value: '+2', positive: true }} icon={ArrowUpRight} />
        </div>
      </div>

      {/* Issues + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Issues list */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Issues ({MOCK_ISSUES.length})</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Filter issues..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-3 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg w-40 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div className="divide-y divide-slate-100 max-h-[480px] overflow-y-auto">
            {MOCK_ISSUES.filter((i) => !search || i.title.toLowerCase().includes(search.toLowerCase())).map((issue) => {
              const { icon: Icon, color, bg } = SEVERITY_STYLES[issue.severity];
              return (
                <button
                  key={issue.id}
                  onClick={() => setSelectedIssue(issue)}
                  className={`flex items-start gap-3 px-5 py-3 w-full text-left hover:bg-slate-50 transition-colors ${
                    selectedIssue?.id === issue.id ? 'bg-slate-50' : ''
                  }`}
                >
                  <div className={`p-1 rounded ${bg} mt-0.5`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{issue.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{issue.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 mt-1 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Issue detail / page scores */}
        <div>
          {selectedIssue ? (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-start gap-3 mb-4">
                {(() => {
                  const { icon: Icon, color, bg } = SEVERITY_STYLES[selectedIssue.severity];
                  return (
                    <div className={`p-1.5 rounded ${bg}`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                  );
                })()}
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{selectedIssue.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{selectedIssue.description}</p>
                </div>
              </div>

              <h4 className="text-sm font-medium text-slate-700 mb-2">Affected Pages</h4>
              <div className="space-y-2">
                {selectedIssue.affectedPages.map((page) => (
                  <div key={page} className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-700 font-mono">{page}</span>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors">
                Fix Issue
              </button>
            </div>
          ) : (
            <ChartCard title="Page SEO Scores">
              <BarChart
                data={PAGE_SCORES.map((p) => ({
                  ...p,
                  color: p.value >= 90 ? '#10b981' : p.value >= 70 ? '#f59e0b' : '#ef4444',
                }))}
                horizontal
              />
            </ChartCard>
          )}
        </div>
      </div>

      {/* Per-page performance */}
      <ChartCard title="Page Performance by SEO Score">
        <div className="relative">
          <input
            type="text"
            placeholder="Search pages..."
            className="w-full sm:w-64 px-3 py-2 text-sm border border-slate-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <div className="space-y-2">
            {PAGE_SCORES.map((page) => (
              <div key={page.label} className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-slate-50">
                <span className="text-sm font-medium text-slate-700 w-24">{page.label}</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${page.value}%`,
                      backgroundColor: page.value >= 90 ? '#10b981' : page.value >= 70 ? '#f59e0b' : '#ef4444',
                    }}
                  />
                </div>
                <span className={`text-sm font-semibold ${
                  page.value >= 90 ? 'text-emerald-600' : page.value >= 70 ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {page.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ChartCard>
    </AdminPageWrapper>
  );
}
