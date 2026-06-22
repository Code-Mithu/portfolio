'use client';

import React from 'react';
import { NAVIGATION_LINKS, SOCIAL_LINKS } from '../../lib/constants';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-white py-12" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand/Copyright */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl">Portfolio</h3>
            <p className="text-slate-300 text-sm">
              Building digital experiences that matter. 
              Showcasing projects, skills, and professional journey.
            </p>
            <p className="text-slate-400 text-sm">
              &copy; {currentYear} All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Footer navigation">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info & Social */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-slate-300 text-sm mb-2">
                <a href="mailto:email@example.com" className="hover:text-white transition-colors">
                  email@example.com
                </a>
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      aria-label={social.ariaLabel}
                      className="text-slate-300 hover:text-white transition-colors text-sm"
                      rel={social.isExternal ? 'noopener noreferrer' : undefined}
                      target={social.isExternal ? '_blank' : undefined}
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="mt-8 pt-8 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            Made with ❤️ using Next.js
          </p>
          <button
            onClick={scrollToTop}
            className="text-slate-300 hover:text-white transition-colors text-sm flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-white rounded px-2 py-1"
            aria-label="Back to top"
          >
            Back to Top
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};
