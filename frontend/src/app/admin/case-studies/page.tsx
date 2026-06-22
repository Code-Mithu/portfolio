'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminPageWrapper } from '@/components/admin/layout/AdminPageWrapper';
import { DataTable, type Column } from '@/components/admin/ui/DataTable';
import { FilterBar } from '@/components/admin/ui/FilterBar';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { EmptyState } from '@/components/admin/ui/EmptyState';
import { BookOpen, MoreHorizontal } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  status: 'published' | 'draft';
  sections: number;
  updatedAt: string;
}

const MOCK_STUDIES: CaseStudy[] = [
  { id: '1', title: 'E-Commerce Platform Redesign', client: 'TechCorp', status: 'published', sections: 7, updatedAt: '3 days ago' },
  { id: '2', title: 'Healthcare Dashboard MVP', client: 'MedStart', status: 'published', sections: 6, updatedAt: '1 week ago' },
  { id: '3', title: 'FinTech Mobile App Launch', client: 'PayFlow', status: 'draft', sections: 4, updatedAt: '2 weeks ago' },
  { id: '4', title: 'SaaS Analytics Platform', client: 'DataViz', status: 'draft', sections: 3, updatedAt: '3 weeks ago' },
];

const FILTERS = [
  {
    key: 'status',
    label: 'Status',
    options: [
      { label: 'Published', value: 'published' },
      { label: 'Draft', value: 'draft' },
    ],
  },
];

export default function CaseStudiesPage() {
  const router = useRouter();
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const columns: Column<CaseStudy>[] = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (item) => <span className="font-medium text-slate-900">{item.title}</span>,
    },
    {
      key: 'client',
      label: 'Client',
      render: (item) => <span className="text-slate-600">{item.client}</span>,
      className: 'hidden md:table-cell',
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      key: 'sections',
      label: 'Sections',
      render: (item) => <span className="text-xs text-slate-500">{item.sections} sections</span>,
      className: 'hidden lg:table-cell',
    },
    {
      key: 'updatedAt',
      label: 'Updated',
      sortable: true,
      render: (item) => <span className="text-xs text-slate-500">{item.updatedAt}</span>,
    },
  ];

  const filtered = MOCK_STUDIES.filter((s) => {
    if (activeFilters.status && s.status !== activeFilters.status) return false;
    return true;
  });

  return (
    <AdminPageWrapper
      title="Case Studies"
      breadcrumbs={[{ label: 'Content' }, { label: 'Case Studies' }]}
      primaryAction={{ label: 'New Case Study', onClick: () => router.push('/admin/case-studies/new') }}
    >
      <div className="mb-4">
        <FilterBar
          filters={FILTERS}
          activeFilters={activeFilters}
          onFilterChange={(key, value) => setActiveFilters((prev) => ({ ...prev, [key]: value }))}
          onReset={() => setActiveFilters({})}
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        {filtered.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No case studies"
            description="Document your project processes and outcomes."
            primaryAction={{ label: 'Create Case Study', onClick: () => router.push('/admin/case-studies/new') }}
          />
        ) : (
          <DataTable
            columns={columns}
            data={filtered}
            keyExtractor={(item) => item.id}
            onRowClick={(item) => router.push(`/admin/case-studies/${item.id}`)}
            rowActions={() => (
              <button className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            )}
          />
        )}
      </div>
    </AdminPageWrapper>
  );
}
