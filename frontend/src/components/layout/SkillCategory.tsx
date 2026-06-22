import React from 'react';

interface SkillCategoryProps {
  title: string;
  description: string;
  items: string[];
}

/**
 * Reusable SkillCategory component displaying a category of skills with title, description, and skill tags.
 * Features responsive design with flexible skill tag layout.
 */
export const SkillCategory = ({ title, description, items }: SkillCategoryProps) => {
  return (
    <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 shadow-sm">
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-sm text-secondary mb-4 leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <span key={skill} className="px-3 py-1 bg-white border border-slate-200 rounded text-sm font-medium text-slate-700">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};
