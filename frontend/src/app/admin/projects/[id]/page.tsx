'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/components/admin/layout/AdminContext';
import { ContextPanel } from '@/components/admin/layout/ContextPanel';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import {
  ArrowLeft,
  Menu,
  Settings,
  Save,
  Eye,
  Star,
  Image,
  Plus,
  X,
} from 'lucide-react';

const SECTIONS = [
  'Overview',
  'Challenge',
  'Solution',
  'Results',
  'Gallery',
  'Stack',
  'Metrics',
];

const MOCK_TECH = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma'];

export default function ProjectDetailPage() {
  const router = useRouter();
  const { openMobileSidebar } = useAdmin();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Overview');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
        <div className="flex items-center h-14 px-4 gap-3">
          <button
            onClick={() => router.push('/admin/projects')}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={openMobileSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <StatusBadge status="published" />
          <div className="flex-1" />
          <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100" aria-label="Preview">
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={`p-2 rounded-lg transition-colors ${settingsOpen ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-100'}`}
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700">
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop: sections nav (sticky left) */}
        <nav className="hidden lg:block w-48 shrink-0 border-r border-slate-200 bg-white">
          <div className="sticky top-14 p-4">
            <ul className="space-y-1">
              {SECTIONS.map((section) => (
                <li key={section}>
                  <button
                    onClick={() => setActiveSection(section)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                      activeSection === section
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <div className="flex-1 p-4 lg:p-8 max-w-4xl">
          {/* Mobile sections */}
          <div className="lg:hidden flex overflow-x-auto gap-1 border-b border-slate-200 mb-6 -mx-4 px-4">
            {SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-3 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeSection === section
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-500'
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Section content */}
          <div className="space-y-8">
            {activeSection === 'Overview' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Project Title</label>
                  <input
                    type="text"
                    defaultValue="E-Commerce Platform"
                    className="w-full px-4 py-3 text-lg font-semibold border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Short Description</label>
                  <textarea
                    rows={3}
                    defaultValue="A full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard."
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
              </div>
            )}

            {activeSection === 'Challenge' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Challenge Description</label>
                <textarea
                  rows={8}
                  defaultValue="The client needed a scalable e-commerce solution that could handle high traffic during sale events while maintaining fast page load times and a seamless checkout experience."
                  className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>
            )}

            {activeSection === 'Solution' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Solution Description</label>
                <textarea
                  rows={8}
                  defaultValue="Built using Next.js with ISR for optimal performance, integrated Stripe for payments, and implemented Redis-based caching for inventory management."
                  className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>
            )}

            {activeSection === 'Results' && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700">Key Results</label>
                {['40% faster page loads', '99.9% uptime during Black Friday', '25% increase in conversion rate'].map((result, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input
                      type="text"
                      defaultValue={result}
                      className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <button className="p-2 text-slate-400 hover:text-red-500">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg">
                  <Plus className="w-4 h-4" /> Add result
                </button>
              </div>
            )}

            {activeSection === 'Gallery' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Project Gallery</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                      <Image className="w-8 h-8" />
                    </div>
                  ))}
                  <button className="aspect-video rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary/30 hover:text-primary/60 transition-colors">
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'Stack' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Technology Stack</label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {MOCK_TECH.map((tech) => (
                    <span key={tech} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded-lg">
                      {tech}
                      <button className="text-slate-400 hover:text-red-500">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add technology..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            )}

            {activeSection === 'Metrics' && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700">Project Metrics</label>
                {[
                  { label: 'Performance Score', value: '95' },
                  { label: 'Lines of Code', value: '45,000' },
                  { label: 'Test Coverage', value: '87%' },
                ].map((metric, i) => (
                  <div key={i} className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      defaultValue={metric.label}
                      placeholder="Metric name"
                      className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        defaultValue={metric.value}
                        placeholder="Value"
                        className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                      <button className="p-2 text-slate-400 hover:text-red-500">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg">
                  <Plus className="w-4 h-4" /> Add metric
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick settings panel */}
        <ContextPanel
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          title="Project Settings"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
              <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">Featured</label>
              <button className="relative w-10 h-6 bg-primary rounded-full transition-colors">
                <span className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Display Order</label>
              <input
                type="number"
                defaultValue={1}
                min={1}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Live URL</label>
              <input
                type="url"
                placeholder="https://..."
                defaultValue="https://example-ecommerce.com"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">GitHub URL</label>
              <input
                type="url"
                placeholder="https://github.com/..."
                defaultValue="https://github.com/username/ecommerce"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </ContextPanel>
      </div>
    </div>
  );
}
