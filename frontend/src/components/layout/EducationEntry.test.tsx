import { render, screen } from '@testing-library/react';
import { EducationEntry, EducationEntry as EducationEntryType } from './EducationEntry';
import { describe, it, expect } from 'vitest';

describe('EducationEntry Component', () => {
  const mockEntry: EducationEntryType = {
    id: '1',
    institution: 'University of Technology',
    degree: 'Master of Science in Software Engineering',
    duration: '2020 - 2022',
    location: 'San Francisco, CA',
    gpa: '3.9/4.0',
    description: 'Advanced study in software engineering principles and practices.',
    honors: [
      'Dean\'s List - All Semesters',
      'Outstanding Graduate Award',
      'Published Research Paper',
    ],
  };

  it('renders correctly with required fields', () => {
    render(<EducationEntry entry={mockEntry} />);
    expect(screen.getByText('Master of Science in Software Engineering')).toBeDefined();
    expect(screen.getByText('University of Technology')).toBeDefined();
    expect(screen.getByText('2020 - 2022')).toBeDefined();
  });

  it('renders institution name', () => {
    render(<EducationEntry entry={mockEntry} />);
    expect(screen.getByText('University of Technology')).toBeDefined();
  });

  it('renders degree name', () => {
    render(<EducationEntry entry={mockEntry} />);
    expect(screen.getByText('Master of Science in Software Engineering')).toBeDefined();
  });

  it('renders study period', () => {
    render(<EducationEntry entry={mockEntry} />);
    expect(screen.getByText('2020 - 2022')).toBeDefined();
  });

  it('renders GPA when provided', () => {
    render(<EducationEntry entry={mockEntry} />);
    expect(screen.getByText('GPA: 3.9/4.0')).toBeDefined();
  });

  it('renders honors when provided', () => {
    render(<EducationEntry entry={mockEntry} />);
    expect(screen.getByText('Honors & Achievements:')).toBeDefined();
    expect(screen.getByText('Dean\'s List - All Semesters')).toBeDefined();
    expect(screen.getByText('Outstanding Graduate Award')).toBeDefined();
  });

  it('renders location when provided', () => {
    render(<EducationEntry entry={mockEntry} />);
    expect(screen.getByText('San Francisco, CA')).toBeDefined();
  });

  it('renders description when provided', () => {
    render(<EducationEntry entry={mockEntry} />);
    expect(screen.getByText('Advanced study in software engineering principles and practices.')).toBeDefined();
  });

  it('handles entry without GPA', () => {
    const entryWithoutGPA: EducationEntryType = {
      ...mockEntry,
      gpa: undefined,
    };
    render(<EducationEntry entry={entryWithoutGPA} />);
    expect(screen.queryByText('GPA: 3.9/4.0')).toBeNull();
  });

  it('handles entry without honors', () => {
    const entryWithoutHonors: EducationEntryType = {
      ...mockEntry,
      honors: undefined,
    };
    render(<EducationEntry entry={entryWithoutHonors} />);
    expect(screen.queryByText('Honors & Achievements:')).toBeNull();
  });

  it('handles entry without location', () => {
    const entryWithoutLocation: EducationEntryType = {
      ...mockEntry,
      location: undefined,
    };
    render(<EducationEntry entry={entryWithoutLocation} />);
    expect(screen.queryByText('San Francisco, CA')).toBeNull();
  });

  it('handles entry without description', () => {
    const entryWithoutDescription: EducationEntryType = {
      ...mockEntry,
      description: undefined,
    };
    render(<EducationEntry entry={entryWithoutDescription} />);
    expect(screen.queryByText(/Advanced study/)).toBeNull();
  });

  it('has proper heading structure', () => {
    render(<EducationEntry entry={mockEntry} />);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeDefined();
    expect(heading.textContent).toBe('Master of Science in Software Engineering');
  });

  it('uses semantic time element for study period', () => {
    render(<EducationEntry entry={mockEntry} />);
    const timeElement = document.querySelector('time[datetime]');
    expect(timeElement).toBeDefined();
    expect(timeElement).toHaveAttribute('datetime', '2020 - 2022');
  });

  it('has proper spacing between sections', () => {
    const { container } = render(<EducationEntry entry={mockEntry} />);
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('space-y-3');
  });

  it('has proper color scheme for degree', () => {
    const { container } = render(<EducationEntry entry={mockEntry} />);
    const degree = screen.getByText('Master of Science in Software Engineering');
    expect(degree).toHaveClass('text-primary', 'font-semibold');
  });

  it('has proper styling for institution information', () => {
    const { container } = render(<EducationEntry entry={mockEntry} />);
    const institution = screen.getByText('University of Technology');
    expect(institution).toHaveClass('font-medium');
  });

  it('has proper styling for study period', () => {
    const { container } = render(<EducationEntry entry={mockEntry} />);
    const duration = screen.getByText('2020 - 2022');
    expect(duration).toHaveClass('text-slate-500');
  });

  it('has proper GPA badge styling', () => {
    render(<EducationEntry entry={mockEntry} />);
    const gpaBadge = screen.getByText('GPA: 3.9/4.0');
    expect(gpaBadge).toHaveClass('bg-blue-50', 'text-blue-700', 'rounded-full');
  });

  it('renders honor icons', () => {
    render(<EducationEntry entry={mockEntry} />);
    const honors = screen.getAllByText('⭐');
    expect(honors.length).toBe(3);
  });

  it('has flex layout for honor items', () => {
    render(<EducationEntry entry={mockEntry} />);
    const honorsList = screen.getByText('Honors & Achievements:').nextElementSibling;
    const honorItems = honorsList?.querySelectorAll('li');
    expect(honorItems?.length).toBeGreaterThan(0);
  });

  it('has proper icon styling for honors', () => {
    const { container } = render(<EducationEntry entry={mockEntry} />);
    const icons = container.querySelectorAll('.bg-purple-100');
    expect(icons.length).toBe(3);
    icons.forEach(icon => {
      expect(icon).toHaveClass('rounded-full', 'flex', 'items-center', 'justify-center');
    });
  });

  it('handles empty honors array', () => {
    const entryWithEmptyHonors: EducationEntryType = {
      ...mockEntry,
      honors: [],
    };
    render(<EducationEntry entry={entryWithEmptyHonors} />);
    expect(screen.queryByText('Honors & Achievements:')).toBeNull();
  });

  it('has proper section heading styling', () => {
    render(<EducationEntry entry={mockEntry} />);
    const honorsHeading = screen.getByText('Honors & Achievements:');
    expect(honorsHeading).toHaveClass('text-sm', 'font-semibold');
  });

  it('has proper layout for header information', () => {
    const { container } = render(<EducationEntry entry={mockEntry} />);
    const header = container.querySelector('.space-y-1');
    expect(header).toBeDefined();
  });

  it('maintains consistent styling across text elements', () => {
    const { container } = render(<EducationEntry entry={mockEntry} />);
    const secondaryText = container.querySelectorAll('.text-secondary');
    expect(secondaryText.length).toBeGreaterThan(0);
  });

  it('displays institution information in horizontal layout', () => {
    const { container } = render(<EducationEntry entry={mockEntry} />);
    const infoContainer = container.querySelector('.flex.flex-wrap');
    expect(infoContainer).toBeDefined();
    expect(infoContainer).toHaveClass('items-center', 'gap-3');
  });

  it('uses proper semantic structure', () => {
    render(<EducationEntry entry={mockEntry} />);
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0);
    expect(document.querySelector('time')).toBeDefined();
  });

  it('has proper text leading for readability', () => {
    const { container } = render(<EducationEntry entry={mockEntry} />);
    const textElements = container.querySelectorAll('.leading-relaxed');
    expect(textElements.length).toBeGreaterThan(0);
  });

  it('GPA badge has proper border styling', () => {
    render(<EducationEntry entry={mockEntry} />);
    const gpaBadge = screen.getByText('GPA: 3.9/4.0');
    expect(gpaBadge).toHaveClass('border', 'border-blue-100');
  });

  it('has proper font weight for institution name', () => {
    const { container } = render(<EducationEntry entry={mockEntry} />);
    const institution = screen.getByText('University of Technology');
    expect(institution).toHaveClass('font-medium');
  });
});
