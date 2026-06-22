import React from 'react';
import { SkillCategory } from './SkillCategory';

export interface SkillGroup {
  category: string;
  description: string;
  items: string[];
}

interface SkillsGridProps {
  skills: SkillGroup[];
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: string;
}

/**
 * Responsive SkillsGrid component for displaying skill categories in a grid layout.
 * Features category grouping, responsive breakpoints, and consistent spacing.
 */
export const SkillsGrid = ({ 
  skills, 
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'gap-8'
}: SkillsGridProps) => {
  const getGridColumns = () => {
    const mobileCols = columns.mobile || 1;
    const tabletCols = columns.tablet || 2;
    const desktopCols = columns.desktop || 3;
    
    return `grid-cols-${mobileCols} md:grid-cols-${tabletCols} lg:grid-cols-${desktopCols}`;
  };

  return (
    <div className={`grid ${getGridColumns()} ${gap}`}>
      {skills.map((skillGroup) => (
        <SkillCategory
          key={skillGroup.category}
          title={skillGroup.category}
          description={skillGroup.description}
          items={skillGroup.items}
        />
      ))}
    </div>
  );
};
