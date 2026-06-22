'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MoreHorizontal } from 'lucide-react';

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  rowActions?: (item: T) => React.ReactNode;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  rowActions,
  emptyMessage = 'No data found',
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 text-sm">{emptyMessage}</div>
    );
  }

  return (
    <>
      {/* Desktop: table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider ${col.className ?? ''}`}
                >
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      className="flex items-center gap-1 hover:text-slate-700 transition-colors"
                    >
                      {col.label}
                      {sortKey === col.key && (
                        sortDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                      )}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
              {rowActions && <th className="w-10" />}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item) => (
              <tr
                key={keyExtractor(item)}
                onClick={() => onRowClick?.(item)}
                className={`group ${onRowClick ? 'cursor-pointer hover:bg-slate-50' : ''}`}
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3 text-slate-700 ${col.className ?? ''}`}>
                    {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? '')}
                  </td>
                ))}
                {rowActions && (
                  <td className="px-2 py-3">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {rowActions(item)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: list */}
      <div className="md:hidden divide-y divide-slate-100">
        {data.map((item) => (
          <div
            key={keyExtractor(item)}
            onClick={() => onRowClick?.(item)}
            className={`px-4 py-3 ${onRowClick ? 'cursor-pointer active:bg-slate-50' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                {columns.slice(0, 2).map((col) => (
                  <div key={col.key} className={col.key === columns[0].key ? 'text-sm font-medium text-slate-900' : 'text-xs text-slate-500 mt-0.5'}>
                    {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? '')}
                  </div>
                ))}
              </div>
              {rowActions && (
                <div className="shrink-0 ml-2">
                  {rowActions(item)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="animate-pulse">
      <div className="hidden md:block">
        <div className="flex gap-4 px-4 py-3 border-b border-slate-200">
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} className="h-3 bg-slate-200 rounded flex-1" />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 px-4 py-4 border-b border-slate-100">
            {Array.from({ length: cols }).map((_, j) => (
              <div key={j} className="h-4 bg-slate-100 rounded flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
