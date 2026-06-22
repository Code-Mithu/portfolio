import React from 'react';

export interface TimelineItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  content?: React.ReactNode;
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
}

/**
 * Reusable Timeline component for displaying chronological events or experiences.
 * Features responsive layout, accessibility support, and multiple variants.
 */
export const Timeline = ({ 
  items, 
  variant = 'default', 
  className = '' 
}: TimelineProps) => {
  if (items.length === 0) {
    return null;
  }

  const getTimelineStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          container: 'space-y-4',
          line: 'ml-4 md:ml-6',
          item: 'ml-6',
          dot: 'w-4 h-4 -left-2.5 mt-2',
          title: 'text-lg font-semibold text-primary',
          subtitle: 'text-secondary font-medium text-sm',
          date: 'text-xs text-slate-500',
        };
      case 'detailed':
        return {
          container: 'space-y-12',
          line: 'ml-4 md:ml-8',
          item: 'ml-8',
          dot: 'w-6 h-6 -left-3.5 mt-2.5',
          title: 'text-2xl font-bold text-primary',
          subtitle: 'text-secondary font-semibold text-lg mb-2',
          date: 'text-sm text-slate-500 mb-4',
        };
      case 'default':
      default:
        return {
          container: 'space-y-10',
          line: 'ml-3 md:ml-6',
          item: 'ml-6',
          dot: 'w-5 h-5 -left-2.5 mt-2',
          title: 'text-xl font-semibold text-primary',
          subtitle: 'text-secondary font-medium mb-1',
          date: 'text-sm text-slate-500 mb-4',
        };
    }
  };

  const styles = getTimelineStyles();

  return (
    <div 
      className={`relative ${styles.line} ${styles.container} ${className}`}
      role="list"
      aria-label="Timeline"
    >
      <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-slate-200`} aria-hidden="true" />
      
      {items.map((item, index) => (
        <article 
          key={item.id}
          className={`relative ${styles.item}`}
          role="listitem"
        >
          {/* Timeline Dot */}
          <div 
            className={`absolute ${styles.dot} bg-white border-2 border-primary rounded-full flex items-center justify-center z-10`}
            aria-hidden="true"
          >
            {item.icon && (
              <div className="w-2 h-2 h-2 bg-primary rounded-full" />
            )}
          </div>

          {/* Timeline Content */}
          <div className="space-y-2">
            <h3 className={styles.title}>{item.title}</h3>
            
            {item.subtitle && (
              <p className={styles.subtitle}>{item.subtitle}</p>
            )}
            
            {item.date && (
              <time 
                className={styles.date}
                dateTime={item.date}
              >
                {item.date}
              </time>
            )}
            
            {item.description && (
              <p className="text-secondary leading-relaxed">{item.description}</p>
            )}
            
            {item.content && (
              <div className="text-secondary leading-relaxed">
                {item.content}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
};
