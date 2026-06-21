"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Contact', href: '/#contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle focus trap / closing on escape / body scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
      setTimeout(() => menuRef.current?.querySelector('a')?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Handle scroll position tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <nav className="fixed w-full z-50 bg-white shadow-sm h-16 flex items-center" aria-label="Main navigation">
      <Container className="flex justify-between items-center h-full">
        <Link href="/" className="font-bold text-xl text-primary" aria-label="Portfolio Home">
          Portfolio
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center" role="list">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={clsx(
              "text-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded",
              activeSection === link.href.split('#')[1] && "text-primary font-semibold"
            )}
          >
            {link.name}
          </a>
        ))}
        <Button href="/resume" variant="primary">
          Resume
        </Button>
        </div>

        {/* Mobile Toggle */}

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-secondary hover:text-primary p-2 flex items-center justify-center min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-primary rounded"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Content */}
      {isOpen && (
        <div 
          id="mobile-menu"
          ref={menuRef}
          className="fixed top-16 left-0 w-full z-50 md:hidden bg-white border-t p-4 flex flex-col space-y-4 shadow-lg"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={clsx(
                "text-secondary hover:text-primary p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded",
                activeSection === link.href.split('#')[1] && "text-primary font-semibold"
              )}
            >
              {link.name}
            </a>
          ))}
          <Button href="/resume" onClick={() => setIsOpen(false)} variant="primary">
            Resume
          </Button>
        </div>
      )}
    </nav>
  );
};
