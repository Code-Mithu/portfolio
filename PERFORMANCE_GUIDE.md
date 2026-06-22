# Performance Optimization Guide

This project implements several strategies to ensure high performance and accessibility scores (Target: Lighthouse > 90, Accessibility > 90, SEO > 90).

## 1. Image Optimization
- Uses Next.js `next/image` component for automatic resizing, format optimization (WebP/AVIF), and lazy loading.

## 2. Font Optimization
- Utilizes Next.js `next/font` to load fonts efficiently and prevent layout shifts (CLS).

## 3. Code Splitting & Lazy Loading
- Next.js App Router automatically performs route-based code splitting.
- **Component Lazy Loading**: Below-the-fold components are loaded lazily using `next/dynamic` to reduce the initial JavaScript bundle size and improve LCP.

## 4. Bundle Optimization
- Next.js optimizes build output automatically.
- Keep dependencies lean and remove unused packages.

## 5. Performance Validation
- Run Lighthouse audits via Chrome DevTools or CLI.
- Monitor Core Web Vitals (LCP, FID, CLS).
