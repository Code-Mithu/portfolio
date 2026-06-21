import React from 'react';

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'] },
  { category: 'Tools', items: ['Git', 'Vercel', 'Docker', 'Figma', 'Jest/Vitest'] },
  { category: 'Backend/Other', items: ['Node.js', 'Python', 'SQL', 'REST APIs'] },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Skills & Technologies</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skillGroup) => (
            <div key={skillGroup.category} className="bg-slate-50 p-6 rounded-lg border border-slate-100 shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-4">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-white border border-slate-200 rounded text-sm font-medium text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
