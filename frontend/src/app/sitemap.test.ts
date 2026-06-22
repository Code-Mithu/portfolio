import { describe, it, expect } from 'vitest';
import sitemap from './sitemap';

describe('sitemap.ts', () => {
  it('returns an array of sitemap entries', () => {
    const result = sitemap();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('includes the main URL entry', () => {
    const result = sitemap();
    const mainEntry = result[0];
    expect(mainEntry.url).toBeDefined();
    expect(typeof mainEntry.url).toBe('string');
    expect(mainEntry.url).toContain('https://');
  });

  it('has lastModified as a Date object', () => {
    const result = sitemap();
    const mainEntry = result[0];
    expect(mainEntry.lastModified).toBeInstanceOf(Date);
  });

  it('has changeFrequency set to monthly', () => {
    const result = sitemap();
    const mainEntry = result[0];
    expect(mainEntry.changeFrequency).toBe('monthly');
  });

  it('has priority set to 1 (highest)', () => {
    const result = sitemap();
    const mainEntry = result[0];
    expect(mainEntry.priority).toBe(1);
  });
});
