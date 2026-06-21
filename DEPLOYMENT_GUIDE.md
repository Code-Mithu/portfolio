# Deployment Guide

This guide outlines the steps to deploy the Portfolio Website to a production environment (e.g., Vercel).

## 1. Prerequisites
- Repository hosted on GitHub/GitLab.
- Vercel account linked to the repository.

## 2. Deployment Steps
1. Push code to the `main` branch.
2. Vercel automatically detects the Next.js project and initiates a build.
3. Verify build output in the Vercel dashboard.

## 3. Environment Configuration
- Configure Environment Variables (e.g., `NEXT_PUBLIC_API_URL`) in Vercel project settings.

## 4. Domain & SSL
- Vercel provides automatic SSL via Let's Encrypt.
- Configure custom domain in Vercel project settings.

## 5. Analytics & Monitoring
- **Analytics:** Configure GA4 tracking ID in `layout.tsx` or via `next/script`.
- **Error Monitoring:** Integrate Sentry (optional) by adding the Sentry DSN environment variable.
