'use client';

import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/layout/AdminPageWrapper';
import { ContextPanel } from '@/components/admin/layout/ContextPanel';
import { FilterBar } from '@/components/admin/ui/FilterBar';
import { EmptyState } from '@/components/admin/ui/EmptyState';
import {
  Image,
  FileText,
  Film,
  Grid3X3,
  List,
  Upload,
  Copy,
  Download,
  Trash2,
  ExternalLink,
} from 'lucide-react';

interface MediaAsset {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video';
  size: string;
  dimensions?: string;
  usedIn: string[];
  url: string;
  uploadedAt: string;
}

const MOCK_ASSETS: MediaAsset[] = [
  { id: '1', name: 'hero-banner.jpg', type: 'image', size: '2.4 MB', dimensions: '1920x1080', usedIn: ['Home Page'], url: '#', uploadedAt: '2 days ago' },
  { id: '2', name: 'project-ecommerce.png', type: 'image', size: '1.8 MB', dimensions: '1600x900', usedIn: ['E-Commerce Project'], url: '#', uploadedAt: '5 days ago' },
  { id: '3', name: 'profile-photo.jpg', type: 'image', size: '450 KB', dimensions: '800x800', usedIn: ['About Section'], url: '#', uploadedAt: '1 week ago' },
  { id: '4', name: 'resume-2024.pdf', type: 'document', size: '320 KB', usedIn: ['Resume Section'], url: '#', uploadedAt: '2 weeks ago' },
  { id: '5', name: 'demo-video.mp4', type: 'video', size: '45 MB', usedIn: [], url: '#', uploadedAt: '3 weeks ago' },
  { id: '6', name: 'og-image.png', type: 'image', size: '890 KB', dimensions: '1200x630', usedIn: ['SEO'], url: '#', uploadedAt: '1 month ago' },
  { id: '7', name: 'blog-cover-apis.jpg', type: 'image', size: '1.2 MB', dimensions: '1400x800', usedIn: ['Building Scalable APIs'], url: '#', uploadedAt: '1 month ago' },
  { id: '8', name: 'case-study-techcorp.png', type: 'image', size: '2.1 MB', dimensions: '1600x900', usedIn: ['TechCorp Case Study'], url: '#', uploadedAt: '1 month ago' },
];

const TYPE_ICONS = { image: Image, document: FileText, video: Film };

const FILTERS = [
  {
    key: 'type',
    label: 'Type',
    options: [
      { label: 'Images', value: 'image' },
      { label: 'Documents', value: 'document' },
      { label: 'Videos', value: 'video' },
    ],
  },
  {
    key: 'usedIn',
    label: 'Used in',
    options: [
      { label: 'Used', value: 'used' },
      { label: 'Unused', value: 'unused' },
    ],
  },
];

export default function MediaLibraryPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [search, setSearch] = useState('');

  const filtered = MOCK_ASSETS.filter((a) => {
    if (activeFilters.type && a.type !== activeFilters.type) return false;
    if (activeFilters.usedIn === 'used' && a.usedIn.length === 0) return false;
    if (activeFilters.usedIn === 'unused' && a.usedIn.length > 0) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <AdminPageWrapper
      title="Media Library"
      breadcrumbs={[{ label: 'Content' }, { label: 'Media Library' }]}
      primaryAction={{ label: 'Upload', onClick: () => {} }}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main area */}
        <div className="flex-1 min-w-0">
          {/* Search + Filters + View toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
            <div className="relative flex-1 w-full sm:max-w-xs">
              <input
                type="text"
                placeholder="Search assets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-4 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <FilterBar
              filters={FILTERS}
              activeFilters={activeFilters}
              onFilterChange={(key, value) => setActiveFilters((prev) => ({ ...prev, [key]: value }))}
              onReset={() => setActiveFilters({})}
            />
            <div className="hidden md:flex items-center gap-1 bg-slate-100 rounded-lg p-0.5 ml-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                aria-label="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon={Image}
              title="No media found"
              description="Upload images, documents, and videos for your content."
              primaryAction={{ label: 'Upload Files', onClick: () => {} }}
            />
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
              {filtered.map((asset) => {
                const Icon = TYPE_ICONS[asset.type];
                return (
                  <button
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className={`group relative aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all text-left ${
                      selectedAsset?.id === asset.id
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    {asset.type === 'image' ? (
                      <div className="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center">
                        <Image className="w-10 h-10 text-slate-300" />
                      </div>
                    ) : (
                      <Icon className="w-10 h-10 text-slate-300" />
                    )}
                    <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/60 to-transparent rounded-b-xl">
                      <p className="text-xs font-medium text-white truncate">{asset.name}</p>
                      <p className="text-xs text-white/70">{asset.size}</p>
                    </div>
                  </button>
                );
              })}
              {/* Upload drop zone */}
              <button className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-primary/30 hover:text-primary/60 transition-colors">
                <Upload className="w-8 h-8" />
                <span className="text-xs">Upload</span>
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
              {filtered.map((asset) => {
                const Icon = TYPE_ICONS[asset.type];
                return (
                  <button
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className={`flex items-center gap-4 px-4 py-3 w-full text-left hover:bg-slate-50 ${
                      selectedAsset?.id === asset.id ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{asset.name}</p>
                      <p className="text-xs text-slate-400">{asset.size} {asset.dimensions ? `· ${asset.dimensions}` : ''}</p>
                    </div>
                    <span className="text-xs text-slate-400 hidden sm:block">{asset.uploadedAt}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Asset detail panel (desktop: always visible when selected) */}
        {selectedAsset && (
          <ContextPanel
            open={!!selectedAsset}
            onClose={() => setSelectedAsset(null)}
            title="Asset Details"
          >
            <div className="space-y-4">
              {/* Preview */}
              <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center">
                {selectedAsset.type === 'image' ? (
                  <Image className="w-12 h-12 text-slate-300" />
                ) : (
                  <FileText className="w-12 h-12 text-slate-300" />
                )}
              </div>

              {/* Meta */}
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-slate-500">Name</span>
                  <p className="font-medium text-slate-900">{selectedAsset.name}</p>
                </div>
                <div>
                  <span className="text-slate-500">Type</span>
                  <p className="font-medium text-slate-900 capitalize">{selectedAsset.type}</p>
                </div>
                <div>
                  <span className="text-slate-500">Size</span>
                  <p className="font-medium text-slate-900">{selectedAsset.size}</p>
                </div>
                {selectedAsset.dimensions && (
                  <div>
                    <span className="text-slate-500">Dimensions</span>
                    <p className="font-medium text-slate-900">{selectedAsset.dimensions}</p>
                  </div>
                )}
                <div>
                  <span className="text-slate-500">Uploaded</span>
                  <p className="font-medium text-slate-900">{selectedAsset.uploadedAt}</p>
                </div>
                {selectedAsset.usedIn.length > 0 && (
                  <div>
                    <span className="text-slate-500">Used in</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedAsset.usedIn.map((u) => (
                        <span key={u} className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">{u}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-2">
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">
                  <Copy className="w-4 h-4" /> Copy URL
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">
                  <Download className="w-4 h-4" /> Download
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </ContextPanel>
        )}
      </div>
    </AdminPageWrapper>
  );
}
