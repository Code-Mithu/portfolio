import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SkillCardProps {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  icon?: LucideIcon;
  description?: string;
}

/**
 * Reusable SkillCard component displaying individual skill with name, level, icon, and optional description.
 * Features accessibility compliance with ARIA labels and keyboard navigation support.
 */
export const SkillCard = ({ name, level, icon: Icon, description }: SkillCardProps) => {
  const getLevelColor = (skillLevel: string): string => {
    switch (skillLevel) {
      case 'Beginner':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Advanced':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Expert':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getLevelWidth = (skillLevel: string): string => {
    switch (skillLevel) {
      case 'Beginner':
        return '25%';
      case 'Intermediate':
        return '50%';
      case 'Advanced':
        return '75%';
      case 'Expert':
        return '100%';
      default:
        return '0%';
    }
  };

  const levelBadgeClass = `text-xs font-medium px-2 py-1 rounded border ${getLevelColor(level)}`;
  const progressValue = level === 'Beginner' ? 25 : level === 'Intermediate' ? 50 : level === 'Advanced' ? 75 : 100;

  return (
    <article 
      className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200"
      role="article"
      aria-label={`${name} skill - ${level} level`}
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <div 
            className="flex-shrink-0 p-2 bg-slate-50 rounded-lg"
            aria-hidden="true"
          >
            <Icon className="w-5 h-5 text-primary" strokeWidth={2} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-primary mb-1">{name}</h3>
          {description && (
            <p className="text-sm text-secondary mb-3 leading-relaxed line-clamp-2">{description}</p>
          )}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span 
                className={levelBadgeClass}
                role="status"
                aria-label={`Skill level: ${level}`}
              >
                {level}
              </span>
            </div>
            <div 
              className="w-full bg-slate-100 rounded-full h-2 overflow-hidden"
              role="progressbar"
              aria-valuenow={progressValue}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${name} proficiency: ${level}`}
            >
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: getLevelWidth(level) }}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
