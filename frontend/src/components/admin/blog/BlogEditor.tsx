'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/components/admin/layout/AdminContext';
import { ContextPanel } from '@/components/admin/layout/ContextPanel';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import {
  ArrowLeft,
  Eye,
  Save,
  Send,
  Settings,
  Sparkles,
  Image,
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Link,
  Code,
  Quote,
  Menu,
} from 'lucide-react';

interface BlogEditorProps {
  isEditing?: boolean;
}

export function BlogEditor({ isEditing = false }: BlogEditorProps) {
  const router = useRouter();
  const { openMobileSidebar } = useAdmin();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [title, setTitle] = useState(isEditing ? 'Building Scalable APIs with Node.js' : '');
  const [content, setContent] = useState(
    isEditing
      ? 'In this comprehensive guide, we will explore the best practices for building scalable APIs...\n\nWe will cover topics like:\n- RESTful design principles\n- Database optimization\n- Caching strategies\n- Load balancing'
      : '',
  );
  const [status] = useState<'draft' | 'published'>(isEditing ? 'published' : 'draft');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky top bar */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
        <div className="flex items-center h-14 px-4 gap-3">
          <button
            onClick={() => router.push('/admin/blog')}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="Back to blog list"
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

          <StatusBadge status={status} />

          <div className="flex-1" />

          {/* Autosave indicator */}
          <span className="hidden sm:inline text-xs text-slate-400">
            {isEditing ? 'Saved 2 min ago' : 'Draft'}
          </span>

          <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100" aria-label="Preview">
            <Eye className="w-5 h-5" />
          </button>

          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={`p-2 rounded-lg transition-colors ${
              settingsOpen ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-100'
            }`}
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors">
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{isEditing ? 'Update' : 'Publish'}</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Main editor */}
        <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 lg:px-8">
          {/* Cover image area */}
          <button className="w-full h-48 md:h-56 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-primary/30 hover:text-primary/60 transition-colors mb-8">
            <Image className="w-8 h-8" />
            <span className="text-sm">Add cover image</span>
          </button>

          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title..."
            className="w-full text-3xl md:text-4xl font-bold text-slate-900 placeholder-slate-300 border-none outline-none bg-transparent mb-6"
          />

          {/* Minimal toolbar */}
          <div className="flex items-center gap-1 border-b border-slate-200 pb-3 mb-6 overflow-x-auto">
            {[
              { icon: Bold, label: 'Bold' },
              { icon: Italic, label: 'Italic' },
              { icon: Heading1, label: 'Heading 1' },
              { icon: Heading2, label: 'Heading 2' },
              { icon: List, label: 'Bullet List' },
              { icon: ListOrdered, label: 'Numbered List' },
              { icon: Link, label: 'Link' },
              { icon: Code, label: 'Code' },
              { icon: Quote, label: 'Quote' },
              { icon: Image, label: 'Image' },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="p-2 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 shrink-0"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}

            <div className="flex-1" />

            {/* AI assist */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
              AI Assist
            </button>
          </div>

          {/* Content textarea */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your story..."
            className="w-full min-h-[400px] text-base text-slate-700 leading-relaxed placeholder-slate-300 border-none outline-none bg-transparent resize-none"
          />
        </div>

        {/* Settings panel */}
        <ContextPanel
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          title="Post Settings"
        >
          <div className="space-y-6">
            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Tags</label>
              <input
                type="text"
                placeholder="Add tags separated by commas..."
                defaultValue={isEditing ? 'Node.js, API, Backend' : ''}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* SEO */}
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-3">SEO</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Meta Title</label>
                  <input
                    type="text"
                    placeholder="SEO title..."
                    defaultValue={isEditing ? 'Building Scalable APIs with Node.js | Portfolio Blog' : ''}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Meta Description</label>
                  <textarea
                    placeholder="SEO description..."
                    rows={3}
                    defaultValue={isEditing ? 'Learn best practices for building scalable REST APIs using Node.js, Express, and modern backend architecture patterns.' : ''}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Canonical URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* OG Image */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">OG Image</label>
              <button className="w-full h-32 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center text-sm text-slate-400 hover:border-primary/30 hover:text-primary/60 transition-colors">
                Upload OG image
              </button>
            </div>

            {/* Recommendations */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Recommended Posts</label>
              <p className="text-xs text-slate-400 mb-2">Display at the end of this post</p>
              <button className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 text-left">
                + Select posts...
              </button>
            </div>
          </div>
        </ContextPanel>
      </div>
    </div>
  );
}
