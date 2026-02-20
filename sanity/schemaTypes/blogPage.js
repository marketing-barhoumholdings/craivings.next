import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'blogPage',
  title: 'Blog Page',
  type: 'document',
  fields: [
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text' }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'object',
      fields: [
        defineField({ name: 'tag', title: 'Tag', type: 'string' }),
        defineField({ name: 'date', title: 'Date', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'excerpt', title: 'Excerpt', type: 'text' }),
        defineField({ name: 'author', title: 'Author', type: 'string' }),
        defineField({ name: 'role', title: 'Role', type: 'string' }),
        defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'CTA Link', type: 'string' })
      ]
    }),
    defineField({ name: 'tabs', title: 'Tabs', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'tag', title: 'Tag', type: 'string' }),
        defineField({ name: 'author', title: 'Author', type: 'string' })
      ]}]
    })
  ]
});
