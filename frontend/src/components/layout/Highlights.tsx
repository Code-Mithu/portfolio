import React from 'react';

interface Achievement {
  text: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface StatCard {
  value: string;
  label: string;
}

const achievements: Achievement[] = [
  { text: '3+ years of experience in web development.' },
  { text: 'Successfully delivered 10+ high-impact projects.' },
  { text: 'Advocate for inclusive design and accessibility.' },
];

const milestones: Milestone[] = [
  {
    year: '2021',
    title: 'Started Professional Journey',
    description: 'Began career as a frontend developer, focusing on React and modern web technologies.'
  },
  {
    year: '2023',
    title: 'Senior Developer Role',
    description: 'Promoted to senior developer, leading teams on complex projects and mentoring junior developers.'
  },
  {
    year: '2024',
    title: 'Full-Stack Expansion',
    description: 'Expanded expertise to backend technologies, becoming a versatile full-stack developer.'
  },
];

const stats: StatCard[] = [
  { value: '10+', label: 'Projects Delivered' },
  { value: '3+', label: 'Years Experience' },
  { value: '15+', label: 'Happy Clients' },
  { value: '5+', label: 'Technologies Mastered' },
];

/**
 * Highlights component displaying key achievements, career milestones, and statistics.
 * Features responsive layout with grid-based design for optimal viewing on all devices.
 */
export const Highlights = () => {
  return (
    <div className="space-y-8">
      {/* Key Achievements */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
        <h3 className="text-xl font-semibold text-primary mb-4">Key Achievements</h3>
        <ul className="space-y-3">
          {achievements.map((achievement, index) => (
            <li key={index} className="flex items-start">
              <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">✓</span>
              <span className="text-secondary leading-relaxed">{achievement.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Career Milestones */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
        <h3 className="text-xl font-semibold text-primary mb-4">Career Milestones</h3>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{milestone.year}</span>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-secondary mb-1">{milestone.title}</h4>
                <p className="text-sm text-secondary leading-relaxed">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg border border-blue-100 shadow-sm">
            <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
            <div className="text-sm text-secondary">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
