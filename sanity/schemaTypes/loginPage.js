import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'loginPage',
  title: 'Login Page',
  type: 'document',
  fields: [
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'text' }),
    defineField({ name: 'rememberLabel', title: 'Remember Label', type: 'string' }),
    defineField({ name: 'forgotLabel', title: 'Forgot Label', type: 'string' }),
    defineField({ name: 'signInLabel', title: 'Sign In Label', type: 'string' }),
    defineField({ name: 'dividerLabel', title: 'Divider Label', type: 'string' }),
    defineField({ name: 'googleLabel', title: 'Google Button', type: 'string' }),
    defineField({ name: 'microsoftLabel', title: 'Microsoft Button', type: 'string' }),
    defineField({ name: 'footerText', title: 'Footer Text', type: 'text' }),
    defineField({ name: 'footerCtaLabel', title: 'Footer CTA Label', type: 'string' }),
    defineField({ name: 'securityNote', title: 'Security Note', type: 'text' })
  ]
});
