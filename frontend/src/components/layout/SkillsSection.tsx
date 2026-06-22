import React from 'react';

const skillCategories = [
  {
    title: 'Financial Operations',
    description: 'Corporate finance and regulatory compliance expertise',
    items: ['L/C Management', 'NBR Compliance', 'Mushak Registers', 'VAT Taxation', 'Banking Operations', 'Treasury Management'],
    size: 'large'
  },
  {
    title: 'Frontend Development',
    description: 'Modern web technologies and frameworks',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3', 'Responsive Design'],
    size: 'medium'
  },
  {
    title: 'Backend Development',
    description: 'Server-side technologies and databases',
    items: ['Python', 'Django', 'Node.js', 'PostgreSQL', 'REST APIs', 'Docker'],
    size: 'medium'
  },
  {
    title: 'Development Tools',
    description: 'Software development and deployment',
    items: ['Git', 'Vercel', 'Jest/Vitest', 'CI/CD', 'Cloud Services'],
    size: 'small'
  },
  {
    title: 'Office & Administration',
    description: 'Business software and productivity tools',
    items: ['MS Office', 'Excel Advanced', 'ERP Systems', 'Documentation'],
    size: 'small'
  },
  {
    title: 'Soft Skills',
    description: 'Professional competencies',
    items: ['Project Management', 'Communication', 'Problem Solving', 'Team Collaboration'],
    size: 'small'
  },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground mb-12 border-b border-border pb-2 uppercase tracking-wider">
          Skills & Expertise
        </h2>
        
        {/* Bento-style Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const sizeClasses = {
              large: 'md:col-span-2 lg:col-span-2',
              medium: 'md:col-span-1 lg:col-span-1',
              small: 'md:col-span-1 lg:col-span-1'
            };
            
            return (
              <div 
                key={category.title} 
                className={`${sizeClasses[category.size]} bg-surface rounded-lg p-6 border border-border hover:border-primary/50 transition-colors`}
              >
                <h3 className="text-lg font-bold text-foreground mb-2">{category.title}</h3>
                <p className="text-secondary text-sm mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span 
                      key={item} 
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
