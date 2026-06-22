'use client';

import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/layout/AdminPageWrapper';
import { KpiCard } from '@/components/admin/ui/KpiCard';
import { ChartCard } from '@/components/admin/ui/ChartCard';
import { AreaChart } from '@/components/admin/ui/AreaChart';
import { DonutChart } from '@/components/admin/ui/DonutChart';
import { BarChart } from '@/components/admin/ui/BarChart';
import { FilterBar } from '@/components/admin/ui/FilterBar';
import { ArrowDownRight, ArrowUpRight, Clock, Eye } from 'lucide-react';

const TRAFFIC_DATA = [
  { label: 'Jan', value: 2400 },
  { label: 'Feb', value: 3100 },
  { label: 'Mar', value: 2800 },
  { label: 'Apr', value: 3600 },
  { label: 'May', value: 3200 },
  { label: 'Jun', value: 4100 },
  { label: 'Jul', value: 3900 },
  { label: 'Aug', value: 4800 },
  { label: 'Sep', value: 4200 },
  { label: 'Oct', value: 5100 },
  { label: 'Nov', value: 4800 },
  { label: 'Dec', value: 5600 },
];

const DEVICE_DATA = [
  { label: 'Desktop', value: 58, color: '#2563eb' },
  { label: 'Mobile', value: 34, color: '#10b981' },
  { label: 'Tablet', value: 8, color: '#f59e0b' },
];

const COUNTRY_DATA = [
  { label: 'United States', value: 4200 },
  { label: 'United Kingdom', value: 1800 },
  { label: 'Germany', value: 1200 },
  { label: 'Canada', value: 980 },
  { label: 'India', value: 850 },
  { label: 'Australia', value: 620 },
  { label: 'France', value: 480 },
  { label: 'Japan', value: 350 },
];

const PAGE_DATA = [
  { label: 'Home', value: 8200 },
  { label: 'Projects', value: 4100 },
  { label: 'Blog', value: 3600 },
  { label: 'About', value: 2800 },
  { label: 'Contact', value: 1400 },
];

const FILTERS = [
  {
    key: 'date',
    label: 'Date Range',
    options: [
      { label: 'Last 7 days', value: '7d' },
      { label: 'Last 30 days', value: '30d' },
      { label: 'Last 90 days', value: '90d' },
      { label: 'This year', value: 'year' },
    ],
  },
  {
    key: 'channel',
    label: 'Channel',
    options: [
      { label: 'Direct', value: 'direct' },
      { label: 'Organic Search', value: 'organic' },
      { label: 'Social', value: 'social' },
      { label: 'Referral', value: 'referral' },
    ],
  },
  {
    key: 'device',
    label: 'Device',
    options: [
      { label: 'Desktop', value: 'desktop' },
      { label: 'Mobile', value: 'mobile' },
      { label: 'Tablet', value: 'tablet' },
    ],
  },
];

export default function AnalyticsPage() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [chartMode, setChartMode] = useState<'visitors' | 'pageviews'>('visitors');

  return (
    <AdminPageWrapper
      title="Analytics"
      breadcrumbs={[{ label: 'Insights' }, { label: 'Analytics' }]}
      dateRange
    >
      {/* Filters */}
      <div className="mb-6">
        <FilterBar
          filters={FILTERS}
          activeFilters={activeFilters}
          onFilterChange={(key, value) =>
            setActiveFilters((prev) => ({ ...prev, [key]: value }))
          }
          onReset={() => setActiveFilters({})}
        />
      </div>

      {/* Traffic Chart + KPI Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 space-y-4">
          <ChartCard
            title="Traffic Overview"
            controls={
              <div className="flex gap-1 bg-slate-100 rounded-lg p-0.5">
                <button
                  onClick={() => setChartMode('visitors')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    chartMode === 'visitors' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Visitors
                </button>
                <button
                  onClick={() => setChartMode('pageviews')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    chartMode === 'pageviews' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Page Views
                </button>
              </div>
            }
            footer={
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <input type="checkbox" id="compare" className="rounded border-slate-300" />
                <label htmlFor="compare">Compare to previous period</label>
              </div>
            }
          >
            <AreaChart
              data={chartMode === 'visitors' ? TRAFFIC_DATA : TRAFFIC_DATA.map((d) => ({ ...d, value: d.value * 2.8 }))}
              height={280}
            />
          </ChartCard>

          {/* KPI strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KpiCard label="Bounce Rate" value="42.3%" delta={{ value: '-2.1%', positive: true }} icon={ArrowDownRight} />
            <KpiCard label="Avg. Read Time" value="3m 48s" delta={{ value: '+0.5m', positive: true }} icon={Clock} />
            <KpiCard label="Unique Visitors" value="8,421" delta={{ value: '+15%', positive: true }} icon={Eye} />
            <KpiCard label="Return Rate" value="28.6%" delta={{ value: '+3.2%', positive: true }} icon={ArrowUpRight} />
          </div>
        </div>

        {/* Right column: Device + Country */}
        <div className="space-y-6">
          <ChartCard title="Device Split">
            <DonutChart data={DEVICE_DATA} />
          </ChartCard>

          <ChartCard title="Top Countries">
            <BarChart data={COUNTRY_DATA.slice(0, 6)} horizontal />
          </ChartCard>
        </div>
      </div>

      {/* Heatmap placeholder + Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Page Heatmap">
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 28 }).map((_, i) => {
              const intensity = Math.random();
              return (
                <div
                  key={i}
                  className="aspect-square rounded-sm"
                  style={{
                    backgroundColor: `rgba(37, 99, 235, ${0.1 + intensity * 0.7})`,
                  }}
                  title={`Day ${i + 1}: ${Math.round(intensity * 500)} views`}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
            <span>Less</span>
            <div className="flex gap-1">
              {[0.1, 0.3, 0.5, 0.7, 0.9].map((v) => (
                <div
                  key={v}
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: `rgba(37, 99, 235, ${v})` }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </ChartCard>

        <ChartCard title="Top Pages">
          <BarChart data={PAGE_DATA} horizontal />
        </ChartCard>
      </div>
    </AdminPageWrapper>
  );
}
