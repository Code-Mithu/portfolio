import './globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const SITE_URL = 'https://your-portfolio-url.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'My Professional Portfolio | Frontend Engineer',
    template: '%s | My Professional Portfolio',
  },
  description: 'Portfolio of a dedicated frontend engineer specializing in React, Next.js, and creating accessible, responsive web experiences.',
  keywords: ['Frontend Engineer', 'React', 'Next.js', 'Portfolio', 'Web Developer'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'My Professional Portfolio | Frontend Engineer',
    description: 'Portfolio of a dedicated frontend engineer specializing in React, Next.js, and creating accessible, responsive web experiences.',
    url: SITE_URL,
    siteName: 'My Professional Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Professional Portfolio | Frontend Engineer',
    description: 'Portfolio of a dedicated frontend engineer specializing in React, Next.js, and creating accessible, responsive web experiences.',
    creator: '@yourhandle',
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
