import { render, screen } from '@testing-library/react';
import { SkillCard } from './SkillCard';
import { describe, it, expect } from 'vitest';
import { Code } from 'lucide-react';

describe('SkillCard Component', () => {
  it('renders correctly with required props', () => {
    render(<SkillCard name="React" level="Advanced" />);
    expect(screen.getByText('React')).toBeDefined();
    expect(screen.getByText('Advanced')).toBeDefined();
  });

  it('renders with icon', () => {
    render(<SkillCard name="TypeScript" level="Expert" icon={Code} />);
    expect(screen.getByText('TypeScript')).toBeDefined();
    // Check for icon container with aria-hidden
    const iconContainer = screen.getByLabelText('TypeScript skill - Expert level').querySelector('[aria-hidden="true"]');
    expect(iconContainer).toBeDefined();
  });

  it('renders with description', () => {
    render(
      <SkillCard 
        name="Python" 
        level="Intermediate" 
        description="General-purpose programming language"
      />
    );
    expect(screen.getByText('Python')).toBeDefined();
    expect(screen.getByText('General-purpose programming language')).toBeDefined();
  });

  it('renders all skill levels correctly', () => {
    const { rerender } = render(<SkillCard name="Test" level="Beginner" />);
    expect(screen.getByText('Beginner')).toBeDefined();

    rerender(<SkillCard name="Test" level="Intermediate" />);
    expect(screen.getByText('Intermediate')).toBeDefined();

    rerender(<SkillCard name="Test" level="Advanced" />);
    expect(screen.getByText('Advanced')).toBeDefined();

    rerender(<SkillCard name="Test" level="Expert" />);
    expect(screen.getByText('Expert')).toBeDefined();
  });

  it('has proper accessibility attributes', () => {
    render(<SkillCard name="JavaScript" level="Advanced" />);
    
    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('aria-label', 'JavaScript skill - Advanced level');
  });

  it('has proper ARIA labels for skill level badge', () => {
    render(<SkillCard name="Node.js" level="Expert" />);
    
    const levelBadge = screen.getByRole('status');
    expect(levelBadge).toHaveAttribute('aria-label', 'Skill level: Expert');
  });

  it('has proper progress bar accessibility', () => {
    render(<SkillCard name="SQL" level="Intermediate" />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    expect(progressBar).toHaveAttribute('aria-label', 'SQL proficiency: Intermediate');
  });

  it('renders correct progress values for each level', () => {
    const { rerender } = render(<SkillCard name="Test" level="Beginner" />);
    let progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '25');

    rerender(<SkillCard name="Test" level="Intermediate" />);
    progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');

    rerender(<SkillCard name="Test" level="Advanced" />);
    progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '75');

    rerender(<SkillCard name="Test" level="Expert" />);
    progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '100');
  });

  it('handles missing icon gracefully', () => {
    render(<SkillCard name="CSS" level="Advanced" />);
    expect(screen.getByText('CSS')).toBeDefined();
    expect(screen.queryByRole('img', { hidden: true })).toBeNull();
  });

  it('applies correct color classes for each level', () => {
    const { rerender } = render(<SkillCard name="Test" level="Beginner" />);
    let levelBadge = screen.getByRole('status');
    expect(levelBadge).toHaveClass('text-xs', 'font-medium', 'px-2', 'py-1', 'rounded', 'border');
    expect(levelBadge.className).toContain('green');

    rerender(<SkillCard name="Test" level="Intermediate" />);
    levelBadge = screen.getByRole('status');
    expect(levelBadge.className).toContain('blue');

    rerender(<SkillCard name="Test" level="Advanced" />);
    levelBadge = screen.getByRole('status');
    expect(levelBadge.className).toContain('purple');

    rerender(<SkillCard name="Test" level="Expert" />);
    levelBadge = screen.getByRole('status');
    expect(levelBadge.className).toContain('amber');
  });

  it('renders with multiple cards for different skills', () => {
    render(
      <div>
        <SkillCard name="React" level="Advanced" icon={Code} />
        <SkillCard name="Performance" level="Intermediate" />
        <SkillCard name="CSS" level="Expert" />
      </div>
    );

    expect(screen.getByText('React')).toBeDefined();
    expect(screen.getByText('Performance')).toBeDefined();
    expect(screen.getByText('CSS')).toBeDefined();
  });
});
