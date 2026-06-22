'use client';

import React, { useState } from 'react';
import { AdminPageWrapper } from '@/components/admin/layout/AdminPageWrapper';
import {
  User,
  Globe,
  Palette,
  Bell,
  Shield,
  Database,
  Code,
  Save,
} from 'lucide-react';

const SETTINGS_NAV = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'site', label: 'Site Settings', icon: Globe },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'data', label: 'Data & Export', icon: Database },
  { id: 'integrations', label: 'Integrations', icon: Code },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <AdminPageWrapper title="Settings">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Desktop: left nav */}
        <nav className="hidden lg:block w-56 shrink-0">
          <ul className="space-y-1 sticky top-20">
            {SETTINGS_NAV.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center gap-3 w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile: grouped list */}
        <div className="lg:hidden">
          <div className="flex overflow-x-auto gap-1 border-b border-slate-200 -mx-4 px-4 mb-6">
            {SETTINGS_NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-3 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeSection === item.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 max-w-2xl">
          {activeSection === 'profile' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <h3 className="text-base font-semibold text-slate-900">Profile Settings</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center">
                  <User className="w-8 h-8 text-slate-400" />
                </div>
                <button className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
                  Change Photo
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                  <input type="text" defaultValue="Admin User" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <input type="email" defaultValue="admin@portfolio.com" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Job Title</label>
                  <input type="text" defaultValue="Frontend Engineer" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Location</label>
                  <input type="text" defaultValue="San Francisco, CA" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Bio</label>
                <textarea rows={3} defaultValue="Frontend engineer specializing in React and Next.js." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          )}

          {activeSection === 'site' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <h3 className="text-base font-semibold text-slate-900">Site Settings</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Site Title</label>
                <input type="text" defaultValue="My Professional Portfolio" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Site URL</label>
                <input type="url" defaultValue="https://your-portfolio-url.com" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Description</label>
                <textarea rows={3} defaultValue="Portfolio of a dedicated frontend engineer." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Google Analytics ID</label>
                <input type="text" placeholder="G-XXXXXXXXXX" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <h3 className="text-base font-semibold text-slate-900">Appearance</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Light', 'Dark', 'System'].map((theme) => (
                    <button
                      key={theme}
                      className={`px-4 py-3 text-sm font-medium rounded-lg border transition-colors ${
                        theme === 'Light' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" defaultValue="#2563EB" className="w-10 h-10 rounded border border-slate-200 cursor-pointer" />
                  <input type="text" defaultValue="#2563EB" className="w-32 px-3 py-2 text-sm border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Font</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Inter</option>
                  <option>Roboto</option>
                  <option>Open Sans</option>
                  <option>Poppins</option>
                </select>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <h3 className="text-base font-semibold text-slate-900">Notification Preferences</h3>
              {[
                { label: 'New contact form submissions', enabled: true },
                { label: 'New lead inquiries', enabled: true },
                { label: 'Newsletter subscriber milestones', enabled: false },
                { label: 'SEO alerts and issues', enabled: true },
                { label: 'Weekly analytics summary', enabled: false },
              ].map((pref) => (
                <div key={pref.label} className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-700">{pref.label}</span>
                  <button className={`relative w-10 h-6 rounded-full transition-colors ${pref.enabled ? 'bg-primary' : 'bg-slate-200'}`}>
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${pref.enabled ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'security' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <h3 className="text-base font-semibold text-slate-900">Security</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Password</label>
                <input type="password" placeholder="Enter current password" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                  <input type="password" placeholder="New password" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                  <input type="password" placeholder="Confirm new password" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700">
                <Save className="w-4 h-4" /> Update Password
              </button>

              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-sm font-medium text-slate-700 mb-3">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">2FA is currently disabled</span>
                  <button className="px-3 py-1.5 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5">
                    Enable
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'data' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <h3 className="text-base font-semibold text-slate-900">Data & Export</h3>
              <div className="space-y-3">
                {[
                  { label: 'Export blog posts', desc: 'Download all posts as JSON', action: 'Export' },
                  { label: 'Export projects', desc: 'Download all projects as JSON', action: 'Export' },
                  { label: 'Export analytics data', desc: 'Download analytics as CSV', action: 'Export' },
                  { label: 'Export leads', desc: 'Download contacts as CSV', action: 'Export' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    <button className="px-3 py-1.5 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5">
                      {item.action}
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-sm font-medium text-red-600 mb-2">Danger Zone</h4>
                <button className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50">
                  Delete All Data
                </button>
              </div>
            </div>
          )}

          {activeSection === 'integrations' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <h3 className="text-base font-semibold text-slate-900">Integrations</h3>
              {[
                { name: 'Google Analytics', status: 'Connected', connected: true },
                { name: 'Mailchimp', status: 'Not connected', connected: false },
                { name: 'GitHub', status: 'Connected', connected: true },
                { name: 'Vercel', status: 'Connected', connected: true },
                { name: 'Stripe', status: 'Not connected', connected: false },
              ].map((integration) => (
                <div key={integration.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center">
                      <Code className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{integration.name}</p>
                      <p className={`text-xs ${integration.connected ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {integration.status}
                      </p>
                    </div>
                  </div>
                  <button className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                    integration.connected
                      ? 'text-slate-600 border border-slate-200 hover:bg-slate-100'
                      : 'text-primary border border-primary hover:bg-primary/5'
                  }`}>
                    {integration.connected ? 'Configure' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminPageWrapper>
  );
}
