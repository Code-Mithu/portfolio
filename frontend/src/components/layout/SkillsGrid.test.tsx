import { render, screen } from '@testing-library/react';
import { SkillsGrid } from './SkillsGrid';
import { describe, it, expect } from 'vitest';

describe('SkillsGrid Component', () => {
  const mockSkills = [
    {
      category: 'Frontend',
      description: 'Modern frontend technologies',
      items: ['React', 'Next.js', 'TypeScript']
    },
    {
      category: 'Backend',
      description: 'Server-side technologies',
      items: ['Node.js', 'Python', 'SQL']
    },
    {
      category: 'Tools',
      description: 'Development tools',
      items: ['Git', 'Docker', 'Figma']
    }
  ];

  it('renders correctly with default props', () => {
    render(<SkillsGrid skills={mockSkills} />);
    expect(screen.getByText('Frontend')).toBeDefined();
    expect(screen.getByText('Backend')).toBeDefined();
    expect(screen.getByText('Tools')).toBeDefined();
  });

  it('renders all skill categories', () => {
    render(<SkillsGrid skills={mockSkills} />);
    expect(screen.getByText('Modern frontend technologies')).toBeDefined();
    expect(screen.getByText('Server-side technologies')).toBeDefined();
    expect(screen.getByText('Development tools')).toBeDefined();
  });

  it('renders skill items within categories', () => {
    render(<SkillsGrid skills={mockSkills} />);
    expect(screen.getByText('React')).toBeDefined();
    expect(screen.getByText('Node.js')).toBeDefined();
    expect(screen.getByText('Git')).toBeDefined();
  });

  it('applies default grid columns (1 mobile, 2 tablet, 3 desktop)', () => {
    const { container } = render(<SkillsGrid skills={mockSkills} />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });

  it('applies custom grid columns when provided', () => {
    const { container } = render(
      <SkillsGrid 
        skills={mockSkills} 
        columns={{ mobile: 1, tablet: 1, desktop: 2 }}
      />
    );
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-1', 'lg:grid-cols-2');
  });

  it('applies default gap spacing', () => {
    const { container } = render(<SkillsGrid skills={mockSkills} />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('gap-8');
  });

  it('applies custom gap spacing when provided', () => {
    const { container } = render(
      <SkillsGrid skills={mockSkills} gap="gap-6" />
    );
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('gap-6');
  });

  it('handles single skill category', () => {
    const singleSkill = [mockSkills[0]];
    render(<SkillsGrid skills={singleSkill} />);
    expect(screen.getByText('Frontend')).toBeDefined();
    expect(screen.queryByText('Backend')).toBeNull();
  });

  it('handles empty skills array gracefully', () => {
    const { container } = render(<SkillsGrid skills={[]} />);
    const grid = container.querySelector('.grid');
    expect(grid).toBeEmptyDOMElement();
  });

  it('maintains consistent spacing between grid items', () => {
    const { container } = render(<SkillsGrid skills={mockSkills} />);
    const gridItems = container.querySelectorAll('.grid > div');
    expect(gridItems.length).toBe(3);
    
    gridItems.forEach(item => {
      expect(item).toHaveClass('bg-slate-50');
    });
  });

  it('renders responsive grid structure for mobile', () => {
    const { container } = render(<SkillsGrid skills={mockSkills} />);
    const grid = container.querySelector('.grid');
    // Mobile first - should have single column
    expect(grid).toHaveClass('grid-cols-1');
  });

  it('renders responsive grid structure for tablet', () => {
    const { container } = render(<SkillsGrid skills={mockSkills} />);
    const grid = container.querySelector('.grid');
    // Tablet breakpoint - should have 2 columns
    expect(grid).toHaveClass('md:grid-cols-2');
  });

  it('renders responsive grid structure for desktop', () => {
    const { container } = render(<SkillsGrid skills={mockSkills} />);
    const grid = container.querySelector('.grid');
    // Desktop breakpoint - should have 3 columns
    expect(grid).toHaveClass('lg:grid-cols-3');
  });
});
