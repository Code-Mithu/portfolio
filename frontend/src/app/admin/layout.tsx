'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminProvider } from '@/components/admin/layout/AdminContext';

const COLLAPSED_KEY = 'admin-sidebar-collapsed';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COLLAPSED_KEY);
    if (stored === 'true') setCollapsed(true);
  }, []);

  const handleToggleCollapse = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(COLLAPSED_KEY, String(next));
      return next;
    });
  };

  const contextValue = useMemo(
    () => ({ openMobileSidebar: () => setMobileOpen(true) }),
    [],
  );

  return (
    <AdminProvider value={contextValue}>
      <div className="min-h-screen bg-slate-50">
        <AdminSidebar
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
          collapsed={collapsed}
          onToggleCollapse={handleToggleCollapse}
        />
        <div
          className={`transition-all duration-300 ${
            collapsed ? 'lg:pl-[72px]' : 'lg:pl-64'
          }`}
        >
          {children}
        </div>
      </div>
    </AdminProvider>
  );
}
