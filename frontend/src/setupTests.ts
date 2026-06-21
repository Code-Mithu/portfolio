import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback: any, options: any) {}
  observe() {}
  unobserve() {}
  disconnect() {}
} as any;
