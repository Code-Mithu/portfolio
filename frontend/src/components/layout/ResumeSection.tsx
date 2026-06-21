import React from 'react';

const certifications = [
  { name: 'AWS Certified Solutions Architect', issuer: 'Amazon' },
  { name: 'Professional Scrum Master I', issuer: 'Scrum.org' },
];

export const ResumeSection = () => {
  return (
    <section id="resume" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Resume & Certifications</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Overview */}
          <div className="bg-slate-50 p-8 rounded-lg border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-semibold text-primary mb-4">Resume Overview</h3>
            <p className="text-secondary mb-6">
              Download or view my full professional resume to learn more about my experience and technical background.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/resume.pdf"
                download
                className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                aria-label="Download resume"
              >
                Download Resume
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-slate-300 text-secondary px-6 py-2 rounded hover:bg-slate-100 transition-colors"
                aria-label="View resume in a new tab"
              >
                View Resume
              </a>
            </div>
          </div>

          {/* Certifications & Skills Summary */}
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-6">Certifications</h3>
            <ul className="space-y-4 mb-8">
              {certifications.map((cert, index) => (
                <li key={index} className="bg-white p-4 rounded border border-slate-200">
                  <p className="font-semibold text-primary">{cert.name}</p>
                  <p className="text-sm text-secondary">{cert.issuer}</p>
                </li>
              ))}
            </ul>
            <h3 className="text-2xl font-semibold text-primary mb-4">Skills Summary</h3>
            <p className="text-secondary text-sm">
              Proficient in full-stack development, with a strong focus on modern frontend technologies like React, Next.js, and TypeScript, backed by cloud-native deployment practices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
