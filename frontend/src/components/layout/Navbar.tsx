"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // -------------------------------------------------
  // Breakpoint detection (md = 768px)
  // -------------------------------------------------
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      if (e.matches) setMobileOpen(false); // close mobile menu when switching to desktop
    };
    setIsDesktop(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // -------------------------------------------------
  // Body scroll lock when mobile menu is open
  // -------------------------------------------------
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // -------------------------------------------------
  // Desktop navbar shrink / hide on scroll
  // -------------------------------------------------
  useEffect(() => {
    if (!isDesktop) return;
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDesktop]);

  const toggleMobile = () => setMobileOpen((prev) => !prev);

  return (
    <>
      {/* Desktop glass navbar */}
      <nav
        className={`
          fixed top-4 left-1/2 -translate-x-1/2
          w-[calc(100%-2rem)] max-w-5xl
          bg-glass border border-border rounded-xl
          backdrop-blur-xl transition-all duration-300
          ${scrolled ? "-translate-y-2 h-12" : "h-16"}
          z-40
        `}
        aria-label="Main navigation"
      >
        <div className="h-full flex items-center justify-between px-4">
          <Link href="/" className="text-xl font-semibold text-surface">
            MyPortfolio
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex space-x-6 text-surface">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    hover:underline underline-offset-4
                    ${pathname === item.href ? "font-bold" : ""}
                  `}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile toggle – hidden on desktop */}
          <button
            className="md:hidden p-2 text-surface"
            onClick={toggleMobile}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      {mobileOpen && (
        <div
          className={`
            fixed inset-0 z-50 flex flex-col items-center justify-center
            bg-black/70 backdrop-blur-lg
          `}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-4 right-4 p-2 text-white"
            onClick={toggleMobile}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>

          <ul className="space-y-6 text-2xl font-medium text-white">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="hover:underline underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
