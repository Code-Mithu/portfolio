'use client';

import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  Plus,
  ChevronDown,
  User,
  LogOut,
  Settings,
} from 'lucide-react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface AdminTopBarProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  dateRange?: boolean;
  onMenuClick: () => void;
}

export function AdminTopBar({
  title,
  breadcrumbs,
  primaryAction,
  dateRange,
  onMenuClick,
}: AdminTopBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
      <div className="flex items-center h-16 px-4 lg:px-6 gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Left: Title + Breadcrumbs */}
        <div className="flex items-center gap-2 min-w-0">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="hidden md:flex items-center gap-1 text-sm text-slate-400">
              {breadcrumbs.map((crumb, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span>/</span>}
                  {crumb.href ? (
                    <a href={crumb.href} className="hover:text-slate-600 transition-colors">
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-slate-600">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}
          <h1 className="text-lg font-semibold text-slate-900 truncate">{title}</h1>
        </div>

        {/* Middle: Global search (desktop only) */}
        <div className="hidden lg:flex flex-1 max-w-md mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 ml-auto shrink-0">
          {/* Mobile search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Date range (optional) */}
          {dateRange && (
            <button className="hidden md:flex items-center gap-2 px-3 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <span>Last 30 days</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          )}

          {/* Primary action */}
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{primaryAction.label}</span>
            </button>
          )}

          {/* Notifications */}
          <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100" aria-label="Notifications">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Profile menu */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Profile menu"
            >
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                <User className="w-4 h-4 text-slate-500" />
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {profileOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setProfileOpen(false)}
                  aria-hidden="true"
                />
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-20">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-900">Admin User</p>
                    <p className="text-xs text-slate-500">admin@portfolio.com</p>
                  </div>
                  <a href="/admin/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                    <Settings className="w-4 h-4" />
                    Settings
                  </a>
                  <button className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 w-full text-left">
                    <LogOut className="w-4 h-4" />
                    Log out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search bar (expandable) */}
      {searchOpen && (
        <div className="lg:hidden px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
      )}
    </header>
  );
}
