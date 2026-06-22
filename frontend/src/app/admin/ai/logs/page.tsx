'use client';

import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/layout/AdminPageWrapper';
import { ContextPanel } from '@/components/admin/layout/ContextPanel';
import { FilterBar } from '@/components/admin/ui/FilterBar';
import { MessageSquare, User, Bot, Clock, Search } from 'lucide-react';

interface Conversation {
  id: string;
  userMessage: string;
  aiResponse: string;
  timestamp: string;
  satisfaction: number | null;
  topic: string;
}

const MOCK_LOGS: Conversation[] = [
  { id: '1', userMessage: 'What technologies do you specialize in?', aiResponse: 'I specialize in React, Next.js, TypeScript, and Node.js. I have extensive experience building scalable web applications...', timestamp: '2 hours ago', satisfaction: 5, topic: 'Skills' },
  { id: '2', userMessage: 'Can you tell me about your e-commerce project?', aiResponse: 'The E-Commerce Platform project was built using Next.js with ISR for optimal performance. Key features include...', timestamp: '5 hours ago', satisfaction: 4, topic: 'Projects' },
  { id: '3', userMessage: 'How many years of experience do you have?', aiResponse: 'I have over 5 years of professional experience in frontend development, with a focus on modern JavaScript frameworks...', timestamp: '1 day ago', satisfaction: null, topic: 'Experience' },
  { id: '4', userMessage: 'What is your education background?', aiResponse: 'I hold a Bachelor\'s degree in Computer Science. I\'ve also completed several professional certifications...', timestamp: '2 days ago', satisfaction: 5, topic: 'Education' },
  { id: '5', userMessage: 'Are you available for freelance work?', aiResponse: 'Thank you for your interest! For availability and project inquiries, please use the contact form...', timestamp: '3 days ago', satisfaction: 3, topic: 'Contact' },
];

const FILTERS = [
  {
    key: 'topic',
    label: 'Topic',
    options: [
      { label: 'Skills', value: 'Skills' },
      { label: 'Projects', value: 'Projects' },
      { label: 'Experience', value: 'Experience' },
      { label: 'Contact', value: 'Contact' },
    ],
  },
];

export default function ConversationLogsPage() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [selectedConvo, setSelectedConvo] = useState<Conversation | null>(null);
  const [search, setSearch] = useState('');

  const filtered = MOCK_LOGS.filter((c) => {
    if (activeFilters.topic && c.topic !== activeFilters.topic) return false;
    if (search && !c.userMessage.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <AdminPageWrapper
      title="Conversation Logs"
      breadcrumbs={[{ label: 'AI' }, { label: 'Conversation Logs' }]}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <FilterBar
              filters={FILTERS}
              activeFilters={activeFilters}
              onFilterChange={(key, value) => setActiveFilters((prev) => ({ ...prev, [key]: value }))}
              onReset={() => setActiveFilters({})}
            />
          </div>

          {/* List */}
          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
            {filtered.map((convo) => (
              <button
                key={convo.id}
                onClick={() => setSelectedConvo(convo)}
                className={`flex items-start gap-3 px-4 py-3 w-full text-left hover:bg-slate-50 transition-colors ${
                  selectedConvo?.id === convo.id ? 'bg-slate-50' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{convo.userMessage}</p>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{convo.aiResponse}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {convo.timestamp}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-500">{convo.topic}</span>
                    {convo.satisfaction && (
                      <span className="text-xs text-amber-500">{'★'.repeat(convo.satisfaction)}</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conversation detail */}
        {selectedConvo && (
          <ContextPanel
            open={!!selectedConvo}
            onClose={() => setSelectedConvo(null)}
            title="Conversation"
          >
            <div className="space-y-4">
              {/* User message */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-slate-500" />
                </div>
                <div className="flex-1 bg-slate-50 rounded-lg p-3">
                  <p className="text-sm text-slate-700">{selectedConvo.userMessage}</p>
                </div>
              </div>

              {/* AI response */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 bg-primary/5 rounded-lg p-3">
                  <p className="text-sm text-slate-700">{selectedConvo.aiResponse}</p>
                </div>
              </div>

              {/* Meta */}
              <div className="pt-2 border-t border-slate-200 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Time</span>
                  <span className="text-slate-700">{selectedConvo.timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Topic</span>
                  <span className="text-slate-700">{selectedConvo.topic}</span>
                </div>
                {selectedConvo.satisfaction && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Rating</span>
                    <span className="text-amber-500">{'★'.repeat(selectedConvo.satisfaction)}</span>
                  </div>
                )}
              </div>
            </div>
          </ContextPanel>
        )}
      </div>
    </AdminPageWrapper>
  );
}
