'use client';

import React from 'react';
import { X } from 'lucide-react';

interface ContextPanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function ContextPanel({ open, onClose, title, children }: ContextPanelProps) {
  if (!open) return null;

  return (
    <>
      {/* Mobile: bottom sheet */}
      <div className="lg:hidden">
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
        <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl max-h-[85vh] flex flex-col animate-slide-up">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 shrink-0">
            <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              aria-label="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </div>
      </div>

      {/* Desktop: right panel */}
      <div className="hidden lg:flex lg:flex-col lg:w-[360px] lg:border-l lg:border-slate-200 lg:bg-white lg:shrink-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 h-14">
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </>
  );
}
