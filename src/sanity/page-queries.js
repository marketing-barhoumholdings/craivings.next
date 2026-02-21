export const pageBySlugQuery = `
*[_type in ["page","pages"] && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  contentHtml,
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
