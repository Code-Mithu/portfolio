'use client';

import React from 'react';
import { AdminPageWrapper } from '@/components/admin/layout/AdminPageWrapper';
import { Image } from 'lucide-react';

export default function NewCaseStudyPage() {
  return (
    <AdminPageWrapper
      title="New Case Study"
      breadcrumbs={[{ label: 'Content' }, { label: 'Case Studies', href: '/admin/case-studies' }, { label: 'New' }]}
    >
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
          <input
            type="text"
            placeholder="Case study title..."
            className="w-full px-4 py-3 text-lg font-semibold border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Client Name</label>
          <input
            type="text"
            placeholder="Client or company name..."
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Cover Image</label>
          <button className="w-full h-48 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-primary/30">
            <Image className="w-8 h-8" />
            <span className="text-sm">Upload cover image</span>
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Overview</label>
          <textarea
            rows={4}
            placeholder="Brief overview of the case study..."
            className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
          />
        </div>
        <div className="flex gap-3 pt-4">
          <button className="px-6 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700">
            Create Case Study
          </button>
          <button className="px-6 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">
            Save as Draft
          </button>
        </div>
      </div>
    </AdminPageWrapper>
  );
}
