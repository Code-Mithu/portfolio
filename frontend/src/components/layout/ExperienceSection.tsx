import React from 'react';

const experiences = [
  {
    company: 'Tech Solutions Inc.',
    position: 'Senior Frontend Engineer',
    duration: '2022 - Present',
    responsibilities: [
      'Led the development of a complex dashboard application.',
      'Optimized performance by 30% through code splitting and image optimization.',
      'Mentored junior developers and conducted code reviews.',
    ],
  },
  {
    company: 'Creative Agency',
    position: 'Frontend Developer',
    duration: '2020 - 2022',
    responsibilities: [
      'Built responsive websites for diverse clients using React and Tailwind CSS.',
      'Collaborated with designers to implement pixel-perfect UIs.',
      'Integrated RESTful APIs for dynamic content rendering.',
    ],
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Work Experience</h2>
        <div className="relative border-l-2 border-slate-200 ml-3 md:ml-6">
          {experiences.map((exp, index) => (
            <div key={index} className="mb-10 ml-6">
              <div className="absolute -left-2.5 mt-2 w-5 h-5 bg-white border-2 border-primary rounded-full"></div>
              <h3 className="text-xl font-semibold text-primary">{exp.position}</h3>
              <p className="text-secondary font-medium mb-1">{exp.company}</p>
              <p className="text-sm text-slate-500 mb-4">{exp.duration}</p>
              <ul className="list-disc ml-5 text-secondary space-y-1">
                {exp.responsibilities.map((res, idx) => (
                  <li key={idx}>{res}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
