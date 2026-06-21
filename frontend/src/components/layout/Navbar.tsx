"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

const navLinks = [
  { name: 'Projects', href: '/projects' },
  { name: 'Experience', href: '/experience' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed w-full z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="font-bold text-xl text-primary">
            Portfolio
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "text-secondary hover:text-primary transition-colors",
                  pathname === link.href && "text-primary font-semibold"
                )}
              >
                {link.name}
              </Link>
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
              className="text-secondary hover:text-primary p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={clsx(
                "text-secondary hover:text-primary",
                pathname === link.href && "text-primary font-semibold"
              )}
            >
              {link.name}
            </Link>
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
