"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Case Studies', href: '/#case-studies' },
  { name: 'Blog', href: '/#blog' },
  { name: 'Contact', href: '/#contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          width: isScrolled ? "90%" : "100%",
          padding: isScrolled ? "12px 24px" : "20px 32px",
        }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full bg-surface/70 backdrop-blur-xl border border-border/50 shadow-md flex items-center justify-between"
        style={{ maxWidth: "1200px" }}
        aria-label="Main navigation"
      >
        <Link href="/" className="font-bold text-xl text-foreground flex items-center gap-2" aria-label="Portfolio Home">
          Mithu<span className="text-primary">.</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-muted hover:text-foreground px-4 py-2 rounded-full transition-colors text-sm font-medium">
              {link.name}
            </a>
          ))}
          <Link href="/resume" className="ml-2 px-5 py-2 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm hover:shadow-md">
            Resume
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground p-2 rounded-full hover:bg-elevated transition-colors"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm p-6 flex flex-col justify-center items-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-foreground text-4xl font-bold hover:text-primary transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: navLinks.length * 0.1 }}
            >
              <Link href="/resume" onClick={() => setIsOpen(false)} className="px-8 py-4 bg-primary text-white rounded-full text-xl font-semibold shadow-lg hover:bg-primary/90 transition-all">
                Resume
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
