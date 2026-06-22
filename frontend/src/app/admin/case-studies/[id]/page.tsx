'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/components/admin/layout/AdminContext';
import { ContextPanel } from '@/components/admin/layout/ContextPanel';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { ArrowLeft, Menu, Settings, Save, Eye, Image, Plus, X } from 'lucide-react';

const SECTIONS = ['Overview', 'Challenge', 'Approach', 'Solution', 'Results', 'Testimonial', 'Assets'];

export default function CaseStudyDetailPage() {
  const router = useRouter();
  const { openMobileSidebar } = useAdmin();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Overview');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
        <div className="flex items-center h-14 px-4 gap-3">
          <button onClick={() => router.push('/admin/case-studies')} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100" aria-label="Back">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button onClick={openMobileSidebar} className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100" aria-label="Open menu">
            <Menu className="w-5 h-5" />
          </button>
          <StatusBadge status="published" />
          <div className="flex-1" />
          <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"><Eye className="w-5 h-5" /></button>
          <button onClick={() => setSettingsOpen(!settingsOpen)} className={`p-2 rounded-lg ${settingsOpen ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-100'}`}>
            <Settings className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700">
            <Save className="w-4 h-4" /><span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        <nav className="hidden lg:block w-48 shrink-0 border-r border-slate-200 bg-white">
          <div className="sticky top-14 p-4">
            <ul className="space-y-1">
              {SECTIONS.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => setActiveSection(s)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg ${activeSection === s ? 'bg-primary/10 text-primary font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="flex-1 p-4 lg:p-8 max-w-4xl">
          <div className="lg:hidden flex overflow-x-auto gap-1 border-b border-slate-200 mb-6 -mx-4 px-4">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`px-3 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 ${activeSection === s ? 'border-primary text-primary' : 'border-transparent text-slate-500'}`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {activeSection === 'Overview' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Case Study Title</label>
                  <input type="text" defaultValue="E-Commerce Platform Redesign" className="w-full px-4 py-3 text-lg font-semibold border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Client</label>
                  <input type="text" defaultValue="TechCorp" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Summary</label>
                  <textarea rows={4} defaultValue="A complete redesign of TechCorp's e-commerce platform resulting in 40% faster load times and 25% increase in conversions." className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
                </div>
              </>
            )}

            {activeSection === 'Challenge' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">The Challenge</label>
                <textarea rows={8} defaultValue="TechCorp's existing platform was built on legacy technology, resulting in slow page loads and poor mobile experience." className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
              </div>
            )}

            {activeSection === 'Approach' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Our Approach</label>
                <textarea rows={8} defaultValue="We conducted user research, created a design system, and implemented an incremental migration strategy." className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
              </div>
            )}

            {activeSection === 'Solution' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">The Solution</label>
                <textarea rows={8} defaultValue="Built on Next.js with a headless CMS, optimized for Core Web Vitals." className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
              </div>
            )}

            {activeSection === 'Results' && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700">Key Outcomes</label>
                {['40% faster page loads', '25% increase in conversions', '60% reduction in bounce rate'].map((r, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input type="text" defaultValue={r} className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    <button className="p-2 text-slate-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                  </div>
                ))}
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg"><Plus className="w-4 h-4" /> Add outcome</button>
              </div>
            )}

            {activeSection === 'Testimonial' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Quote</label>
                  <textarea rows={4} defaultValue="Working with this team transformed our online presence." className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Attribution</label>
                  <input type="text" defaultValue="Sarah Johnson, CTO at TechCorp" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>
            )}

            {activeSection === 'Assets' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Media Assets</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                      <Image className="w-8 h-8" />
                    </div>
                  ))}
                  <button className="aspect-video rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-primary/30 gap-1">
                    <Plus className="w-6 h-6" />
                    <span className="text-xs">From library</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <ContextPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} title="Case Study Settings">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
              <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg"><option>Published</option><option>Draft</option></select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Industry</label>
              <input type="text" defaultValue="E-Commerce" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Duration</label>
              <input type="text" defaultValue="3 months" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
        </ContextPanel>
      </div>
    </div>
  );
}
