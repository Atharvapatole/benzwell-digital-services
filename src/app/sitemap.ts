import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://digital.benzwell.in';

  const routes = [
    '',
    '/plans/basic',
    '/plans/medium',
    '/plans/full-stack',
    '/privacy',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/plans') ? 0.9 : 0.5,
  }));
}
