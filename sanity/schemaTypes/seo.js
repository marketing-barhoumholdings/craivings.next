import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, validation: (rule) => rule.max(160) }),
    defineField({ name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'canonicalUrl', title: 'Canonical URL', type: 'url' }),
    defineField({ name: 'noIndex', title: 'No Index', type: 'boolean', initialValue: false }),
    defineField({ name: 'noFollow', title: 'No Follow', type: 'boolean', initialValue: false }),
    defineField({ name: 'ogTitle', title: 'OG Title', type: 'string' }),
    defineField({ name: 'ogDescription', title: 'OG Description', type: 'text', rows: 3 }),
    defineField({ name: 'ogImage', title: 'OG Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'ogImageAlt', title: 'OG Image Alt', type: 'string' }),
    defineField({ name: 'twitterTitle', title: 'Twitter Title', type: 'string' }),
    defineField({ name: 'twitterDescription', title: 'Twitter Description', type: 'text', rows: 3 }),
    defineField({ name: 'twitterImage', title: 'Twitter Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'structuredData', title: 'Structured Data (JSON-LD)', type: 'text', rows: 6 })
  ]
});
