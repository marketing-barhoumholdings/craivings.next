import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text' }),
    defineField({
      name: 'contactCards',
      title: 'Contact Cards',
      type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'line1', title: 'Line 1', type: 'string' }),
        defineField({ name: 'line2', title: 'Line 2', type: 'string' })
      ]}]
    }),
    defineField({ name: 'formHeading', title: 'Form Heading', type: 'string' }),
    defineField({
      name: 'formFields',
      title: 'Form Fields',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'formSelectOptions',
      title: 'Form Select Options',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({ name: 'consentText', title: 'Consent Text', type: 'text' }),
    defineField({ name: 'submitLabel', title: 'Submit Label', type: 'string' })
  ]
});
