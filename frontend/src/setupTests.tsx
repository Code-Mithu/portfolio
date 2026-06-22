import { expect, vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback: any, options: any) {}
  observe() {}
  unobserve() {}
  disconnect() {}
} as any;

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Github: () => <span data-testid="github-icon" />,
  Linkedin: () => <span data-testid="linkedin-icon" />,
  Mail: () => <span data-testid="mail-icon" />,
  Menu: () => <span data-testid="menu-icon" />,
  X: () => <span data-testid="x-icon" />,
  Code: () => <span data-testid="code-icon" />,
  Link: () => <span data-testid="link-icon" />,
}));
