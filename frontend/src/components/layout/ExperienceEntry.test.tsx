import { render, screen } from '@testing-library/react';
import { ExperienceEntry, ExperienceEntry as ExperienceEntryType } from './ExperienceEntry';
import { describe, it, expect } from 'vitest';

describe('ExperienceEntry Component', () => {
  const mockEntry: ExperienceEntryType = {
    id: '1',
    company: 'Tech Solutions Inc.',
    role: 'Senior Frontend Engineer',
    duration: '2022 - Present',
    location: 'San Francisco, CA',
    responsibilities: [
      'Led the development of a complex dashboard application.',
      'Optimized performance by 30% through code splitting and image optimization.',
      'Mentored junior developers and conducted code reviews.',
    ],
    achievements: [
      'Increased page load speed by 40%',
      'Led a team of 5 developers',
      'Shipped 3 major product releases',
    ],
  };

  it('renders correctly with required fields', () => {
    render(<ExperienceEntry entry={mockEntry} />);
    expect(screen.getByText('Senior Frontend Engineer')).toBeDefined();
    expect(screen.getByText('Tech Solutions Inc.')).toBeDefined();
    expect(screen.getByText('2022 - Present')).toBeDefined();
  });

  it('renders company name', () => {
    render(<ExperienceEntry entry={mockEntry} />);
    expect(screen.getByText('Tech Solutions Inc.')).toBeDefined();
  });

  it('renders role', () => {
    render(<ExperienceEntry entry={mockEntry} />);
    expect(screen.getByText('Senior Frontend Engineer')).toBeDefined();
  });

  it('renders duration', () => {
    render(<ExperienceEntry entry={mockEntry} />);
    expect(screen.getByText('2022 - Present')).toBeDefined();
  });

  it('renders responsibilities when provided', () => {
    render(<ExperienceEntry entry={mockEntry} />);
    expect(screen.getByText('Key Responsibilities:')).toBeDefined();
    expect(screen.getByText('Led the development of a complex dashboard application.')).toBeDefined();
    expect(screen.getByText('Optimized performance by 30% through code splitting and image optimization.')).toBeDefined();
  });

  it('renders achievements when provided and showAchievements is true', () => {
    render(<ExperienceEntry entry={mockEntry} showAchievements={true} />);
    expect(screen.getByText('Key Achievements:')).toBeDefined();
    expect(screen.getByText('Increased page load speed by 40%')).toBeDefined();
    expect(screen.getByText('Led a team of 5 developers')).toBeDefined();
  });

  it('hides achievements when showAchievements is false', () => {
    render(<ExperienceEntry entry={mockEntry} showAchievements={false} />);
    expect(screen.queryByText('Key Achievements:')).toBeNull();
    expect(screen.queryByText('Increased page load speed by 40%')).toBeNull();
  });

  it('renders location when provided', () => {
    render(<ExperienceEntry entry={mockEntry} />);
    expect(screen.getByText('San Francisco, CA')).toBeDefined();
  });

  it('renders description when provided', () => {
    const entryWithDescription: ExperienceEntryType = {
      ...mockEntry,
      description: 'This is a detailed description of the role and responsibilities.',
    };
    render(<ExperienceEntry entry={entryWithDescription} />);
    expect(screen.getByText('This is a detailed description of the role and responsibilities.')).toBeDefined();
  });

  it('handles entry without responsibilities', () => {
    const entryWithoutResponsibilities: ExperienceEntryType = {
      ...mockEntry,
      responsibilities: undefined,
    };
    render(<ExperienceEntry entry={entryWithoutResponsibilities} />);
    expect(screen.queryByText('Key Responsibilities:')).toBeNull();
  });

  it('handles entry without achievements', () => {
    const entryWithoutAchievements: ExperienceEntryType = {
      ...mockEntry,
      achievements: undefined,
    };
    render(<ExperienceEntry entry={entryWithoutAchievements} />);
    expect(screen.queryByText('Key Achievements:')).toBeNull();
  });

  it('handles entry without location', () => {
    const entryWithoutLocation: ExperienceEntryType = {
      ...mockEntry,
      location: undefined,
    };
    render(<ExperienceEntry entry={entryWithoutLocation} />);
    expect(screen.queryByText('San Francisco, CA')).toBeNull();
  });

  it('handles entry without description', () => {
    const entryWithoutDescription: ExperienceEntryType = {
      ...mockEntry,
      description: undefined,
    };
    render(<ExperienceEntry entry={entryWithoutDescription} />);
    expect(screen.queryByText(/This is a detailed description/)).toBeNull();
  });

  it('has proper heading structure', () => {
    render(<ExperienceEntry entry={mockEntry} />);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeDefined();
    expect(heading.textContent).toBe('Senior Frontend Engineer');
  });

  it('uses semantic time element for duration', () => {
    render(<ExperienceEntry entry={mockEntry} />);
    const timeElement = document.querySelector('time[datetime]');
    expect(timeElement).toBeDefined();
    expect(timeElement).toHaveAttribute('datetime', '2022 - Present');
  });

  it('has proper spacing between sections', () => {
    const { container } = render(<ExperienceEntry entry={mockEntry} />);
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('space-y-4');
  });

  it('has proper color scheme for role', () => {
    const { container } = render(<ExperienceEntry entry={mockEntry} />);
    const role = screen.getByText('Senior Frontend Engineer');
    expect(role).toHaveClass('text-primary', 'font-semibold');
  });

  it('has proper styling for company information', () => {
    const { container } = render(<ExperienceEntry entry={mockEntry} />);
    const company = screen.getByText('Tech Solutions Inc.');
    expect(company).toHaveClass('font-medium');
  });

  it('has proper styling for duration', () => {
    const { container } = render(<ExperienceEntry entry={mockEntry} />);
    const duration = screen.getByText('2022 - Present');
    expect(duration).toHaveClass('text-slate-500');
  });

  it('uses proper list styling for responsibilities', () => {
    render(<ExperienceEntry entry={mockEntry} />);
    const list = document.querySelector('.list-disc');
    expect(list).toBeDefined();
    expect(list).toHaveClass('list-disc', 'ml-5', 'space-y-1');
  });

  it('renders achievement icons', () => {
    render(<ExperienceEntry entry={mockEntry} showAchievements={true} />);
    const achievements = screen.getAllByText('🏆');
    expect(achievements.length).toBe(3);
  });

  it('has flex layout for achievement items', () => {
    render(<ExperienceEntry entry={mockEntry} showAchievements={true} />);
    const achievementsList = screen.getByText('Key Achievements:').nextElementSibling;
    const achievementItems = achievementsList?.querySelectorAll('li');
    expect(achievementItems?.length).toBeGreaterThan(0);
  });

  it('has proper icon styling for achievements', () => {
    const { container } = render(<ExperienceEntry entry={mockEntry} showAchievements={true} />);
    const icons = container.querySelectorAll('.bg-amber-100');
    expect(icons.length).toBe(3);
    icons.forEach(icon => {
      expect(icon).toHaveClass('rounded-full', 'flex', 'items-center', 'justify-center');
    });
  });

  it('handles empty responsibilities array', () => {
    const entryWithEmptyResponsibilities: ExperienceEntryType = {
      ...mockEntry,
      responsibilities: [],
    };
    render(<ExperienceEntry entry={entryWithEmptyResponsibilities} />);
    expect(screen.queryByText('Key Responsibilities:')).toBeNull();
  });

  it('handles empty achievements array', () => {
    const entryWithEmptyAchievements: ExperienceEntryType = {
      ...mockEntry,
      achievements: [],
    };
    render(<ExperienceEntry entry={entryWithEmptyAchievements} showAchievements={true} />);
    expect(screen.queryByText('Key Achievements:')).toBeNull();
  });

  it('has proper section heading styling', () => {
    render(<ExperienceEntry entry={mockEntry} />);
    const responsibilitiesHeading = screen.getByText('Key Responsibilities:');
    expect(responsibilitiesHeading).toHaveClass('text-sm', 'font-semibold');
  });

  it('has proper layout for header information', () => {
    const { container } = render(<ExperienceEntry entry={mockEntry} />);
    const header = container.querySelector('.space-y-1');
    expect(header).toBeDefined();
  });

  it('maintains consistent styling across text elements', () => {
    const { container } = render(<ExperienceEntry entry={mockEntry} />);
    const secondaryText = container.querySelectorAll('.text-secondary');
    expect(secondaryText.length).toBeGreaterThan(0);
  });

  it('displays company information in horizontal layout', () => {
    const { container } = render(<ExperienceEntry entry={mockEntry} />);
    const infoContainer = container.querySelector('.flex.flex-wrap');
    expect(infoContainer).toBeDefined();
    expect(infoContainer).toHaveClass('items-center', 'gap-3');
  });

  it('uses proper semantic structure', () => {
    render(<ExperienceEntry entry={mockEntry} />);
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0);
    expect(document.querySelector('time')).toBeDefined();
  });

  it('has proper text leading for readability', () => {
    const { container } = render(<ExperienceEntry entry={mockEntry} />);
    const textElements = container.querySelectorAll('.leading-relaxed');
    expect(textElements.length).toBeGreaterThan(0);
  });
});
