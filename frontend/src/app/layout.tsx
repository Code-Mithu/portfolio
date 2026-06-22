import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Mithu Kumar Das | Finance & Technology Professional",
    template: "%s | Mithu Kumar Das",
  },
  description:
    "Portfolio of a multidisciplinary professional bridging corporate finance operations and full-stack development. Expertise in L/C management, VAT compliance, financial systems, and modern web technologies including React, Next.js, and Python.",
  keywords: [
    "Finance Professional",
    "Full-Stack Developer",
    "L/C Management",
    "VAT Compliance",
    "Financial Operations",
    "React",
    "Next.js",
    "Python",
    "Django",
    "Tax Automation",
    "Portfolio",
  ],
  authors: [{ name: "Mithu Kumar Das" }],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-surface text-foreground antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
