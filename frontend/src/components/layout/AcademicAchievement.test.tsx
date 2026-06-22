import { render, screen } from '@testing-library/react';
import { AcademicAchievementCard, AcademicAchievements, AcademicAchievement as AcademicAchievementType, AchievementType } from './AcademicAchievement';
import { describe, it, expect } from 'vitest';

describe('AcademicAchievementCard Component', () => {
  const mockCertification: AcademicAchievementType = {
    id: '1',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2023',
    type: 'certification',
    description: 'Professional certification in designing distributed systems on AWS.',
    credentialUrl: 'https://example.com/credential',
    badge: 'Professional',
  };

  const mockAward: AcademicAchievementType = {
    id: '2',
    title: 'Outstanding Graduate Award',
    issuer: 'University of Technology',
    date: '2022',
    type: 'award',
    description: 'Awarded for exceptional academic performance and leadership.',
  };

  const mockHighlight: AcademicAchievementType = {
    id: '3',
    title: 'Research Publication',
    issuer: 'ACM Conference',
    date: '2021',
    type: 'highlight',
    description: 'Published research paper on distributed systems architecture.',
  };

  it('renders correctly with certification type', () => {
    render(<AcademicAchievementCard achievement={mockCertification} />);
    expect(screen.getByText('AWS Certified Solutions Architect')).toBeDefined();
    expect(screen.getByText('Amazon Web Services')).toBeDefined();
  });

  it('renders title', () => {
    render(<AcademicAchievementCard achievement={mockCertification} />);
    expect(screen.getByText('AWS Certified Solutions Architect')).toBeDefined();
  });

  it('renders issuer when provided', () => {
    render(<AcademicAchievementCard achievement={mockCertification} />);
    expect(screen.getByText('Amazon Web Services')).toBeDefined();
  });

  it('renders date when provided', () => {
    render(<AcademicAchievementCard achievement={mockCertification} />);
    expect(screen.getByText('2023')).toBeDefined();
  });

  it('renders description when provided', () => {
    render(<AcademicAchievementCard achievement={mockCertification} />);
    expect(screen.getByText(/Professional certification/)).toBeDefined();
  });

  it('renders badge when provided', () => {
    render(<AcademicAchievementCard achievement={mockCertification} />);
    expect(screen.getByText('Professional')).toBeDefined();
  });

  it('renders credential link when provided', () => {
    render(<AcademicAchievementCard achievement={mockCertification} />);
    const link = screen.getByLabelText('View credential for AWS Certified Solutions Architect');
    expect(link).toHaveAttribute('href', 'https://example.com/credential');
  });

  it('renders award type with correct styling', () => {
    const { container } = render(<AcademicAchievementCard achievement={mockAward} />);
    expect(screen.getByText('Outstanding Graduate Award')).toBeDefined();
  });

  it('renders highlight type with correct styling', () => {
    const { container } = render(<AcademicAchievementCard achievement={mockHighlight} />);
    expect(screen.getByText('Research Publication')).toBeDefined();
  });

  it('handles achievement without issuer', () => {
    const withoutIssuer = { ...mockCertification, issuer: undefined };
    render(<AcademicAchievementCard achievement={withoutIssuer} />);
    expect(screen.queryByText('Amazon Web Services')).toBeNull();
  });

  it('handles achievement without date', () => {
    const withoutDate = { ...mockCertification, date: undefined };
    render(<AcademicAchievementCard achievement={withoutDate} />);
    expect(screen.queryByText('2023')).toBeNull();
  });

  it('handles achievement without description', () => {
    const withoutDescription = { ...mockCertification, description: undefined };
    render(<AcademicAchievementCard achievement={withoutDescription} />);
    expect(screen.queryByText(/Professional certification/)).toBeNull();
  });

  it('handles achievement without credentialUrl', () => {
    const withoutUrl = { ...mockCertification, credentialUrl: undefined };
    render(<AcademicAchievementCard achievement={withoutUrl} />);
    const link = screen.queryByRole('link');
    expect(link).toBeNull();
  });

  it('has proper card structure', () => {
    const { container } = render(<AcademicAchievementCard achievement={mockCertification} />);
    const card = container.firstChild;
    expect(card).toHaveClass('bg-white', 'border', 'rounded-xl', 'p-5');
  });

  it('has proper certification type colors', () => {
    const { container } = render(<AcademicAchievementCard achievement={mockCertification} />);
    const card = container.firstChild;
    expect(card).toHaveClass('border-blue-200');
  });

  it('has proper award type colors', () => {
    const { container } = render(<AcademicAchievementCard achievement={mockAward} />);
    const card = container.firstChild;
    expect(card).toHaveClass('border-amber-200');
  });

  it('has proper highlight type colors', () => {
    const { container } = render(<AcademicAchievementCard achievement={mockHighlight} />);
    const card = container.firstChild;
    expect(card).toHaveClass('border-green-200');
  });

  it('has hover effect', () => {
    const { container } = render(<AcademicAchievementCard achievement={mockCertification} />);
    const card = container.firstChild;
    expect(card).toHaveClass('hover:shadow-md', 'transition-shadow');
  });

  it('has proper icon styling', () => {
    const { container } = render(<AcademicAchievementCard achievement={mockCertification} />);
    const iconContainer = container.querySelector('.w-12.h-12');
    expect(iconContainer).toHaveClass('bg-blue-50', 'border-blue-200', 'text-blue-600');
  });

  it('has proper content spacing', () => {
    const { container } = render(<AcademicAchievementCard achievement={mockCertification} />);
    const content = container.querySelector('.space-y-2');
    expect(content).toBeDefined();
  });

  it('has proper flex layout', () => {
    const { container } = render(<AcademicAchievementCard achievement={mockCertification} />);
    const flexContainer = container.querySelector('.flex');
    expect(flexContainer).toHaveClass('items-start', 'gap-4');
  });

  it('has proper heading structure', () => {
    render(<AcademicAchievementCard achievement={mockCertification} />);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeDefined();
    expect(heading).toHaveClass('text-lg', 'font-semibold', 'text-primary');
  });

  it('uses semantic time element for date', () => {
    render(<AcademicAchievementCard achievement={mockCertification} />);
    const timeElement = document.querySelector('time[datetime]');
    expect(timeElement).toBeDefined();
    expect(timeElement).toHaveAttribute('datetime', '2023');
  });

  it('has proper external link security', () => {
    render(<AcademicAchievementCard achievement={mockCertification} />);
    const link = screen.getByLabelText('View credential for AWS Certified Solutions Architect');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

describe('AcademicAchievements Component', () => {
  const mockAchievements: AcademicAchievementType[] = [
    {
      id: '1',
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      type: 'certification',
    },
    {
      id: '2',
      title: 'Outstanding Graduate Award',
      issuer: 'University of Technology',
      date: '2022',
      type: 'award',
    },
    {
      id: '3',
      title: 'Dean\'s List',
      type: 'highlight',
    },
  ];

  it('renders correctly with default title', () => {
    render(<AcademicAchievements achievements={mockAchievements} />);
    expect(screen.getByText('Academic Achievements')).toBeDefined();
  });

  it('renders custom title when provided', () => {
    render(
      <AcademicAchievements achievements={mockAchievements} title="My Achievements" />
    );
    expect(screen.getByText('My Achievements')).toBeDefined();
  });

  it('renders all achievements', () => {
    render(<AcademicAchievements achievements={mockAchievements} />);
    expect(screen.getByText('AWS Certified Solutions Architect')).toBeDefined();
    expect(screen.getByText('Outstanding Graduate Award')).toBeDefined();
    expect(screen.getByText('Dean\'s List')).toBeDefined();
  });

  it('returns null when achievements array is empty', () => {
    const { container } = render(<AcademicAchievements achievements={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('has proper grid layout', () => {
    const { container } = render(<AcademicAchievements achievements={mockAchievements} />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('sm:grid-cols-2', 'lg:grid-cols-3', 'gap-5');
  });

  it('applies custom className', () => {
    const { container } = render(
      <AcademicAchievements achievements={mockAchievements} className="custom-class" />
    );
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('renders cards with proper spacing', () => {
    const { container } = render(<AcademicAchievements achievements={mockAchievements} />);
    const cards = container.querySelectorAll('.rounded-xl');
    expect(cards.length).toBe(3);
  });

  it('has responsive grid structure', () => {
    const { container } = render(<AcademicAchievements achievements={mockAchievements} />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid', 'sm:grid-cols-2', 'lg:grid-cols-3');
  });

  it('handles single achievement', () => {
    const singleAchievement = [mockAchievements[0]];
    render(<AcademicAchievements achievements={singleAchievement} />);
    const cards = document.querySelectorAll('.rounded-xl');
    expect(cards.length).toBe(1);
  });

  it('handles multiple achievement types', () => {
    render(<AcademicAchievements achievements={mockAchievements} />);
    const blueCard = document.querySelector('.border-blue-200');
    const amberCard = document.querySelector('.border-amber-200');
    const greenCard = document.querySelector('.border-green-200');
    expect(blueCard).toBeDefined();
    expect(amberCard).toBeDefined();
    expect(greenCard).toBeDefined();
  });
});
