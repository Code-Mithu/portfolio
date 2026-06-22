import React from 'react';

const experiences = [
  {
    company: 'Financial Services Corporation',
    role: 'Finance & Operations Executive',
    duration: '2021 - Present',
    location: 'Dhaka, Bangladesh',
    metrics: ['2.9+ years', 'L/C Management', 'Tax Compliance'],
    responsibilities: [
      'Manage Letter of Credit (L/C) openings and ensure compliance with NBR (National Board of Revenue) regulations for international trade operations.',
      'Maintain and update Mushak registers for VAT compliance, ensuring accurate tax documentation and reporting.',
      'Oversee banking operations, coordinate with financial institutions, and manage treasury functions for optimal cash flow.',
      'Implement digital solutions for financial documentation, reducing manual paperwork by 40% and improving operational efficiency.',
      'Collaborate with cross-functional teams to integrate financial systems with IT infrastructure, enabling automated reporting and compliance monitoring.',
    ]
  },
  {
    company: 'Freelance Software Development',
    role: 'Full-Stack Developer',
    duration: '2020 - Present',
    location: 'Remote',
    metrics: ['Web Development', 'System Integration', 'Automation'],
    responsibilities: [
      'Develop full-stack web applications using modern technologies including React, Next.js, Django, and PostgreSQL.',
      'Build automated financial tools and dashboards for clients, integrating with banking APIs and payment gateways.',
      'Create tax calculation and compliance software that streamlines VAT and income tax processes for small businesses.',
      'Implement responsive designs and accessible user interfaces, following WCAG guidelines for optimal user experience.',
      'Deploy and manage applications using Docker and cloud services, ensuring high availability and security.',
    ]
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground mb-6 border-b border-border pb-2 uppercase tracking-wider">
          Professional Experience
        </h2>
        <div className="space-y-12">
          {experiences.map((exp) => (
            <div key={exp.company} className="pb-8 border-b border-dashed border-border last:border-0 last:pb-0">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                  <p className="text-secondary font-medium">{exp.company}</p>
                  <p className="text-muted text-sm">{exp.location}</p>
                </div>
                <span className="text-muted text-sm mt-2 md:mt-0">{exp.duration}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.metrics.map((metric) => (
                  <span 
                    key={metric} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                  >
                    {metric}
                  </span>
                ))}
              </div>
              
              <ul className="list-disc list-inside text-secondary space-y-2">
                {exp.responsibilities.map(r => <li key={r} className="leading-relaxed">{r}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
