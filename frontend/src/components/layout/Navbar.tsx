"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

const navLinks = [
  { name: 'Projects', href: '/#projects' },
  { name: 'Experience', href: '/#experience' },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle focus trap / closing on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      menuRef.current?.querySelector('a')?.focus();
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <nav className="fixed w-full z-50 bg-white shadow-sm" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="font-bold text-xl text-primary" aria-label="Portfolio Home">
            Portfolio
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={clsx(
                  "text-secondary hover:text-primary transition-colors",
                  pathname === link.href && "text-primary font-semibold"
                )}
              >
                {link.name}
              </a>
            ))}
            <Link 
              href="/resume"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Resume
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary hover:text-primary p-2 flex items-center justify-center min-h-[44px] min-w-[44px]"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div 
          id="mobile-menu"
          ref={menuRef}
          className="md:hidden bg-white border-t p-4 flex flex-col space-y-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={clsx(
                "text-secondary hover:text-primary p-2",
                pathname === link.href && "text-primary font-semibold"
              )}
            >
              {link.name}
            </a>
          ))}
          <Link 
            href="/resume"
            onClick={() => setIsOpen(false)}
            className="bg-primary text-white px-4 py-2 rounded text-center"
          >
            Resume
          </Link>
        </div>
      )}
    </nav>
  );
};
