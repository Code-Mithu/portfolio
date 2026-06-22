import { render, screen } from '@testing-library/react';
import { Timeline, TimelineItem } from './Timeline';
import { describe, it, expect } from 'vitest';

describe('Timeline Component', () => {
  const mockItems: TimelineItem[] = [
    {
      id: '1',
      title: 'First Event',
      subtitle: 'Company Name',
      date: '2020 - 2021',
      description: 'This is a description of the first event in the timeline.',
    },
    {
      id: '2',
      title: 'Second Event',
      subtitle: 'Another Company',
      date: '2021 - 2022',
      description: 'This is a description of the second event.',
    },
    {
      id: '3',
      title: 'Third Event',
      subtitle: 'Third Company',
      date: '2022 - Present',
      description: 'This is a description of the third event.',
    },
  ];

  it('renders correctly with default props', () => {
    render(<Timeline items={mockItems} />);
    expect(screen.getByText('First Event')).toBeDefined();
    expect(screen.getByText('Second Event')).toBeDefined();
    expect(screen.getByText('Third Event')).toBeDefined();
  });

  it('renders all timeline items', () => {
    render(<Timeline items={mockItems} />);
    expect(screen.getByText('First Event')).toBeDefined();
    expect(screen.getByText('Company Name')).toBeDefined();
    expect(screen.getByText('2020 - 2021')).toBeDefined();
  });

  it('renders subtitle when provided', () => {
    render(<Timeline items={mockItems} />);
    expect(screen.getByText('Company Name')).toBeDefined();
    expect(screen.getByText('Another Company')).toBeDefined();
  });

  it('renders date when provided', () => {
    render(<Timeline items={mockItems} />);
    expect(screen.getByText('2020 - 2021')).toBeDefined();
    expect(screen.getByText('2021 - 2022')).toBeDefined();
  });

  it('renders description when provided', () => {
    render(<Timeline items={mockItems} />);
    expect(screen.getByText(/This is a description of the first event/)).toBeDefined();
  });

  it('returns null when items array is empty', () => {
    const { container } = render(<Timeline items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('applies default variant styling', () => {
    const { container } = render(<Timeline items={mockItems} />);
    const timeline = container.querySelector('.relative');
    expect(timeline).toHaveClass('ml-3', 'md:ml-6');
  });

  it('applies compact variant styling', () => {
    const { container } = render(
      <Timeline items={mockItems} variant="compact" />
    );
    const timeline = container.querySelector('.relative');
    expect(timeline).toHaveClass('ml-4', 'md:ml-6');
  });

  it('applies detailed variant styling', () => {
    const { container } = render(
      <Timeline items={mockItems} variant="detailed" />
    );
    const timeline = container.querySelector('.relative');
    expect(timeline).toHaveClass('ml-4', 'md:ml-8');
  });

  it('renders timeline line', () => {
    const { container } = render(<Timeline items={mockItems} />);
    const line = container.querySelector('.bg-slate-200');
    expect(line).toBeDefined();
    expect(line).toHaveClass('w-0.5');
  });

  it('renders timeline dots', () => {
    const { container } = render(<Timeline items={mockItems} />);
    const dots = container.querySelectorAll('.border-primary');
    expect(dots.length).toBe(3);
  });

  it('has proper accessibility attributes', () => {
    render(<Timeline items={mockItems} />);
    const timeline = screen.getByRole('list');
    expect(timeline).toHaveAttribute('aria-label', 'Timeline');
  });

  it('uses semantic HTML structure', () => {
    render(<Timeline items={mockItems} />);
    const timeline = screen.getByRole('list');
    expect(timeline).toBeDefined();
    
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(3);
  });

  it('uses time element for dates', () => {
    render(<Timeline items={mockItems} />);
    const timeElements = document.querySelectorAll('time');
    expect(timeElements.length).toBe(3);
  });

  it('has proper responsive layout classes', () => {
    const { container } = render(<Timeline items={mockItems} />);
    const timeline = container.querySelector('.relative');
    expect(timeline).toHaveClass('ml-3', 'md:ml-6');
  });

  it('handles items without subtitle', () => {
    const itemsWithoutSubtitle = mockItems.map(item => ({
      ...item,
      subtitle: undefined,
    }));
    render(<Timeline items={itemsWithoutSubtitle} />);
    expect(screen.queryByText('Company Name')).toBeNull();
  });

  it('handles items without date', () => {
    const itemsWithoutDate = mockItems.map(item => ({
      ...item,
      date: undefined,
    }));
    render(<Timeline items={itemsWithoutDate} />);
    expect(screen.queryByText('2020 - 2021')).toBeNull();
  });

  it('handles items without description', () => {
    const itemsWithoutDescription = mockItems.map(item => ({
      ...item,
      description: undefined,
    }));
    render(<Timeline items={itemsWithoutDescription} />);
    expect(screen.queryByText(/This is a description/)).toBeNull();
  });

  it('handles custom content via React node', () => {
    const itemsWithContent: TimelineItem[] = [
      {
        id: '1',
        title: 'Event with Content',
        content: (
          <div>
            <ul>
              <li>Custom list item 1</li>
              <li>Custom list item 2</li>
            </ul>
          </div>
        ),
      },
    ];
    render(<Timeline items={itemsWithContent} />);
    expect(screen.getByText('Custom list item 1')).toBeDefined();
    expect(screen.getByText('Custom list item 2')).toBeDefined();
  });

  it('has proper spacing between items', () => {
    const { container } = render(<Timeline items={mockItems} />);
    const items = container.querySelectorAll('[role="listitem"]');
    expect(items.length).toBe(3);
    // The spacing is applied to the container, not individual items
    const timeline = container.querySelector('.relative');
    expect(timeline).toHaveClass('space-y-10');
  });

  it('compact variant has smaller spacing', () => {
    const { container } = render(
      <Timeline items={mockItems} variant="compact" />
    );
    const timeline = container.querySelector('.relative');
    expect(timeline).toHaveClass('space-y-4');
  });

  it('detailed variant has larger spacing', () => {
    const { container } = render(
      <Timeline items={mockItems} variant="detailed" />
    );
    const timeline = container.querySelector('.relative');
    expect(timeline).toHaveClass('space-y-12');
  });

  it('has proper z-index for timeline dots', () => {
    const { container } = render(<Timeline items={mockItems} />);
    const dots = container.querySelectorAll('.z-10');
    expect(dots.length).toBe(3);
  });

  it('has proper border styling for timeline dots', () => {
    const { container } = render(<Timeline items={mockItems} />);
    const dots = container.querySelectorAll('.border-primary');
    dots.forEach(dot => {
      expect(dot).toHaveClass('bg-white', 'border-2', 'rounded-full');
    });
  });

  it('handles items with icons', () => {
    const itemsWithIcons: TimelineItem[] = [
      {
        id: '1',
        title: 'Event with Icon',
        icon: <div className="w-2 h-2 bg-primary rounded-full" />,
      },
    ];
    const { container } = render(<Timeline items={itemsWithIcons} />);
    const icon = container.querySelector('.bg-primary.rounded-full');
    expect(icon).toBeDefined();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Timeline items={mockItems} className="custom-class" />
    );
    const timeline = container.querySelector('.relative');
    expect(timeline).toHaveClass('custom-class');
  });

  it('maintains consistent styling across all items', () => {
    const { container } = render(<Timeline items={mockItems} />);
    const titles = container.querySelectorAll('.text-primary');
    titles.forEach(title => {
      expect(title).toHaveClass('font-semibold');
    });
  });

  it('has proper mobile-first responsive layout', () => {
    const { container } = render(<Timeline items={mockItems} />);
    const timeline = container.querySelector('.relative');
    expect(timeline).toHaveClass('ml-3', 'md:ml-6');
  });

  it('detailed variant has larger text elements', () => {
    const { container } = render(
      <Timeline items={mockItems} variant="detailed" />
    );
    const title = container.querySelector('.text-2xl');
    expect(title).toBeDefined();
    expect(title).toHaveClass('font-bold');
  });

  it('compact variant has smaller text elements', () => {
    const { container } = render(
      <Timeline items={mockItems} variant="compact" />
    );
    const title = container.querySelector('.text-lg');
    expect(title).toBeDefined();
    expect(title).toHaveClass('font-semibold');
  });

  it('has proper hierarchy for timeline elements', () => {
    render(<Timeline items={mockItems} />);
    const titles = screen.getAllByRole('heading');
    expect(titles.length).toBe(3);
    titles.forEach(title => {
      expect(title.tagName).toBe('H3');
    });
  });

  it('time elements have proper datetime attribute', () => {
    render(<Timeline items={mockItems} />);
    const timeElements = document.querySelectorAll('time[datetime]');
    expect(timeElements.length).toBe(3);
    timeElements.forEach(time => {
      expect(time).toHaveAttribute('datetime');
    });
  });

  it('has proper color scheme for text elements', () => {
    const { container } = render(<Timeline items={mockItems} />);
    const primaryText = container.querySelectorAll('.text-primary');
    expect(primaryText.length).toBeGreaterThan(0);
    
    const secondaryText = container.querySelectorAll('.text-secondary');
    expect(secondaryText.length).toBeGreaterThan(0);
  });

  it('handles single timeline item', () => {
    const singleItem = [mockItems[0]];
    render(<Timeline items={singleItem} />);
    expect(screen.getByText('First Event')).toBeDefined();
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(1);
  });

  it('maintains proper timeline structure with line', () => {
    const { container } = render(<Timeline items={mockItems} />);
    const line = container.querySelector('.absolute.left-0');
    expect(line).toBeDefined();
    expect(line).toHaveClass('top-0', 'bottom-0');
  });
});
