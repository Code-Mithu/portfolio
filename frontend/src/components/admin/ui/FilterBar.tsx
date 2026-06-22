'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterConfig {
  key: string;
  label: string;
  options: FilterOption[];
}

interface FilterBarProps {
  filters: FilterConfig[];
  activeFilters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onReset: () => void;
}

export function FilterBar({ filters, activeFilters, onFilterChange, onReset }: FilterBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const hasActive = Object.values(activeFilters).some((v) => v !== '');

  return (
    <>
      {/* Desktop: inline */}
      <div className="hidden md:flex items-center gap-2 flex-wrap">
        {filters.map((filter) => (
          <div key={filter.key} className="relative">
            <select
              value={activeFilters[filter.key] ?? ''}
              onChange={(e) => onFilterChange(filter.key, e.target.value)}
              className="appearance-none px-3 py-2 pr-8 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer"
            >
              <option value="">{filter.label}</option>
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        ))}
        {hasActive && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-3 py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Mobile: button + bottom sheet */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {hasActive && (
            <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
              {Object.values(activeFilters).filter((v) => v !== '').length}
            </span>
          )}
        </button>

        {mobileOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl max-h-[70vh] flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900">Filters</h3>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {filters.map((filter) => (
                  <div key={filter.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {filter.label}
                    </label>
                    <select
                      value={activeFilters[filter.key] ?? ''}
                      onChange={(e) => onFilterChange(filter.key, e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="">All</option>
                      {filter.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 p-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    onReset();
                    setMobileOpen(false);
                  }}
                  className="flex-1 px-4 py-2.5 text-sm font-medium border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium bg-primary text-white rounded-lg hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
