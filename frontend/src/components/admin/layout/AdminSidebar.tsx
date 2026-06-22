'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  BookOpen,
  Image,
  BarChart3,
  Search,
  Bot,
  Brain,
  MessageSquare,
  Mail,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  LogOut,
  User,
  type LucideIcon,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Content',
    items: [
      { label: 'Blog', href: '/admin/blog', icon: FileText },
      { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
      { label: 'Case Studies', href: '/admin/case-studies', icon: BookOpen },
      { label: 'Media Library', href: '/admin/media', icon: Image },
    ],
  },
  {
    title: 'Insights',
    items: [
      { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
      { label: 'SEO', href: '/admin/seo', icon: Search },
    ],
  },
  {
    title: 'AI',
    items: [
      { label: 'Assistant Manager', href: '/admin/ai', icon: Bot },
      { label: 'Knowledge Base', href: '/admin/ai/knowledge', icon: Brain },
      { label: 'Conversation Logs', href: '/admin/ai/logs', icon: MessageSquare },
    ],
  },
  {
    title: 'Growth',
    items: [
      { label: 'Newsletter', href: '/admin/newsletter', icon: Mail },
      { label: 'Leads & Contacts', href: '/admin/leads', icon: Users },
    ],
  },
  {
    title: 'Settings',
    items: [
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
];

interface AdminSidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function AdminSidebar({
  mobileOpen,
  onMobileClose,
  collapsed,
  onToggleCollapse,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = useCallback(
    (href: string) => {
      if (href === '/admin') return pathname === '/admin';
      return pathname.startsWith(href);
    },
    [pathname],
  );

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [mobileOpen]);

  const sidebarContent = (
    <nav className="flex flex-col h-full" aria-label="Admin navigation">
      {/* Logo / Brand */}
      <div className="flex items-center h-16 px-4 border-b border-slate-200 shrink-0">
        <Link href="/admin" className="flex items-center gap-2 text-slate-900 font-semibold">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-sm font-bold">
            P
          </div>
          {!collapsed && <span className="text-lg">Portfolio</span>}
        </Link>
      </div>

      {/* Nav Groups */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.title}>
            {!collapsed && (
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider px-3 mb-2">
                {group.title}
              </p>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onMobileClose}
                      title={collapsed ? item.label : undefined}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                        ${collapsed ? 'justify-center' : ''}
                        ${
                          active
                            ? 'bg-primary/10 text-primary border-l-2 border-primary'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom: User + Logout (mobile) / Collapse toggle (desktop) */}
      <div className="border-t border-slate-200 p-3 shrink-0">
        {/* Mobile: user info + logout */}
        <div className="lg:hidden">
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
              <User className="w-4 h-4 text-slate-500" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">Admin User</p>
              <p className="text-xs text-slate-500 truncate">admin@portfolio.com</p>
            </div>
          </div>
          <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-slate-600 hover:bg-slate-100">
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>

        {/* Desktop/Tablet: collapse toggle */}
        <div className="hidden lg:block">
          <button
            onClick={onToggleCollapse}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 mx-auto" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 
          transform transition-transform duration-300 ease-in-out
          lg:hidden
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <button
          onClick={onMobileClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`
          hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:z-30
          bg-white border-r border-slate-200 transition-all duration-300
          ${collapsed ? 'lg:w-[72px]' : 'lg:w-64'}
        `}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
