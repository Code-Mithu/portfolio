'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface KanbanCard {
  id: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  meta?: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  cards: KanbanCard[];
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  onCardClick?: (card: KanbanCard) => void;
}

export function KanbanBoard({ columns, onCardClick }: KanbanBoardProps) {
  const [activeTab, setActiveTab] = useState(columns[0]?.id);

  return (
    <>
      {/* Desktop: horizontal columns */}
      <div className="hidden md:flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <div key={col.id} className="flex-1 min-w-[280px] max-w-[360px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${col.color}`} />
                <h3 className="text-sm font-semibold text-slate-900">{col.title}</h3>
                <span className="text-xs text-slate-400 bg-slate-100 rounded-full px-2 py-0.5">
                  {col.cards.length}
                </span>
              </div>
              <button className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {col.cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => onCardClick?.(card)}
                  className="bg-white rounded-lg border border-slate-200 p-3 cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all"
                >
                  <p className="text-sm font-medium text-slate-900">{card.title}</p>
                  {card.subtitle && (
                    <p className="text-xs text-slate-500 mt-1">{card.subtitle}</p>
                  )}
                  {card.tags && card.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {card.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {card.meta && (
                    <p className="text-xs text-slate-400 mt-2">{card.meta}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: tabs */}
      <div className="md:hidden">
        <div className="flex overflow-x-auto gap-1 border-b border-slate-200 mb-4">
          {columns.map((col) => (
            <button
              key={col.id}
              onClick={() => setActiveTab(col.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === col.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${col.color}`} />
              {col.title}
              <span className="text-xs text-slate-400">{col.cards.length}</span>
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {columns
            .find((c) => c.id === activeTab)
            ?.cards.map((card) => (
              <div
                key={card.id}
                onClick={() => onCardClick?.(card)}
                className="bg-white rounded-lg border border-slate-200 p-3 active:bg-slate-50"
              >
                <p className="text-sm font-medium text-slate-900">{card.title}</p>
                {card.subtitle && (
                  <p className="text-xs text-slate-500 mt-1">{card.subtitle}</p>
                )}
                {card.tags && card.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {card.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {card.meta && (
                  <p className="text-xs text-slate-400 mt-2">{card.meta}</p>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
