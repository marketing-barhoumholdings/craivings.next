import { config } from 'dotenv';
import { createClient } from '@sanity/client';

config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local');
}

if (!token) {
  throw new Error('Missing SANITY_API_TOKEN in .env.local (needs write access).');
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-02-01',
  useCdn: false,
  token
});

const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  heroTitle:
    'Buy, Sell & Automate\nLead Buying — All in\nOne AI-Powered Lead\nExchange Infrastructure',
  heroSubtitle:
    'LeadPass structures and standardises lead data, then lets you buy, sell, and automate lead purchasing through AI-powered agents with built-in CRM syncing — all inside a unified infrastructure.',
  heroPrimaryCta: 'Get Started',
  heroSecondaryCta: 'View How It Works',
  heroBadges: [
    'Standardized Lead Summaries',
    'AI-Assisted Pricing Suggestions',
    'Duplicate Risk Warnings',
    'Automated Buying Agents',
    'CRM Sync In & Out'
  ],
  heroCard: {
    qualityTag: 'High Quality',
    industry: 'Solar Installation',
    location: 'California, USA',
    budget: '$15,000 - $25,000',
    price: '$45',
    duplicateTag: 'No Duplicates'
  },
  brokenCards: [
    {
      _key: 'broken-1',
      title: 'Raw, messy lead data',
      text: 'Inconsistent formats and incomplete information make lead evaluation nearly impossible.'
    },
    {
      _key: 'broken-2',
      title: 'No clarity before purchase',
      text: 'Buying leads blind without proper summaries or quality indicators.'
    },
    {
      _key: 'broken-3',
      title: 'Inconsistent pricing',
      text: 'No market guidance or standardized pricing across different lead sources.'
    },
    {
      _key: 'broken-4',
      title: 'Manual filtering',
      text: 'Time-consuming manual processes for sorting and qualifying leads.'
    },
    {
      _key: 'broken-5',
      title: 'Duplicate purchases',
      text: 'Accidentally buying the same leads multiple times without warning systems.'
    },
    {
      _key: 'broken-6',
      title: 'CRM exports → dead spreadsheets',
      text: 'Static exports that become outdated immediately with no sync capabilities.'
    }
  ],
  automationCards: [
    {
      _key: 'auto-1',
      title: 'Standardized Lead Summaries',
      text: 'Clean, structured summaries for fast decisions.'
    },
    {
      _key: 'auto-2',
      title: 'AI-Assisted Pricing Suggestions',
      text: 'Market-based pricing guidance — always optional.'
    },
    {
      _key: 'auto-3',
      title: 'Buyers & Sellers in One Account',
      text: 'One platform to buy, sell, and automate.'
    }
  ],
  steps: [
    {
      _key: 'step-1',
      title: 'Import or Upload Leads',
      text: 'Connect your CRM or upload lead files directly to the platform.'
    },
    {
      _key: 'step-2',
      title: 'Summaries & Pricing Suggestions',
      text: 'AI generates structured summaries and suggests market-based pricing.'
    },
    {
      _key: 'step-3',
      title: 'List, Buy, or Automate Buying',
      text: 'Choose to sell leads, buy manually, or set up automated purchasing agents.'
    },
    {
      _key: 'step-4',
      title: 'CRM Sync In & Out',
      text: 'Seamlessly sync purchased leads back to your CRM system.'
    }
  ],
  whyCards: [
    {
      _key: 'why-1',
      title: 'Not just a marketplace',
      text: 'Complete infrastructure with AI and automation built-in.'
    },
    {
      _key: 'why-2',
      title: 'Not just a data provider',
      text: 'Full lead lifecycle management and exchange platform.'
    },
    {
      _key: 'why-3',
      title: 'Not just CRM exports',
      text: 'Live sync and real-time lead management capabilities.'
    },
    {
      _key: 'why-4',
      title: 'Not informal lead swaps',
      text: 'Professional, structured, and compliant lead operations.'
    }
  ],
  features: [
    { _key: 'feature-1', title: 'Standardized Summaries', text: 'Consistent lead formatting' },
    { _key: 'feature-2', title: 'AI Pricing Suggestions', text: 'Market-based pricing' },
    { _key: 'feature-3', title: 'Duplicate Warnings', text: 'Avoid repeat purchases' },
    { _key: 'feature-4', title: 'Buying Agents', text: 'Automated purchasing' },
    { _key: 'feature-5', title: 'Live Marketplace', text: 'Real-time lead exchange' },
    { _key: 'feature-6', title: 'CRM Sync', text: 'Seamless integration' },
    { _key: 'feature-7', title: 'Watchlists', text: 'Track preferred leads' },
    { _key: 'feature-8', title: 'Activity Logs', text: 'Complete audit trail' }
  ],
  builtFor: [
    {
      _key: 'built-1',
      title: 'Buyers',
      text: 'Purchase high-quality leads with confidence and automated processes.'
    },
    {
      _key: 'built-2',
      title: 'Sellers',
      text: 'Maximize lead value with AI-powered pricing and structured listings.'
    },
    {
      _key: 'built-3',
      title: 'Power Users',
      text: 'Advanced automation and bulk operations for high-volume lead management.'
    },
    {
      _key: 'built-4',
      title: 'Teams',
      text: 'Collaborative lead management with role-based access and shared workflows.'
    }
  ],
  closingTitle: 'The Lead Economy Needed Infrastructure. This Is It.',
  closingText:
    'LeadPass introduces infrastructure where there was fragmentation — standardization where there was inconsistency — and automation where everything was manual.',
  ctaTitle: 'Ready to Use the AI-Powered Lead Exchange Infrastructure?',
  ctaPrimary: 'Get Started',
  ctaSecondary: 'Explore the Platform',
  ctaFootnote:
    'Structure your leads. Automate your buying. Operate on modern lead infrastructure.'
};

