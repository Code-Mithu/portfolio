'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminPageWrapper } from '@/components/admin/layout/AdminPageWrapper';
import { DataTable, type Column } from '@/components/admin/ui/DataTable';
import { FilterBar } from '@/components/admin/ui/FilterBar';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { EmptyState } from '@/components/admin/ui/EmptyState';
import { FileText, MoreHorizontal } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  status: 'published' | 'draft' | 'scheduled';
  tags: string[];
  seoScore: number;
  updatedAt: string;
}

const MOCK_POSTS: BlogPost[] = [
  { id: '1', title: 'Building Scalable APIs with Node.js', status: 'published', tags: ['Node.js', 'API'], seoScore: 92, updatedAt: '2 hours ago' },
  { id: '2', title: 'React Performance Optimization Tips', status: 'draft', tags: ['React', 'Performance'], seoScore: 78, updatedAt: '5 hours ago' },
  { id: '3', title: 'Introduction to TypeScript Generics', status: 'published', tags: ['TypeScript'], seoScore: 85, updatedAt: '1 day ago' },
  { id: '4', title: 'CSS Grid vs Flexbox: When to Use What', status: 'scheduled', tags: ['CSS', 'Layout'], seoScore: 90, updatedAt: '2 days ago' },
  { id: '5', title: 'Setting Up CI/CD with GitHub Actions', status: 'published', tags: ['DevOps', 'CI/CD'], seoScore: 88, updatedAt: '3 days ago' },
  { id: '6', title: 'Microservices Architecture Patterns', status: 'draft', tags: ['Architecture'], seoScore: 65, updatedAt: '5 days ago' },
  { id: '7', title: 'Understanding React Server Components', status: 'published', tags: ['React', 'Next.js'], seoScore: 94, updatedAt: '1 week ago' },
  { id: '8', title: 'Database Indexing Strategies', status: 'draft', tags: ['Database', 'Performance'], seoScore: 72, updatedAt: '1 week ago' },
];

const FILTERS = [
  {
    key: 'status',
    label: 'Status',
    options: [
      { label: 'Published', value: 'published' },
      { label: 'Draft', value: 'draft' },
      { label: 'Scheduled', value: 'scheduled' },
    ],
  },
  {
    key: 'tag',
    label: 'Tag',
    options: [
      { label: 'React', value: 'react' },
      { label: 'Node.js', value: 'nodejs' },
      { label: 'TypeScript', value: 'typescript' },
      { label: 'CSS', value: 'css' },
    ],
  },
];

function SeoIndicator({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-xs text-slate-500">{score}</span>
    </div>
  );
}

export default function BlogListPage() {
  const router = useRouter();
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const columns: Column<BlogPost>[] = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (post) => (
        <span className="font-medium text-slate-900">{post.title}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (post) => <StatusBadge status={post.status} />,
    },
    {
      key: 'tags',
      label: 'Tags',
      render: (post) => (
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              {tag}
            </span>
          ))}
        </div>
      ),
      className: 'hidden lg:table-cell',
    },
    {
      key: 'seoScore',
      label: 'SEO',
      render: (post) => <SeoIndicator score={post.seoScore} />,
      className: 'hidden md:table-cell',
    },
    {
      key: 'updatedAt',
      label: 'Updated',
      sortable: true,
      render: (post) => (
        <span className="text-slate-500 text-xs">{post.updatedAt}</span>
      ),
    },
  ];

  const filteredPosts = MOCK_POSTS.filter((post) => {
    if (activeFilters.status && post.status !== activeFilters.status) return false;
    if (activeFilters.tag && !post.tags.some((t) => t.toLowerCase().includes(activeFilters.tag))) return false;
    return true;
  });

  return (
    <AdminPageWrapper
      title="Blog"
      breadcrumbs={[{ label: 'Content' }, { label: 'Blog' }]}
      primaryAction={{ label: 'New Post', onClick: () => router.push('/admin/blog/new') }}
    >
      <div className="mb-4">
        <FilterBar
          filters={FILTERS}
          activeFilters={activeFilters}
          onFilterChange={(key, value) =>
            setActiveFilters((prev) => ({ ...prev, [key]: value }))
          }
          onReset={() => setActiveFilters({})}
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        {filteredPosts.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No posts found"
            description="Start writing your first blog post to share your knowledge."
            primaryAction={{ label: 'Create Post', onClick: () => router.push('/admin/blog/new') }}
          />
        ) : (
          <DataTable
            columns={columns}
            data={filteredPosts}
            keyExtractor={(post) => post.id}
            onRowClick={(post) => router.push(`/admin/blog/${post.id}`)}
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
