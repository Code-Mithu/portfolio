'use client';

import React from 'react';
import { AdminTopBar } from './AdminTopBar';
import { useAdmin } from './AdminContext';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface AdminPageWrapperProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  dateRange?: boolean;
  children: React.ReactNode;
}

export function AdminPageWrapper({
  title,
  breadcrumbs,
  primaryAction,
  dateRange,
  children,
}: AdminPageWrapperProps) {
  const { openMobileSidebar } = useAdmin();

  return (
    <div className="flex flex-col min-h-screen">
      <AdminTopBar
        title={title}
        breadcrumbs={breadcrumbs}
        primaryAction={primaryAction}
        dateRange={dateRange}
        onMenuClick={openMobileSidebar}
      />
      <main className="flex-1 p-4 lg:p-6">{children}</main>
    </div>
  );
}
