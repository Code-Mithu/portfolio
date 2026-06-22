'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdminPageWrapper } from '@/components/admin/layout/AdminPageWrapper';
import { Send, Save, Eye } from 'lucide-react';

export default function ComposeNewsletterPage() {
  const router = useRouter();

  return (
    <AdminPageWrapper
      title="Compose Newsletter"
      breadcrumbs={[{ label: 'Growth' }, { label: 'Newsletter', href: '/admin/newsletter' }, { label: 'Compose' }]}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject Line</label>
          <input
            type="text"
            placeholder="Enter subject line..."
            className="w-full px-4 py-3 text-base border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Preview Text</label>
          <input
            type="text"
            placeholder="Short preview shown in inbox..."
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Recipients</label>
          <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option>All subscribers (456)</option>
            <option>Active subscribers (412)</option>
            <option>New subscribers (44)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Content</label>
          <textarea
            rows={12}
            placeholder="Write your newsletter content..."
            className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700">
            <Send className="w-4 h-4" /> Send Now
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">
            <Eye className="w-4 h-4" /> Preview
          </button>
        </div>
      </div>
    </AdminPageWrapper>
  );
}
