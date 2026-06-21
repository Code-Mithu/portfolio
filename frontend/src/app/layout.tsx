import './globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'My Professional Portfolio | Frontend Engineer',
  description: 'Portfolio of a dedicated frontend engineer specializing in React, Next.js, and creating accessible, responsive web experiences.',
  openGraph: {
    title: 'My Professional Portfolio | Frontend Engineer',
    description: 'Portfolio of a dedicated frontend engineer specializing in React, Next.js, and creating accessible, responsive web experiences.',
    url: 'https://your-portfolio-url.com',
    siteName: 'My Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Professional Portfolio | Frontend Engineer',
    description: 'Portfolio of a dedicated frontend engineer specializing in React, Next.js, and creating accessible, responsive web experiences.',
  },
  alternates: {
    canonical: 'https://your-portfolio-url.com',
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
