'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminPageWrapper } from '@/components/admin/layout/AdminPageWrapper';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { FilterBar } from '@/components/admin/ui/FilterBar';
import { EmptyState } from '@/components/admin/ui/EmptyState';
import { FolderKanban, Star, GripVertical, MoreHorizontal, ArrowUpDown } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  order: number;
  updatedAt: string;
}

const MOCK_PROJECTS: Project[] = [
  { id: '1', title: 'E-Commerce Platform', status: 'published', featured: true, order: 1, updatedAt: '1 day ago' },
  { id: '2', title: 'Task Management App', status: 'published', featured: true, order: 2, updatedAt: '3 days ago' },
  { id: '3', title: 'AI Chat Interface', status: 'draft', featured: false, order: 3, updatedAt: '5 days ago' },
  { id: '4', title: 'Real-time Dashboard', status: 'published', featured: false, order: 4, updatedAt: '1 week ago' },
  { id: '5', title: 'Social Media Analytics', status: 'archived', featured: false, order: 5, updatedAt: '2 weeks ago' },
  { id: '6', title: 'Portfolio CMS', status: 'draft', featured: false, order: 6, updatedAt: '3 weeks ago' },
];

const FILTERS = [
  {
    key: 'status',
    label: 'Status',
    options: [
      { label: 'Published', value: 'published' },
      { label: 'Draft', value: 'draft' },
      { label: 'Archived', value: 'archived' },
    ],
  },
  {
    key: 'featured',
    label: 'Featured',
    options: [
      { label: 'Featured', value: 'true' },
      { label: 'Not Featured', value: 'false' },
    ],
  },
];

export default function ProjectsListPage() {
  const router = useRouter();
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [sortMode, setSortMode] = useState(false);

  const filteredProjects = MOCK_PROJECTS.filter((p) => {
    if (activeFilters.status && p.status !== activeFilters.status) return false;
    if (activeFilters.featured && String(p.featured) !== activeFilters.featured) return false;
    return true;
  });

  return (
    <AdminPageWrapper
      title="Projects"
      breadcrumbs={[{ label: 'Content' }, { label: 'Projects' }]}
      primaryAction={{ label: 'New Project', onClick: () => router.push('/admin/projects/new') }}
    >
      <div className="flex items-center justify-between mb-4">
        <FilterBar
          filters={FILTERS}
          activeFilters={activeFilters}
          onFilterChange={(key, value) =>
            setActiveFilters((prev) => ({ ...prev, [key]: value }))
          }
          onReset={() => setActiveFilters({})}
        />
        <button
          onClick={() => setSortMode(!sortMode)}
          className={`hidden md:flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors ${
            sortMode ? 'border-primary text-primary bg-primary/5' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <ArrowUpDown className="w-4 h-4" />
          Reorder
        </button>
      </div>

      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects yet"
          description="Showcase your best work by adding your first project."
          primaryAction={{ label: 'Add Project', onClick: () => router.push('/admin/projects/new') }}
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => router.push(`/admin/projects/${project.id}`)}
              className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors"
            >
              {sortMode && (
                <GripVertical className="w-5 h-5 text-slate-300 cursor-grab shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-slate-900 truncate">{project.title}</p>
                  {project.featured && <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Updated {project.updatedAt}</p>
              </div>
              <StatusBadge status={project.status} />
              <button
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 shrink-0"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Mobile sort mode button */}
      <div className="md:hidden mt-4">
        <button
          onClick={() => setSortMode(!sortMode)}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl border transition-colors ${
            sortMode ? 'border-primary text-primary bg-primary/5' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50'
          }`}
        >
          <ArrowUpDown className="w-4 h-4" />
          {sortMode ? 'Done Reordering' : 'Reorder Projects'}
        </button>
      </div>
    </AdminPageWrapper>
  );
}
