'use client';

import React, { createContext, useContext } from 'react';

interface AdminContextValue {
  openMobileSidebar: () => void;
}

const AdminContext = createContext<AdminContextValue>({
  openMobileSidebar: () => {},
});

export const AdminProvider = AdminContext.Provider;

export function useAdmin() {
  return useContext(AdminContext);
}
