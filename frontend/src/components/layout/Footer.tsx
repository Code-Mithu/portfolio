import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-12" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand/Copyright */}
          <div>
            <p className="font-bold text-xl mb-4">Portfolio</p>
            <p className="text-slate-300">
              &copy; {currentYear} All rights reserved.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Skills', 'Projects', 'Experience'].map(link => (
                <li key={link}>
                  <a href={`/#${link.toLowerCase()}`} className="text-slate-300 hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact/Back to Top */}
          <div className="flex flex-col items-start md:items-end">
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-slate-300 mb-4">email@example.com</p>
            <a 
              href="#top" 
              className="text-white hover:underline focus:underline"
              aria-label="Back to top"
            >
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
