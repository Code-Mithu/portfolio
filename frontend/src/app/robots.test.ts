import { describe, it, expect } from 'vitest';
import robots from './robots';

describe('robots.ts', () => {
  it('returns a valid robots configuration', () => {
    const result = robots();
    expect(result).toBeDefined();
    expect(result.rules).toBeDefined();
  });

  it('allows all user agents', () => {
    const result = robots();
    expect(result.rules).toEqual(
      expect.objectContaining({
        userAgent: '*',
        allow: '/',
      })
    );
  });

  it('includes a sitemap URL', () => {
    const result = robots();
    expect(result.sitemap).toBeDefined();
    expect(typeof result.sitemap).toBe('string');
    expect(result.sitemap).toContain('sitemap.xml');
  });
});
