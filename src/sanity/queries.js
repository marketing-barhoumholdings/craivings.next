export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  publishedAt,
  updatedAt,
  readingTime,
  featuredImage,
  featuredImageAlt,
  "author": author->name,
  "categories": categories[]->{
    _id,
    name,
    "slug": slug.current
  },
  seo{
    metaTitle,
    metaDescription,
    keywords,
    metaRobots,
    canonicalUrl,
    noIndex,
    noFollow,
    includeInSitemap,
    enableArticleSchema,
    enableFaqSchema,
    ogTitle,
    ogDescription,
    ogImage,
    ogImageAlt,
    twitterTitle,
    twitterDescription,
    twitterImage,
    structuredData
  }
}
`;
