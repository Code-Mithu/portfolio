'use client';

import React from 'react';
import Link from 'next/link';
import { AdminPageWrapper } from '@/components/admin/layout/AdminPageWrapper';
import { Brain, Settings, MessageSquare, Database, Zap, ArrowRight } from 'lucide-react';

const AI_CARDS = [
  {
    title: 'Knowledge Sources',
    description: 'Manage documents and data that power AI responses.',
    icon: Database,
    href: '/admin/ai/knowledge',
    stat: '12 sources',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Prompt Settings',
    description: 'Configure AI behavior, tone, and response guidelines.',
    icon: Settings,
    href: '/admin/ai',
    stat: 'Last updated 3d ago',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Conversation Logs',
    description: 'Review past AI interactions and user conversations.',
    icon: MessageSquare,
    href: '/admin/ai/logs',
    stat: '48 conversations',
    color: 'bg-emerald-50 text-emerald-600',
  },
];

const QUICK_STATS = [
  { label: 'Total Conversations', value: '248', change: '+12 this week' },
  { label: 'Avg. Response Time', value: '1.2s', change: '-0.3s improved' },
  { label: 'User Satisfaction', value: '4.6/5', change: '+0.2 this month' },
  { label: 'Knowledge Items', value: '12', change: '2 pending review' },
];

export default function AiHomePage() {
  return (
    <AdminPageWrapper
      title="AI Assistant"
      breadcrumbs={[{ label: 'AI' }, { label: 'Assistant Manager' }]}
    >
      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {QUICK_STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500">{stat.label}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{stat.value}</p>
            <p className="text-xs text-emerald-600 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {AI_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:border-primary/30 hover:shadow-sm transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">{card.title}</h3>
              <p className="text-sm text-slate-500 mb-3">{card.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{card.stat}</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Prompt Settings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-5 h-5 text-amber-500" />
          <h3 className="text-base font-semibold text-slate-900">Prompt Configuration</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">System Prompt</label>
            <textarea
              rows={4}
              defaultValue="You are a helpful assistant for a professional portfolio website. Answer questions about the portfolio owner's skills, experience, and projects. Be concise, professional, and friendly."
              className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Tone</label>
              <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option>Professional</option>
                <option>Friendly</option>
                <option>Casual</option>
                <option>Formal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Max Response Length</label>
              <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option>Short (1-2 sentences)</option>
                <option>Medium (paragraph)</option>
                <option>Long (detailed)</option>
              </select>
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700">
            Save Settings
          </button>
        </div>
      </div>
    </AdminPageWrapper>
  );
}
