import { render, screen } from '@testing-library/react';
import { ResumeOverview, ResumeOverviewData } from './ResumeOverview';
import { describe, it, expect } from 'vitest';

describe('ResumeOverview Component', () => {
  const mockData: ResumeOverviewData = {
    professionalSummary: 'Experienced full-stack developer with 5+ years of expertise in building scalable web applications. Passionate about clean code, performance optimization, and creating exceptional user experiences.',
    experienceSummary: 'Worked with leading tech companies to deliver high-impact projects. Specialized in React ecosystem, cloud architecture, and agile development methodologies.',
    skillsSummary: 'Proficient in JavaScript, TypeScript, React, Node.js, Python, AWS, and modern web development frameworks. Strong background in database design and API development.',
    yearsOfExperience: 5,
    totalProjects: 25,
    languages: ['JavaScript', 'Python', 'TypeScript'],
  };

  it('renders professional summary', () => {
    render(<ResumeOverview data={mockData} />);
    expect(screen.getByText('Professional Summary')).toBeDefined();
    expect(screen.getByText(/Experienced full-stack developer/)).toBeDefined();
  });

  it('renders experience summary', () => {
    render(<ResumeOverview data={mockData} />);
    expect(screen.getByText('Experience Summary')).toBeDefined();
    expect(screen.getByText(/Worked with leading tech companies/)).toBeDefined();
  });

  it('renders skills summary', () => {
    render(<ResumeOverview data={mockData} />);
    expect(screen.getByText('Skills Summary')).toBeDefined();
    expect(screen.getByText(/Proficient in JavaScript/)).toBeDefined();
  });

  it('renders resume preview area by default', () => {
    render(<ResumeOverview data={mockData} />);
    const downloadButton = screen.getByLabelText('Download resume PDF');
    const viewButton = screen.getByLabelText('View resume in new tab');
    expect(downloadButton).toBeDefined();
    expect(viewButton).toBeDefined();
  });

  it('renders years of experience stat', () => {
    render(<ResumeOverview data={mockData} />);
    expect(screen.getByText('5')).toBeDefined();
    expect(screen.getByText('Years Experience')).toBeDefined();
  });

  it('renders total projects stat', () => {
    render(<ResumeOverview data={mockData} />);
    expect(screen.getByText('25')).toBeDefined();
    expect(screen.getByText('Projects Completed')).toBeDefined();
  });

  it('renders languages count', () => {
    render(<ResumeOverview data={mockData} />);
    expect(screen.getByText('3')).toBeDefined();
    expect(screen.getByText('Languages')).toBeDefined();
  });

  it('renders technologies stat', () => {
    render(<ResumeOverview data={mockData} />);
    expect(screen.getByText('50+')).toBeDefined();
    expect(screen.getByText('Technologies')).toBeDefined();
  });

  it('hides resume preview when showPreview is false', () => {
    render(<ResumeOverview data={mockData} showPreview={false} />);
    expect(screen.queryByLabelText('Download resume PDF')).toBeNull();
    expect(screen.queryByLabelText('View resume in new tab')).toBeNull();
  });

  it('uses custom resumeUrl when provided', () => {
    render(<ResumeOverview data={mockData} resumeUrl="/custom-resume.pdf" />);
    const downloadLink = screen.getByLabelText('Download resume PDF');
    expect(downloadLink).toHaveAttribute('href', '/custom-resume.pdf');
  });

  it('has proper heading structure', () => {
    render(<ResumeOverview data={mockData} />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThanOrEqual(3);
  });

  it('has proper spacing between sections', () => {
    const { container } = render(<ResumeOverview data={mockData} />);
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('space-y-8');
  });

  it('has proper stat card styling', () => {
    const { container } = render(<ResumeOverview data={mockData} />);
    const statCards = container.querySelectorAll('.bg-slate-50');
    expect(statCards.length).toBeGreaterThanOrEqual(4);
  });

  it('has proper download button styling', () => {
    const { container } = render(<ResumeOverview data={mockData} />);
    const downloadButton = screen.getByLabelText('Download resume PDF');
    expect(downloadButton).toHaveClass('bg-primary', 'text-white', 'rounded-lg');
  });

  it('has proper view button styling', () => {
    const { container } = render(<ResumeOverview data={mockData} />);
    const viewButton = screen.getByLabelText('View resume in new tab');
    expect(viewButton).toHaveClass('bg-white', 'border', 'text-secondary', 'rounded-lg');
  });

  it('has proper external link security', () => {
    render(<ResumeOverview data={mockData} />);
    const viewButton = screen.getByLabelText('View resume in new tab');
    expect(viewButton).toHaveAttribute('target', '_blank');
    expect(viewButton).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has proper grid layout for stats', () => {
    const { container } = render(<ResumeOverview data={mockData} />);
    const statsGrid = container.querySelector('.grid-cols-2');
    expect(statsGrid).toBeDefined();
    expect(statsGrid).toHaveClass('sm:grid-cols-4', 'gap-4');
  });

  it('has proper resume preview area styling', () => {
    const { container } = render(<ResumeOverview data={mockData} />);
    const previewArea = container.querySelector('.bg-slate-50.rounded-xl');
    expect(previewArea).toHaveClass('border', 'p-6');
  });

  it('handles data without yearsOfExperience', () => {
    const dataWithoutYears = { ...mockData, yearsOfExperience: undefined };
    render(<ResumeOverview data={dataWithoutYears} />);
    expect(screen.queryByText('Years Experience')).toBeNull();
  });

  it('handles data without totalProjects', () => {
    const dataWithoutProjects = { ...mockData, totalProjects: undefined };
    render(<ResumeOverview data={dataWithoutProjects} />);
    expect(screen.queryByText('Projects Completed')).toBeNull();
  });

  it('handles data without languages', () => {
    const dataWithoutLanguages = { ...mockData, languages: undefined };
    render(<ResumeOverview data={dataWithoutLanguages} />);
    expect(screen.queryByText('Languages')).toBeNull();
  });

  it('handles empty languages array', () => {
    const dataWithEmptyLanguages = { ...mockData, languages: [] };
    render(<ResumeOverview data={dataWithEmptyLanguages} />);
    expect(screen.queryByText('Languages')).toBeNull();
  });

  it('has proper stat card layout', () => {
    const { container } = render(<ResumeOverview data={mockData} />);
    const statCards = container.querySelectorAll('.grid .bg-slate-50');
    expect(statCards.length).toBeGreaterThanOrEqual(4);
    statCards.forEach(card => {
      expect(card).toHaveClass('rounded-lg', 'border', 'p-4');
    });
  });

  it('has proper stat number styling', () => {
    const { container } = render(<ResumeOverview data={mockData} />);
    const statNumbers = container.querySelectorAll('.text-3xl.font-bold');
    expect(statNumbers.length).toBeGreaterThanOrEqual(4);
    statNumbers.forEach(number => {
      expect(number).toHaveClass('text-primary');
    });
  });

  it('has proper stat label styling', () => {
    const { container } = render(<ResumeOverview data={mockData} />);
    const statLabels = container.querySelectorAll('.text-sm');
    expect(statLabels.length).toBeGreaterThanOrEqual(4);
    statLabels.forEach(label => {
      expect(label).toHaveClass('text-secondary');
    });
  });

  it('has proper text leading for readability', () => {
    const { container } = render(<ResumeOverview data={mockData} />);
    const textElements = container.querySelectorAll('.leading-relaxed');
    expect(textElements.length).toBe(3);
  });

  it('has proper button icon styling', () => {
    const { container } = render(<ResumeOverview data={mockData} />);
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBe(2);
  });

  it('has proper flex layout for buttons', () => {
    const { container } = render(<ResumeOverview data={mockData} />);
    const buttonContainer = container.querySelector('.flex.flex-wrap');
    expect(buttonContainer).toHaveClass('gap-4');
  });

  it('maintains consistent color scheme', () => {
    const { container } = render(<ResumeOverview data={mockData} />);
    const primaryText = container.querySelectorAll('.text-primary');
    expect(primaryText.length).toBeGreaterThan(0);
    const secondaryText = container.querySelectorAll('.text-secondary');
    expect(secondaryText.length).toBeGreaterThan(0);
  });

  it('has proper responsive grid breakpoints', () => {
    const { container } = render(<ResumeOverview data={mockData} />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-2', 'sm:grid-cols-4');
  });

  it('has proper spacing in stats grid', () => {
    const { container } = render(<ResumeOverview data={mockData} />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('gap-4');
  });
});
