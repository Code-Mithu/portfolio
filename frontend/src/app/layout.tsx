"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "My Professional Portfolio | Frontend Engineer",
    template: "%s | My Professional Portfolio",
  },
  description:
    "Portfolio of a dedicated frontend engineer specializing in React, Next.js, and creating accessible, responsive web experiences.",
  keywords: [
    "Frontend Engineer",
    "React",
    "Next.js",
    "Portfolio",
    "Web Developer",
  ],
  authors: [{ name: "Your Name" }],
};

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
}
const ThemeContext = createContext<ThemeContextProps>({ theme: "light" });

export const useTheme = () => useContext(ThemeContext);

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("light");

  // System‑only theme detection
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => setTheme(media.matches ? "dark" : "light");
    applyTheme();
    media.addEventListener("change", applyTheme);
    return () => media.removeEventListener("change", applyTheme);
  }, []);

  // Apply the theme class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <html lang="en" className={inter.className}>
      <body className="bg-surface text-foreground antialiased">
        <ThemeContext.Provider value={{ theme }}>
          <Navbar />
          {children}
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
