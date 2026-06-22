'use client';

import React from 'react';
import { AdminPageWrapper } from '@/components/admin/layout/AdminPageWrapper';
import { KpiCard } from '@/components/admin/ui/KpiCard';
import { ChartCard } from '@/components/admin/ui/ChartCard';
import { AreaChart } from '@/components/admin/ui/AreaChart';
import { BarChart } from '@/components/admin/ui/BarChart';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import {
  Eye,
  Users,
  FileText,
  FolderKanban,
  MessageSquare,
  TrendingUp,
  Clock,
  AlertTriangle,
  Plus,
  ArrowRight,
} from 'lucide-react';

const TRAFFIC_DATA = [
  { label: 'Jan', value: 1200 },
  { label: 'Feb', value: 1800 },
  { label: 'Mar', value: 1400 },
  { label: 'Apr', value: 2200 },
  { label: 'May', value: 1900 },
  { label: 'Jun', value: 2600 },
  { label: 'Jul', value: 2400 },
  { label: 'Aug', value: 3100 },
  { label: 'Sep', value: 2800 },
  { label: 'Oct', value: 3400 },
  { label: 'Nov', value: 3200 },
  { label: 'Dec', value: 3800 },
];

const HEALTH_DATA = [
  { label: 'SEO Score', value: 85, color: '#10b981' },
  { label: 'Performance', value: 92, color: '#2563eb' },
  { label: 'Accessibility', value: 78, color: '#f59e0b' },
  { label: 'Best Practices', value: 88, color: '#8b5cf6' },
];

const RECENT_ACTIVITY = [
  { id: '1', icon: FileText, title: 'Published "Building Scalable APIs"', time: '2 hours ago', status: 'published' as const },
  { id: '2', icon: FolderKanban, title: 'Updated Portfolio Project "E-commerce"', time: '5 hours ago', status: 'draft' as const },
  { id: '3', icon: MessageSquare, title: 'New lead from contact form', time: '1 day ago', status: 'new' as const },
  { id: '4', icon: Users, title: 'Newsletter subscriber +12 this week', time: '2 days ago', status: 'active' as const },
  { id: '5', icon: FileText, title: 'Draft saved "React Performance Tips"', time: '3 days ago', status: 'draft' as const },
];

const ALERTS = [
  { id: '1', message: '3 blog posts missing meta descriptions', type: 'warning' },
  { id: '2', message: 'SSL certificate renews in 14 days', type: 'info' },
];

export default function DashboardPage() {
  return (
    <AdminPageWrapper
      title="Dashboard"
      dateRange
      primaryAction={{ label: 'Create', onClick: () => {} }}
    >
      {/* Greeting */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Good morning, Admin</h2>
        <p className="text-sm text-slate-500 mt-1">Here&apos;s what&apos;s happening with your portfolio.</p>
      </div>

      {/* KPI Grid: carousel on mobile, grid on desktop */}
      <div className="flex gap-4 overflow-x-auto pb-2 mb-6 snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
        <div className="min-w-[240px] snap-start lg:min-w-0">
          <KpiCard
            label="Total Visitors"
            value="12,847"
            delta={{ value: '+12.5%', positive: true }}
            icon={Eye}
            sparkline={[120, 180, 140, 220, 190, 260]}
          />
        </div>
        <div className="min-w-[240px] snap-start lg:min-w-0">
          <KpiCard
            label="Page Views"
            value="38,291"
            delta={{ value: '+8.2%', positive: true }}
            icon={TrendingUp}
            sparkline={[380, 420, 390, 450, 410, 480]}
          />
        </div>
        <div className="min-w-[240px] snap-start lg:min-w-0">
          <KpiCard
            label="Blog Posts"
            value="24"
            delta={{ value: '+3', positive: true }}
            icon={FileText}
          />
        </div>
        <div className="min-w-[240px] snap-start lg:min-w-0">
          <KpiCard
            label="Active Leads"
            value="18"
            delta={{ value: '+5', positive: true }}
            icon={Users}
          />
        </div>
        <div className="min-w-[240px] snap-start lg:min-w-0">
          <KpiCard
            label="Avg. Read Time"
            value="4m 32s"
            delta={{ value: '-0.3%', positive: false }}
            icon={Clock}
          />
        </div>
      </div>

      {/* Row 3: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ChartCard
            title="Traffic Overview"
            controls={
              <div className="flex gap-1 bg-slate-100 rounded-lg p-0.5">
                <button className="px-3 py-1 text-xs font-medium rounded-md bg-white text-slate-900 shadow-sm">
                  Visitors
                </button>
                <button className="px-3 py-1 text-xs font-medium rounded-md text-slate-500 hover:text-slate-700">
                  Page Views
                </button>
              </div>
            }
          >
            <AreaChart data={TRAFFIC_DATA} height={240} />
          </ChartCard>
        </div>

        <div className="space-y-6">
          <ChartCard title="Portfolio Health">
            <BarChart data={HEALTH_DATA} horizontal />
          </ChartCard>

          {/* Alerts */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Alerts</h3>
            {ALERTS.length === 0 ? (
              <p className="text-sm text-slate-500">No alerts</p>
            ) : (
              <div className="space-y-2">
                {ALERTS.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 text-sm">
                    <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${alert.type === 'warning' ? 'text-amber-500' : 'text-blue-500'}`} />
                    <span className="text-slate-600">{alert.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>
          <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-blue-700 transition-colors">
            View all <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {RECENT_ACTIVITY.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{item.title}</p>
                  <p className="text-xs text-slate-400">{item.time}</p>
                </div>
                <StatusBadge status={item.status} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick actions (mobile only) */}
      <div className="mt-6 grid grid-cols-3 gap-3 lg:hidden">
        <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 text-sm text-slate-600 hover:border-primary/30">
          <Plus className="w-5 h-5 text-primary" />
          New Post
        </button>
        <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 text-sm text-slate-600 hover:border-primary/30">
          <FolderKanban className="w-5 h-5 text-primary" />
          Add Project
        </button>
        <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 text-sm text-slate-600 hover:border-primary/30">
          <Users className="w-5 h-5 text-primary" />
          View Leads
        </button>
      </div>
    </AdminPageWrapper>
  );
}
