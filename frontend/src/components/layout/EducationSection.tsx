import React from 'react';

const education = [
  {
    institution: 'University of Technology',
    degree: 'Master of Science in Software Engineering',
    duration: '2020 - 2022',
  },
  {
    institution: 'State University',
    degree: 'Bachelor of Science in Computer Science',
    duration: '2016 - 2020',
  },
];

export const EducationSection = () => {
  return (
    <section id="education" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Education</h2>
        <div className="relative border-l-2 border-slate-200 ml-3 md:ml-6">
          {education.map((edu, index) => (
            <div key={index} className="mb-10 ml-6">
              <div className="absolute -left-2.5 mt-2 w-5 h-5 bg-white border-2 border-primary rounded-full"></div>
              <h3 className="text-xl font-semibold text-primary">{edu.degree}</h3>
              <p className="text-secondary font-medium mb-1">{edu.institution}</p>
              <p className="text-sm text-slate-500">{edu.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
