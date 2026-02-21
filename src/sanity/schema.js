import { defineField, defineType } from "sanity";

const seoFields = [
  defineField({
    name: "metaTitle",
    title: "Meta Title",
    type: "string"
  }),
  defineField({
    name: "metaDescription",
    title: "Meta Description",
    type: "text",
    rows: 3,
    validation: (Rule) => Rule.max(160).warning("160 characters max")
  }),
  defineField({
    name: "keywords",
    title: "Keywords",
    type: "array",
    of: [{ type: "string" }]
  }),
  defineField({
    name: "metaRobots",
    title: "Meta Robots",
    type: "string",
    options: {
      list: [
        { title: "index, follow", value: "index, follow" },
        { title: "noindex, follow", value: "noindex, follow" },
        { title: "index, nofollow", value: "index, nofollow" },
        { title: "noindex, nofollow", value: "noindex, nofollow" }
      ],
      layout: "dropdown"
    },
    initialValue: "index, follow"
  }),
  defineField({
    name: "canonicalUrl",
    title: "Canonical URL",
    type: "url"
  }),
  defineField({
    name: "noIndex",
    title: "No Index",
    type: "boolean"
  }),
  defineField({
    name: "noFollow",
    title: "No Follow",
    type: "boolean"
  }),
  defineField({
    name: "includeInSitemap",
    title: "Include in Sitemap",
    type: "boolean",
    initialValue: true
  }),
  defineField({
    name: "enableArticleSchema",
    title: "Enable Article Schema",
    type: "boolean",
    initialValue: true
  }),
  defineField({
    name: "enableFaqSchema",
    title: "Enable FAQ Schema",
    type: "boolean",
    initialValue: false
  }),
  defineField({
    name: "ogTitle",
    title: "OG Title",
    type: "string"
  }),
  defineField({
    name: "ogDescription",
    title: "OG Description",
    type: "text",
    rows: 3
  }),
  defineField({
    name: "ogImage",
    title: "OG Image",
    type: "image",
    options: { hotspot: true }
  }),
  defineField({
    name: "ogImageAlt",
    title: "OG Image Alt",
    type: "string"
  }),
  defineField({
    name: "twitterTitle",
    title: "Twitter Title",
    type: "string"
  }),
  defineField({
    name: "twitterDescription",
    title: "Twitter Description",
    type: "text",
    rows: 3
  }),
  defineField({
    name: "twitterImage",
    title: "Twitter Image",
    type: "image",
    options: { hotspot: true }
  }),
  defineField({
    name: "structuredData",
    title: "Structured Data (JSON-LD)",
    type: "code",
    options: {
      language: "json"
    }
  })
];

const seoObject = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: seoFields
});

const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 } })
  ],
  preview: {
    select: { title: "name" }
  }
});

const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 } })
  ],
  preview: {
    select: { title: "name" }
  }
});

const postFields = [
  defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
  defineField({
    name: "slug",
    title: "Slug",
    type: "slug",
    options: { source: "title", maxLength: 96, isUnique: (value, context) => context.defaultIsUnique(value, context) },
    validation: (Rule) => Rule.required()
  }),
  defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
  defineField({ name: "content", title: "Content", type: "text", rows: 12 }),
  defineField({ name: "featuredImage", title: "Featured Image", type: "image", options: { hotspot: true } }),
  defineField({ name: "featuredImageAlt", title: "Featured Image Alt", type: "string" }),
  defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }] }),
  defineField({ name: "categories", title: "Categories", type: "array", of: [{ type: "reference", to: [{ type: "category" }] }] }),
  defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
  defineField({ name: "updatedAt", title: "Updated At", type: "datetime" }),
  defineField({ name: "readingTime", title: "Reading Time (minutes)", type: "number" }),
  defineField({ name: "seo", title: "SEO", type: "seo", fieldset: "seo" })
];

const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fieldsets: [
    {
      name: "seo",
      title: "SEO",
      options: { collapsible: true, collapsed: true }
    }
  ],
  fields: postFields,
  preview: {
    select: { title: "title", media: "featuredImage", subtitle: "slug.current" }
  }
});

const pageFields = [
  defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
  defineField({
    name: "slug",
    title: "Slug",
    type: "slug",
    options: { source: "title", maxLength: 96, isUnique: (value, context) => context.defaultIsUnique(value, context) },
    validation: (Rule) => Rule.required()
  }),
  defineField({
    name: "contentHtml",
    title: "Content HTML",
    type: "text",
    rows: 12
  }),
  defineField({ name: "seo", title: "SEO", type: "seo", fieldset: "seo" })
];

const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fieldsets: [
    {
      name: "seo",
      title: "SEO",
      options: { collapsible: true, collapsed: true }
    }
  ],
  fields: pageFields,
  preview: {
    select: { title: "title", subtitle: "slug.current" }
  }
});

const pages = defineType({
  name: "pages",
  title: "Pages",
  type: "document",
  fieldsets: page.fieldsets,
  fields: pageFields,
  preview: page.preview
});

const posts = defineType({
  name: "posts",
  title: "Posts",
  type: "document",
  fieldsets: post.fieldsets,
  fields: postFields,
  preview: post.preview
});

export const schemaTypes = [seoObject, author, category, post, posts, page, pages];