const aboutPage = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  heroTitle: "Building Tomorrow's Infrastructure",
  heroSubtitle:
    'We are pioneering a new era of intelligent lead exchange infrastructure that scales with modern growth teams.',
  missionBadge: 'Our Mission',
  missionHeading: 'Empowering Digital Transformation',
  missionText1:
    'We believe that robust infrastructure is the foundation of every successful digital transformation. Our mission is to democratize access to enterprise-grade infrastructure solutions, making them accessible to organizations of all sizes.',
  missionText2:
    "Through innovative technology and unwavering commitment to excellence, we're building the backbone that powers the digital economy of tomorrow.",
  stats: [
    { _key: 'stat-1', value: '500+', label: 'Companies Served' },
    { _key: 'stat-2', value: '99.9%', label: 'Uptime Guarantee' },
    { _key: 'stat-3', value: '24/7', label: 'Expert Support' }
  ],
  focusBadge: 'Infrastructure Vision',
  focusHeading: 'The Future of Connected Systems',
  focusText:
    'Our vision extends beyond traditional infrastructure to create intelligent, self-healing, and adaptive systems that evolve with your business needs.',
  focusCards: [
    {
      _key: 'focus-1',
      title: 'Cloud Native Architecture',
      text: 'Elastic infrastructure with multi-region resilience.'
    },
    {
      _key: 'focus-2',
      title: 'AI Powered Exchange',
      text: 'Machine learning models optimize match quality.'
    },
    {
      _key: 'focus-3',
      title: 'Zero Trust Security',
      text: 'Continuous verification and data governance.'
    }
  ],
  categoryBadge: 'Category Creation',
  categoryHeading: 'Pioneering a New Era',
  categoryIntro:
    "We didn't just enter an existing market — we created an entirely new category of intelligent infrastructure solutions.",
  categoryText:
    'We identified a critical gap in the market: organizations needed infrastructure that could think, adapt, and evolve. Traditional solutions were static, reactive, and required constant manual intervention.',
  categoryBullets: [
    'Self-healing and adaptive systems',
    'Predictive maintenance and optimization',
    'Autonomous scaling and resource management'
  ],
  timelineBadge: 'Our Journey',
  timelineHeading: 'Timeline of Innovation',
  timelineItems: [
    {
      _key: 'timeline-2019',
      year: '2019',
      title: 'Company Founded',
      text: 'Started with a vision to revolutionize infrastructure management through intelligent automation.'
    },
    {
      _key: 'timeline-2020',
      year: '2020',
      title: 'First Product Launch',
      text: 'Released our flagship cognitive infrastructure platform to early adopters and enterprise clients.'
    },
    {
      _key: 'timeline-2021',
      year: '2021',
      title: 'Series A Funding',
      text: 'Secured $25M in Series A funding to accelerate product development and market expansion.'
    },
    {
      _key: 'timeline-2022',
      year: '2022',
      title: 'Global Expansion',
      text: 'Expanded operations to Europe and Asia, serving Fortune 500 companies worldwide.'
    },
    {
      _key: 'timeline-2024',
      year: '2024',
      title: 'AI Platform 2.0',
      text: 'Launched next-generation AI-powered infrastructure platform with advanced predictive capabilities.'
    }
  ]
};

