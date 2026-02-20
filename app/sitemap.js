import { sanityClient } from '../lib/sanity.client';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const staticRoutes = [
  { path: '/', priority: 1 },
  { path: '/about', priority: 0.8 },
  { path: '/blog', priority: 0.8 },
  { path: '/contact', priority: 0.7 },
  { path: '/login', priority: 0.5 }
];

export default async function sitemap() {
  const now = new Date().toISOString();
  let posts = [];

  try {
    posts = await sanityClient.fetch(
      `*[_type == "post" && defined(slug.current) && (!defined(includeInSitemap) || includeInSitemap == true) && (!defined(seo.noIndex) || seo.noIndex != true)]{
        "slug": slug.current,
        "updated": coalesce(updatedAt, _updatedAt)
      }`
    );
  } catch (error) {
    posts = [];
  }

  const postRoutes = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updated || now,
    changefreq: 'weekly',
    priority: 0.6
  }));

  const baseRoutes = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changefreq: 'monthly',
    priority: route.priority
  }));

  return [...baseRoutes, ...postRoutes];
}
