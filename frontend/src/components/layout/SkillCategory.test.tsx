import { render, screen } from '@testing-library/react';
import { SkillCategory } from './SkillCategory';
import { describe, it, expect } from 'vitest';

describe('SkillCategory Component', () => {
  it('renders correctly', () => {
    render(
      <SkillCategory
        title="Frontend"
        description="Modern frontend technologies and frameworks"
        items={['React', 'Next.js', 'TypeScript']}
      />
    );
    expect(screen.getByText('Frontend')).toBeDefined();
    expect(screen.getByText('Modern frontend technologies and frameworks')).toBeDefined();
    expect(screen.getByText('React')).toBeDefined();
  });

  it('renders all skill items', () => {
    render(
      <SkillCategory
        title="Tools"
        description="Development and deployment tools"
        items={['Git', 'Vercel', 'Docker', 'Figma']}
      />
    );
    expect(screen.getByText('Git')).toBeDefined();
    expect(screen.getByText('Vercel')).toBeDefined();
    expect(screen.getByText('Docker')).toBeDefined();
    expect(screen.getByText('Figma')).toBeDefined();
  });

  it('renders category description', () => {
    render(
      <SkillCategory
        title="Backend"
        description="Server-side technologies and databases"
        items={['Node.js', 'Python', 'SQL']}
      />
    );
    expect(screen.getByText('Server-side technologies and databases')).toBeDefined();
  });

  it('handles empty items array', () => {
    render(
      <SkillCategory
        title="Empty Category"
        description="No skills available"
        items={[]}
      />
    );
    expect(screen.getByText('Empty Category')).toBeDefined();
    expect(screen.getByText('No skills available')).toBeDefined();
  });
});
