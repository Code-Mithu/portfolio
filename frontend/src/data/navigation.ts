import { NAVIGATION_LINKS } from '../lib/constants';

export interface NavLink {
  name: string;
  href: string;
}

export const navigationLinks: NavLink[] = NAVIGATION_LINKS.map((link) => ({
  name: link.name,
  href: `/${link.href}`,
}));
