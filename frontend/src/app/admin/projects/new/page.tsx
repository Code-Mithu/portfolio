'use client';

import React from 'react';
import { AdminPageWrapper } from '@/components/admin/layout/AdminPageWrapper';
import { Image, Plus, X } from 'lucide-react';

export default function NewProjectPage() {
  return (
    <AdminPageWrapper
      title="New Project"
      breadcrumbs={[{ label: 'Content' }, { label: 'Projects', href: '/admin/projects' }, { label: 'New' }]}
    >
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Project Title</label>
          <input
            type="text"
            placeholder="Enter project title..."
            className="w-full px-4 py-3 text-lg font-semibold border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Short Description</label>
          <textarea
            rows={3}
            placeholder="Briefly describe this project..."
            className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Cover Image</label>
          <button className="w-full h-48 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-primary/30 transition-colors">
            <Image className="w-8 h-8" />
            <span className="text-sm">Upload cover image</span>
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Technology Stack</label>
          <input
            type="text"
            placeholder="Add technologies separated by commas..."
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button className="px-6 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700">
            Create Project
          </button>
          <button className="px-6 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">
            Save as Draft
          </button>
        </div>
      </div>
    </AdminPageWrapper>
  );
}
