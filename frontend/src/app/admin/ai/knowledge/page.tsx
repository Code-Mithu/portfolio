'use client';

import React from 'react';
import { AdminPageWrapper } from '@/components/admin/layout/AdminPageWrapper';
import {
  FileText,
  Globe,
  Database,
  Trash2,
  RefreshCw,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';

interface KnowledgeSource {
  id: string;
  name: string;
  type: 'document' | 'url' | 'manual';
  status: 'synced' | 'syncing' | 'error';
  items: number;
  lastSync: string;
}

const MOCK_SOURCES: KnowledgeSource[] = [
  { id: '1', name: 'Resume & CV', type: 'document', status: 'synced', items: 1, lastSync: '2 hours ago' },
  { id: '2', name: 'Blog Posts', type: 'manual', status: 'synced', items: 24, lastSync: '1 day ago' },
  { id: '3', name: 'Project Descriptions', type: 'manual', status: 'synced', items: 6, lastSync: '3 days ago' },
  { id: '4', name: 'LinkedIn Profile', type: 'url', status: 'syncing', items: 1, lastSync: 'Syncing...' },
  { id: '5', name: 'GitHub README', type: 'url', status: 'error', items: 0, lastSync: 'Failed 1d ago' },
];

const TYPE_ICONS = { document: FileText, url: Globe, manual: Database };
const STATUS_CONFIG = {
  synced: { icon: CheckCircle, color: 'text-emerald-500', label: 'Synced' },
  syncing: { icon: RefreshCw, color: 'text-blue-500 animate-spin', label: 'Syncing' },
  error: { icon: AlertCircle, color: 'text-red-500', label: 'Error' },
};

export default function KnowledgeBasePage() {
  return (
    <AdminPageWrapper
      title="Knowledge Base"
      breadcrumbs={[{ label: 'AI' }, { label: 'Knowledge Base' }]}
      primaryAction={{ label: 'Add Source', onClick: () => {} }}
    >
      <div className="space-y-3">
        {MOCK_SOURCES.map((source) => {
          const TypeIcon = TYPE_ICONS[source.type];
          const { icon: StatusIcon, color, label } = STATUS_CONFIG[source.status];
          return (
            <div
              key={source.id}
              className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <TypeIcon className="w-5 h-5 text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{source.name}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-slate-400">{source.items} items</span>
                  <span className="text-xs text-slate-400">{source.lastSync}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <StatusIcon className={`w-4 h-4 ${color}`} />
                  <span className="text-xs text-slate-500 hidden sm:inline">{label}</span>
                </div>
                <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </AdminPageWrapper>
  );
}
