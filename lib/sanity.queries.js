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

export const aboutPageQuery = `
*[_type == "page" && slug.current == "about"][0]{
  ...,
  seo
}
`;

export const blogPageQuery = `
*[_type == "page" && slug.current == "blog"][0]{
  ...,
  seo
}
`;

export const contactPageQuery = `
*[_type == "page" && slug.current == "contact"][0]{
  ...,
  seo
}
`;

export const loginPageQuery = `
*[_type == "page" && slug.current == "login"][0]{
  ...,
  seo
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
