export interface NavLink {
  name: string;
  href: string;
}

export const navigationLinks: NavLink[] = [
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Contact', href: '/#contact' },
];

export const footerNavigationLinks: NavLink[] = [
  ...navigationLinks.slice(0, 4),
  { name: 'Education', href: '/#education' },
  ...navigationLinks.slice(4),
];
