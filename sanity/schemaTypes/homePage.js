import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text' }),
    defineField({ name: 'heroPrimaryCta', title: 'Hero Primary Button', type: 'string' }),
    defineField({ name: 'heroSecondaryCta', title: 'Hero Secondary Button', type: 'string' }),
    defineField({ name: 'heroBadges', title: 'Hero Badges', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'heroCard',
      title: 'Hero Summary Card',
      type: 'object',
      fields: [
        defineField({ name: 'qualityTag', title: 'Quality Tag', type: 'string' }),
        defineField({ name: 'industry', title: 'Industry', type: 'string' }),
        defineField({ name: 'location', title: 'Location', type: 'string' }),
        defineField({ name: 'budget', title: 'Budget', type: 'string' }),
        defineField({ name: 'price', title: 'Suggested Price', type: 'string' }),
        defineField({ name: 'duplicateTag', title: 'Duplicate Tag', type: 'string' })
      ]
    }),
    defineField({
      name: 'brokenCards',
      title: 'Problem Cards',
      type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'text', title: 'Text', type: 'text' })
      ]}]
    }),
    defineField({
      name: 'automationCards',
      title: 'Automation Cards',
      type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'text', title: 'Text', type: 'text' })
      ]}]
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'text', title: 'Text', type: 'text' })
      ]}]
    }),
    defineField({
      name: 'whyCards',
      title: 'Why Cards',
      type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'text', title: 'Text', type: 'text' })
      ]}]
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'text', title: 'Text', type: 'string' })
      ]}]
    }),
    defineField({
      name: 'builtFor',
      title: 'Built For',
      type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'text', title: 'Text', type: 'text' })
      ]}]
    }),
    defineField({ name: 'closingTitle', title: 'Closing Title', type: 'string' }),
    defineField({ name: 'closingText', title: 'Closing Text', type: 'text' }),
    defineField({ name: 'ctaTitle', title: 'CTA Title', type: 'string' }),
    defineField({ name: 'ctaPrimary', title: 'CTA Primary', type: 'string' }),
    defineField({ name: 'ctaSecondary', title: 'CTA Secondary', type: 'string' }),
    defineField({ name: 'ctaFootnote', title: 'CTA Footnote', type: 'text' })
  ]
});
