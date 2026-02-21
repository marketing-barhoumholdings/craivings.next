export const pageBySlugQuery = `
*[_type == "page" && slug.current == $slug][0]{
  title,
  slug,
  seo,
  heroTitle,
  heroSubtitle,
  ctaPrimary,
  ctaSecondary,
  stats,
  featuredLogos,
  problemCards,
  automationCards,
  whyCards,
  features,
  builtFor,
  testimonials,
  faqs,
  finalCta
}
`;

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0]{
  title,
  slug,
  excerpt,
  content,
  featuredImage,
  featuredImageAlt,
  author,
  categories,
  publishedAt,
  updatedAt,
  readingTime,
  seo
}
`;