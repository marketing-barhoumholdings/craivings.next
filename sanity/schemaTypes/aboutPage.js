import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text' }),
    defineField({ name: 'missionBadge', title: 'Mission Badge', type: 'string' }),
    defineField({ name: 'missionHeading', title: 'Mission Heading', type: 'string' }),
    defineField({ name: 'missionText1', title: 'Mission Text 1', type: 'text' }),
    defineField({ name: 'missionText2', title: 'Mission Text 2', type: 'text' }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'value', title: 'Value', type: 'string' }),
        defineField({ name: 'label', title: 'Label', type: 'string' })
      ]}]
    }),
    defineField({ name: 'focusBadge', title: 'Focus Badge', type: 'string' }),
    defineField({ name: 'focusHeading', title: 'Focus Heading', type: 'string' }),
    defineField({ name: 'focusText', title: 'Focus Text', type: 'text' }),
    defineField({
      name: 'focusCards',
      title: 'Focus Cards',
      type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'text', title: 'Text', type: 'text' })
      ]}]
    }),
    defineField({ name: 'categoryBadge', title: 'Category Badge', type: 'string' }),
    defineField({ name: 'categoryHeading', title: 'Category Heading', type: 'string' }),
    defineField({ name: 'categoryIntro', title: 'Category Intro', type: 'text' }),
    defineField({ name: 'categoryText', title: 'Category Text', type: 'text' }),
    defineField({ name: 'categoryBullets', title: 'Category Bullets', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'timelineBadge', title: 'Timeline Badge', type: 'string' }),
    defineField({ name: 'timelineHeading', title: 'Timeline Heading', type: 'string' }),
    defineField({
      name: 'timelineItems',
      title: 'Timeline Items',
      type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'year', title: 'Year', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'text', title: 'Text', type: 'text' })
      ]}]
    })
  ]
});
