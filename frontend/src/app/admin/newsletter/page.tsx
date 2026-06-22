'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdminPageWrapper } from '@/components/admin/layout/AdminPageWrapper';
import { DataTable, type Column } from '@/components/admin/ui/DataTable';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { KpiCard } from '@/components/admin/ui/KpiCard';
import { Mail, Users, Eye, MousePointerClick, MoreHorizontal } from 'lucide-react';

interface Campaign {
  id: string;
  subject: string;
  status: 'published' | 'draft' | 'scheduled';
  recipients: number;
  openRate: string;
  clickRate: string;
  sentAt: string;
}

const MOCK_CAMPAIGNS: Campaign[] = [
  { id: '1', subject: 'Monthly Update: New Projects & Blog Posts', status: 'published', recipients: 342, openRate: '48.2%', clickRate: '12.5%', sentAt: '3 days ago' },
  { id: '2', subject: 'Building Better APIs - Newsletter #12', status: 'published', recipients: 328, openRate: '52.1%', clickRate: '15.3%', sentAt: '2 weeks ago' },
  { id: '3', subject: 'Q1 Roundup: Case Studies & Insights', status: 'published', recipients: 310, openRate: '45.8%', clickRate: '11.2%', sentAt: '1 month ago' },
  { id: '4', subject: 'React Server Components Deep Dive', status: 'draft', recipients: 0, openRate: '-', clickRate: '-', sentAt: '-' },
  { id: '5', subject: 'Summer Tech Updates', status: 'scheduled', recipients: 0, openRate: '-', clickRate: '-', sentAt: 'Scheduled Jul 1' },
];

export default function NewsletterPage() {
  const router = useRouter();

  const columns: Column<Campaign>[] = [
    {
      key: 'subject',
      label: 'Subject',
      sortable: true,
      render: (c) => <span className="font-medium text-slate-900">{c.subject}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (c) => <StatusBadge status={c.status} />,
    },
    {
      key: 'recipients',
      label: 'Recipients',
      render: (c) => <span className="text-slate-600">{c.recipients > 0 ? c.recipients.toLocaleString() : '-'}</span>,
      className: 'hidden md:table-cell',
    },
    {
      key: 'openRate',
      label: 'Open Rate',
      render: (c) => <span className="text-slate-600">{c.openRate}</span>,
      className: 'hidden lg:table-cell',
    },
    {
      key: 'clickRate',
      label: 'Click Rate',
      render: (c) => <span className="text-slate-600">{c.clickRate}</span>,
      className: 'hidden lg:table-cell',
    },
    {
      key: 'sentAt',
      label: 'Sent',
      render: (c) => <span className="text-xs text-slate-500">{c.sentAt}</span>,
    },
  ];

  return (
    <AdminPageWrapper
      title="Newsletter"
      breadcrumbs={[{ label: 'Growth' }, { label: 'Newsletter' }]}
      primaryAction={{ label: 'Compose', onClick: () => router.push('/admin/newsletter/new') }}
    >
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Subscribers" value="456" delta={{ value: '+12 this week', positive: true }} icon={Users} />
        <KpiCard label="Avg. Open Rate" value="48.7%" delta={{ value: '+2.3%', positive: true }} icon={Eye} />
        <KpiCard label="Avg. Click Rate" value="13.0%" delta={{ value: '+1.1%', positive: true }} icon={MousePointerClick} />
        <KpiCard label="Campaigns Sent" value="18" icon={Mail} />
      </div>

      {/* Campaigns table */}
      <div className="bg-white rounded-xl border border-slate-200">
        <DataTable
          columns={columns}
          data={MOCK_CAMPAIGNS}
          keyExtractor={(c) => c.id}
          onRowClick={(c) => router.push(`/admin/newsletter/${c.id}`)}
          rowActions={() => (
            <button className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          )}
        />
      </div>
    </AdminPageWrapper>
  );
}
