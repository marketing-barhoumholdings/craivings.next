import { groq } from 'next-sanity';

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    content,
    seo
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    seo,
    heroTitle,
    heroSubtitle,
    heroPrimaryCta,
    heroSecondaryCta,
    heroBadges,
    heroCard,
    brokenCards,
    automationCards,
    steps,
    whyCards,
    features,
    builtFor,
    closingTitle,
    closingText,
    ctaTitle,
    ctaPrimary,
    ctaSecondary,
    ctaFootnote
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0]{
    seo,
    heroTitle,
    heroSubtitle,
    missionBadge,
    missionHeading,
    missionText1,
    missionText2,
    stats,
    focusBadge,
    focusHeading,
    focusText,
    focusCards,
    categoryBadge,
    categoryHeading,
    categoryIntro,
    categoryText,
    categoryBullets,
    timelineBadge,
    timelineHeading,
    timelineItems
  }
`;

export const blogPageQuery = groq`
  *[_type == "blogPage"][0]{
    seo,
    heroTitle,
    heroSubtitle,
    featured,
    tabs,
    posts
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    publishedAt,
    updatedAt,
    readingTime,
    excerpt,
    featuredImage,
    featuredImageAlt,
    author->{name, image},
    categories[]->{title, "slug": slug.current},
    body,
    seo{
      metaTitle,
      metaDescription,
      canonicalUrl,
      noIndex,
      noFollow,
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

export const contactPageQuery = groq`
  *[_type == "contactPage"][0]{
    seo,
    heroTitle,
    heroSubtitle,
    contactCards,
    formHeading,
    formFields,
    formSelectOptions,
    consentText,
    submitLabel
  }
`;

export const loginPageQuery = groq`
  *[_type == "loginPage"][0]{
    seo,
    title,
    subtitle,
    rememberLabel,
    forgotLabel,
    signInLabel,
    dividerLabel,
    googleLabel,
    microsoftLabel,
    footerText,
    footerCtaLabel,
    securityNote
  }
`;
