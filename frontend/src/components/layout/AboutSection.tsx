import React from 'react';

export const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-4">Professional Summary</h3>
            <p className="text-secondary mb-4 leading-relaxed">
              Dedicated frontend engineer with expertise in building responsive, accessible, and user-centric web applications. Passionate about clean code, performance optimization, and intuitive UI/UX design.
            </p>
            <p className="text-secondary mb-6 leading-relaxed">
              I focus on bridging the gap between design and development, ensuring seamless user experiences across devices.
            </p>
            <div className="flex flex-wrap gap-2">
              {['TypeScript', 'React', 'Next.js', 'Tailwind CSS'].map(skill => (
                <span key={skill} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
            <h3 className="text-2xl font-semibold text-primary mb-4">Key Highlights</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">✓</span>
                <span className="text-secondary">3+ years of experience in web development.</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">✓</span>
                <span className="text-secondary">Successfully delivered 10+ high-impact projects.</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">✓</span>
                <span className="text-secondary">Advocate for inclusive design and accessibility.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