const blogPage = {
  _id: 'blogPage',
  _type: 'blogPage',
  heroTitle: 'Blog',
  heroSubtitle:
    'Insights, updates, and technical deep-dives on building the future of lead exchange infrastructure.',
  featured: {
    tag: 'Featured',
    date: 'December 28, 2024',
    title: 'Building Real-time Lead Distribution at Scale',
    excerpt:
      'How we engineered our infrastructure to handle millions of lead exchanges per day with sub-100ms latency, ensuring your leads reach the right buyers instantly.',
    author: 'Alex Chen',
    role: 'Engineering Lead',
    ctaLabel: 'Read article',
    ctaHref: '/blog/lead-exchange-infrastructure'
  },
  tabs: ['All posts', 'Engineering', 'Product', 'Industry', 'Company'],
  posts: [
    { _key: 'post-1', title: 'API Rate Limiting Best Practices', tag: 'Engineering', author: 'Sarah Johnson' },
    { _key: 'post-2', title: 'Lead Quality Scoring Algorithm', tag: 'Product', author: 'Emma Rodriguez' },
    { _key: 'post-3', title: 'Zero-Trust Security Architecture', tag: 'Security', author: 'Michael Park' },
    { _key: 'post-4', title: 'The Future of B2B Lead Generation', tag: 'Industry', author: 'Lia Wang' },
    { _key: 'post-5', title: 'Building a Remote-First Engineering Team', tag: 'Company', author: 'Daniel Kim' },
    { _key: 'post-6', title: 'GraphQL vs REST for Lead APIs', tag: 'Engineering', author: 'James Wilson' }
  ]
};

const contactPage = {
  _id: 'contactPage',
  _type: 'contactPage',
  heroTitle: 'Get in touch',
  heroSubtitle:
    'Ready to transform your lead infrastructure? Our team is here to help you get started with LeadPass.',
  contactCards: [
    {
      _key: 'contact-1',
      title: 'Email us',
      line1: 'hello@leadpass.com',
      line2: 'We will get back to you within 24 hours'
    },
    {
      _key: 'contact-2',
      title: 'Call us',
      line1: '+1 (555) 123-4567',
      line2: 'Monday to Friday, 9am to 6pm PST'
    },
    {
      _key: 'contact-3',
      title: 'Schedule a demo',
      line1: 'Book a personalized walkthrough',
      line2: '30-minute session with our team'
    }
  ],
  formHeading: 'Tell us about your project',
  formFields: [
    'First name',
    'Last name',
    'Work email',
    'Company',
    'Phone number',
    'Tell us about your project'
  ],
  formSelectOptions: [
    'Lead Exchange Platform',
    'Enterprise Marketplace',
    'Lead Routing'
  ],
  consentText:
    'I agree to receive communications from LeadPass and understand that I can opt out at any time.',
  submitLabel: 'Send message'
};

const loginPage = {
  _id: 'loginPage',
  _type: 'loginPage',
  title: 'Sign in to your account',
  subtitle: 'Access the AI-powered infrastructure for lead operations',
  rememberLabel: 'Remember me',
  forgotLabel: 'Forgot password?',
  signInLabel: 'Sign In',
  dividerLabel: 'or',
  googleLabel: 'Continue with Google',
  microsoftLabel: 'Continue with Microsoft',
  footerText: "Don't have an account?",
  footerCtaLabel: 'Get Started',
  securityNote: 'Protected by enterprise-grade security and encrypted infrastructure'
};

const docs = [homePage, aboutPage, blogPage, contactPage, loginPage];

const upsert = async (doc) => {
  await client.createOrReplace(doc);
  return doc._id;
};

const run = async () => {
  const ids = [];
  for (const doc of docs) {
    ids.push(await upsert(doc));
  }
  console.log(`Seeded: ${ids.join(', ')}`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
