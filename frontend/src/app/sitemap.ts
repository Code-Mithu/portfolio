import { MetadataRoute } from 'next';

const BASE_URL = 'https://your-portfolio-url.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    {
      path: '',
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    // Add future routes here, e.g.:
    // {
    //   path: '/blog',
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.8,
    // },
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
