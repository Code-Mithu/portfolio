'use client';

import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/layout/AdminPageWrapper';
import { ContextPanel } from '@/components/admin/layout/ContextPanel';
import { KanbanBoard } from '@/components/admin/ui/KanbanBoard';
import { KpiCard } from '@/components/admin/ui/KpiCard';
import { Users, UserPlus, Handshake, DollarSign, Mail, Phone, MapPin, Calendar, MessageSquare } from 'lucide-react';

const PIPELINE_COLUMNS = [
  {
    id: 'new',
    title: 'New',
    color: 'bg-blue-500',
    cards: [
      { id: '1', title: 'Sarah Johnson', subtitle: 'CTO at TechCorp', tags: ['Enterprise'], meta: 'Contacted 2h ago' },
      { id: '2', title: 'Mike Chen', subtitle: 'Freelance inquiry', tags: ['Freelance'], meta: 'Contacted 1d ago' },
      { id: '3', title: 'Emily Davis', subtitle: 'Startup founder', tags: ['Startup'], meta: 'From contact form' },
    ],
  },
  {
    id: 'contacted',
    title: 'Contacted',
    color: 'bg-purple-500',
    cards: [
      { id: '4', title: 'Alex Rivera', subtitle: 'Product Manager at DataViz', tags: ['SaaS'], meta: 'Replied 3d ago' },
      { id: '5', title: 'Jordan Lee', subtitle: 'Design agency partner', tags: ['Agency'], meta: 'Call scheduled' },
    ],
  },
  {
    id: 'qualified',
    title: 'Qualified',
    color: 'bg-amber-500',
    cards: [
      { id: '6', title: 'Rachel Green', subtitle: 'VP Eng at FinFlow', tags: ['FinTech'], meta: 'Proposal sent' },
      { id: '7', title: 'David Kim', subtitle: 'E-commerce project', tags: ['E-Commerce'], meta: 'Budget confirmed' },
    ],
  },
  {
    id: 'won',
    title: 'Won',
    color: 'bg-emerald-500',
    cards: [
      { id: '8', title: 'Lisa Wang', subtitle: 'Healthcare dashboard', tags: ['Healthcare'], meta: 'Project started' },
    ],
  },
  {
    id: 'lost',
    title: 'Lost',
    color: 'bg-red-400',
    cards: [
      { id: '9', title: 'Tom Brown', subtitle: 'Budget too high', tags: ['Lost'], meta: '2 weeks ago' },
    ],
  },
];

interface LeadDetail {
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  source: string;
  notes: string;
  createdAt: string;
}

const MOCK_LEAD_DETAIL: LeadDetail = {
  name: 'Sarah Johnson',
  company: 'TechCorp',
  email: 'sarah@techcorp.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  source: 'Contact Form',
  notes: 'Interested in a full redesign of their e-commerce platform. Budget range $50k-80k.',
  createdAt: '2 hours ago',
};

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState<string | null>(null);

  return (
    <AdminPageWrapper
      title="Leads & Contacts"
      breadcrumbs={[{ label: 'Growth' }, { label: 'Leads & Contacts' }]}
      primaryAction={{ label: 'Add Lead', onClick: () => {} }}
    >
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Total Leads" value="18" delta={{ value: '+5 this month', positive: true }} icon={Users} />
        <KpiCard label="New This Week" value="3" icon={UserPlus} />
        <KpiCard label="Win Rate" value="62%" delta={{ value: '+8%', positive: true }} icon={Handshake} />
        <KpiCard label="Pipeline Value" value="$185k" delta={{ value: '+$45k', positive: true }} icon={DollarSign} />
      </div>

      {/* Kanban pipeline */}
      <div className="flex gap-6">
        <div className="flex-1 min-w-0">
          <KanbanBoard
            columns={PIPELINE_COLUMNS}
            onCardClick={(card) => setSelectedLead(card.id)}
          />
        </div>

        {/* Lead detail panel */}
        {selectedLead && (
          <ContextPanel
            open={!!selectedLead}
            onClose={() => setSelectedLead(null)}
            title="Lead Details"
          >
            <div className="space-y-5">
              {/* Avatar + name */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {MOCK_LEAD_DETAIL.name[0]}
                </div>
                <div>
                  <p className="text-base font-semibold text-slate-900">{MOCK_LEAD_DETAIL.name}</p>
                  <p className="text-sm text-slate-500">{MOCK_LEAD_DETAIL.company}</p>
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <a href={`mailto:${MOCK_LEAD_DETAIL.email}`} className="text-primary hover:underline">{MOCK_LEAD_DETAIL.email}</a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-700">{MOCK_LEAD_DETAIL.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-700">{MOCK_LEAD_DETAIL.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-700">Added {MOCK_LEAD_DETAIL.createdAt}</span>
                </div>
              </div>

              {/* Stage */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Pipeline Stage</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Qualified</option>
                  <option>Won</option>
                  <option>Lost</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Notes</label>
                <textarea
                  rows={4}
                  defaultValue={MOCK_LEAD_DETAIL.notes}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700">
                  <MessageSquare className="w-4 h-4" /> Message
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">
                  <Phone className="w-4 h-4" /> Call
                </button>
              </div>
            </div>
          </ContextPanel>
        )}
      </div>
    </AdminPageWrapper>
  );
}
