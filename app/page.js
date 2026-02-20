import Nav from './components/Nav';
import Footer from './components/Footer';
import { sanityClient } from '../lib/sanity.client';
import { homePageQuery } from '../lib/sanity.queries';
import { urlFor } from '../lib/sanity.image';

export async function generateMetadata() {
  const page = await sanityClient.fetch(homePageQuery);
  const seo = page?.seo || {};
  const title = seo.metaTitle || 'LeadPass';
  const description = seo.metaDescription || 'AI-powered lead exchange infrastructure.';
  const ogImageUrl = seo.ogImage ? urlFor(seo.ogImage).width(1200).height(630).url() : null;
  const twitterImageUrl = seo.twitterImage ? urlFor(seo.twitterImage).width(1200).height(630).url() : null;
  const robots = [seo.noIndex ? 'noindex' : 'index', seo.noFollow ? 'nofollow' : 'follow'].join(',');

  return {
    title,
    description,
    keywords: seo.keywords,
    alternates: { canonical: seo.canonicalUrl || '/' },
    robots,
    openGraph: {
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      images: ogImageUrl ? [{ url: ogImageUrl, alt: seo.ogImageAlt || title }] : undefined
    },
    twitter: {
      title: seo.twitterTitle || title,
      description: seo.twitterDescription || description,
      images: twitterImageUrl ? [twitterImageUrl] : undefined
    }
  };
}

const brokenCards = [
  {
    title: 'Raw, messy lead data',
    text: 'Inconsistent formats and incomplete information make lead evaluation nearly impossible.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l9 16H3l9-16z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    )
  },
  {
    title: 'No clarity before purchase',
    text: 'Buying leads blind without proper summaries or quality indicators.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
        <path d="M4 4l16 16" />
      </svg>
    )
  },
  {
    title: 'Inconsistent pricing',
    text: 'No market guidance or standardized pricing across different lead sources.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9.5a2.5 2.5 0 1 1 4.5 1.5c-.8.6-1.5 1-1.5 2" />
        <path d="M12 17h.01" />
      </svg>
    )
  },
  {
    title: 'Manual filtering',
    text: 'Time-consuming manual processes for sorting and qualifying leads.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 11v-4a2 2 0 0 1 4 0v4" />
        <path d="M11 11V6a2 2 0 0 1 4 0v5" />
        <path d="M15 11V8a2 2 0 0 1 4 0v4" />
        <path d="M7 11h12v3a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6v-3z" />
      </svg>
    )
  },
  {
    title: 'Duplicate purchases',
    text: 'Accidentally buying the same leads multiple times without warning systems.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="10" height="12" rx="2" />
        <rect x="10" y="4" width="10" height="12" rx="2" />
      </svg>
    )
  },
  {
    title: 'CRM exports → dead spreadsheets',
    text: 'Static exports that become outdated immediately with no sync capabilities.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 3h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
        <path d="M14 3v5h5" />
        <path d="M9 12l6 6" />
        <path d="M15 12l-6 6" />
      </svg>
    )
  }
];

const automationCards = [
  {
    title: 'Standardized Lead Summaries',
    text: 'Clean, structured summaries for fast decisions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 6h8" />
        <path d="M6 12h8" />
        <path d="M6 18h8" />
        <path d="M18 6h0" />
        <path d="M18 12h0" />
        <path d="M18 18h0" />
      </svg>
    )
  },
  {
    title: 'AI-Assisted Pricing Suggestions',
    text: 'Market-based pricing guidance — always optional.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3c-3 0-5 2.4-5 5.4v1.7l-2.3 2.2a1 1 0 0 0 .7 1.8h2.6l1.1 5.4c.1.6.6 1 1.2 1h3.4c.6 0 1.1-.4 1.2-1l1.1-5.4h2.6a1 1 0 0 0 .7-1.8L17 10.1V8.4C17 5.4 15 3 12 3z" />
      </svg>
    )
  },
  {
    title: 'Buyers & Sellers in One Account',
    text: 'One platform to buy, sell, and automate.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.5 10a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm9 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3zM7.5 12c-2.5 0-5.5 1.4-5.5 4v2h11v-2c0-2.6-3-4-5.5-4zm9 0c-.4 0-.9 0-1.3.1 1.6 1 2.8 2.4 2.8 4.3v1.6H22v-1.6c0-2.7-3-4.8-5.5-4.8z" />
      </svg>
    )
  }
];

const steps = [
  {
    title: 'Import or Upload Leads',
    text: 'Connect your CRM or upload lead files directly to the platform.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v12" />
        <path d="M7 8l5-5 5 5" />
        <path d="M5 21h14" />
      </svg>
    )
  },
  {
    title: 'Summaries & Pricing Suggestions',
    text: 'AI generates structured summaries and suggests market-based pricing.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16" />
        <path d="M4 12h10" />
        <path d="M4 18h6" />
      </svg>
    )
  },
  {
    title: 'List, Buy, or Automate Buying',
    text: 'Choose to sell leads, buy manually, or set up automated purchasing agents.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9h12" />
        <path d="M6 15h12" />
        <circle cx="8" cy="9" r="1.5" />
        <circle cx="16" cy="15" r="1.5" />
      </svg>
    )
  },
  {
    title: 'CRM Sync In & Out',
    text: 'Seamlessly sync purchased leads back to your CRM system.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h10" />
        <path d="M14 7l-3-3" />
        <path d="M14 7l-3 3" />
        <path d="M20 17H10" />
        <path d="M10 17l3-3" />
        <path d="M10 17l3 3" />
      </svg>
    )
  }
];

const whyCards = [
  {
    title: 'Not just a marketplace',
    text: 'Complete infrastructure with AI and automation built-in.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7h18" />
        <path d="M7 7l10 10" />
        <path d="M7 17h10" />
      </svg>
    )
  },
  {
    title: 'Not just a data provider',
    text: 'Full lead lifecycle management and exchange platform.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="6" rx="6" ry="2.5" />
        <path d="M6 6v6c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V6" />
        <path d="M6 12v6c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-6" />
      </svg>
    )
  },
  {
    title: 'Not just CRM exports',
    text: 'Live sync and real-time lead management capabilities.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v12" />
        <path d="M8 9l4 4 4-4" />
        <path d="M4 17h16" />
      </svg>
    )
  },
  {
    title: 'Not informal lead swaps',
    text: 'Professional, structured, and compliant lead operations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 10l4-3 4 3 4-3 4 3" />
        <path d="M6 10v7" />
        <path d="M18 10v7" />
        <path d="M9 16l3-2 3 2" />
      </svg>
    )
  }
];

const features = [
  {
    title: 'Standardized Summaries',
    text: 'Consistent lead formatting',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="3" width="12" height="18" rx="2" />
        <path d="M9 8h6" />
        <path d="M9 12h6" />
        <path d="M9 16h4" />
      </svg>
    )
  },
  {
    title: 'AI Pricing Suggestions',
    text: 'Market-based pricing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 7-7 7-7-7 7-7z" />
        <path d="M9 12h6" />
      </svg>
    )
  },
  {
    title: 'Duplicate Warnings',
    text: 'Avoid repeat purchases',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l9 16H3l9-16z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    )
  },
  {
    title: 'Buying Agents',
    text: 'Automated purchasing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="7" width="16" height="10" rx="2" />
        <path d="M9 7v-2a3 3 0 0 1 6 0v2" />
        <path d="M9 17v2" />
        <path d="M15 17v2" />
      </svg>
    )
  },
  {
    title: 'Live Marketplace',
    text: 'Real-time lead exchange',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 6h15l-2 8H8L6 6z" />
        <circle cx="9" cy="19" r="1.5" />
        <circle cx="17" cy="19" r="1.5" />
      </svg>
    )
  },
  {
    title: 'CRM Sync',
    text: 'Seamless integration',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 7a6 6 0 0 1 9 1" />
        <path d="M16 8h3V5" />
        <path d="M17 17a6 6 0 0 1-9-1" />
        <path d="M8 16H5v3" />
      </svg>
    )
  },
  {
    title: 'Watchlists',
    text: 'Track preferred leads',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 4h10a2 2 0 0 1 2 2v14l-7-4-7 4V6a2 2 0 0 1 2-2z" />
      </svg>
    )
  },
  {
    title: 'Activity Logs',
    text: 'Complete audit trail',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4v16h16" />
        <path d="M8 14l3-3 2 2 4-5" />
      </svg>
    )
  }
];

const builtFor = [
  {
    title: 'Buyers',
    text: 'Purchase high-quality leads with confidence and automated processes.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 7h12l-1 8H7L6 7z" />
        <circle cx="9" cy="18" r="1.5" />
        <circle cx="15" cy="18" r="1.5" />
      </svg>
    )
  },
  {
    title: 'Sellers',
    text: 'Maximize lead value with AI-powered pricing and structured listings.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <rect x="6" y="8" width="12" height="8" rx="2" />
        <path d="M8 6h8l1 2H7l1-2z" />
      </svg>
    )
  },
  {
    title: 'Power Users',
    text: 'Advanced automation and bulk operations for high-volume lead management.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 3L5 14h6l-1 7 9-12h-6z" />
      </svg>
    )
  },
  {
    title: 'Teams',
    text: 'Collaborative lead management with role-based access and shared workflows.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="9" cy="9" r="3" />
        <circle cx="16.5" cy="10" r="2.5" />
        <path d="M3 20c1-3.5 9-3.5 10 0" />
        <path d="M13 20c.6-2.5 6-2.8 8 0" />
      </svg>
    )
  }
];

export default async function Home() {
  const page = await sanityClient.fetch(homePageQuery);
  const structuredData = page?.seo?.structuredData;
  let jsonLd = null;
  if (structuredData) {
    try {
      jsonLd = JSON.parse(structuredData);
    } catch {
      jsonLd = null;
    }
  }
  const hero = page?.heroCard ?? {};
  const heroTitleLines = (page?.heroTitle ?? 'Buy, Sell & Automate\nLead Buying — All in\nOne AI-Powered Lead\nExchange Infrastructure').split('\n');
  const brokenCardsData = page?.brokenCards?.length ? page.brokenCards : brokenCards;
  const automationCardsData = page?.automationCards?.length ? page.automationCards : automationCards;
  const stepsData = page?.steps?.length ? page.steps : steps;
  const whyCardsData = page?.whyCards?.length ? page.whyCards : whyCards;
  const featuresData = page?.features?.length ? page.features : features;
  const builtForData = page?.builtFor?.length ? page.builtFor : builtFor;

  return (
    <main>
      <Nav active="home" />
      <section className="hero-wrap">
        <div className="container hero">
          <div>
          <h1>
            {heroTitleLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < heroTitleLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </h1>
          <p>{page?.heroSubtitle ?? 'LeadPass structures and standardises lead data, then lets you buy, sell, and automate lead purchasing through AI-powered agents with built-in CRM syncing — all inside a unified infrastructure.'}</p>
          <div className="hero-actions">
            <button className="btn">{page?.heroPrimaryCta ?? 'Get Started'}</button>
            <button className="btn outline">{page?.heroSecondaryCta ?? 'View How It Works'}</button>
          </div>
          <div className="hero-badges">
            {(page?.heroBadges?.length ? page.heroBadges : [
              'Standardized Lead Summaries',
              'AI-Assisted Pricing Suggestions',
              'Duplicate Risk Warnings',
              'Automated Buying Agents',
              'CRM Sync In & Out'
            ]).map((badge) => (
              <span className="badge soft" key={badge}>{badge}</span>
            ))}
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card-inner">
            <div className="hero-card-head">
              <strong>Lead Summary</strong>
              <span className="tag green">{hero.qualityTag ?? 'High Quality'}</span>
            </div>
            <div className="mini-metrics">
              <div className="pill"><span>Industry:</span><strong>{hero.industry ?? 'Solar Installation'}</strong></div>
              <div className="pill"><span>Location:</span><strong>{hero.location ?? 'California, USA'}</strong></div>
              <div className="pill"><span>Budget:</span><strong>{hero.budget ?? '$15,000 - $25,000'}</strong></div>
            </div>
            <div className="hero-card-foot">
              <div className="price">Suggested Price: <strong>{hero.price ?? '$45'}</strong></div>
              <span className="tag gold">{hero.duplicateTag ?? 'No Duplicates'}</span>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>The Lead Industry Is Broken</h2>
          </div>
          <div className="card-grid three">
            {brokenCardsData.map((card, index) => (
              <div className="card problem-card" key={card.title}>
                <div className="icon problem-icon">{brokenCards[index]?.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: '#5b6b82', marginTop: 20 }}>LeadPass was built to bring structure, transparency, and automation to this infrastructure gap.</p>
        </div>
      </section>

      <section className="section" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="section-title">
            <h2>An AI-Powered Lead Exchange Infrastructure That Adds Structure &amp; Automation</h2>
          </div>
          <div className="card-grid">
            {automationCardsData.map((card, index) => (
              <div className="card automation-card" key={card.title}>
                <div className="icon automation-icon">{automationCards[index]?.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#f7f9ff' }}>
        <div className="container">
          <div className="section-title">
            <h2>How LeadPass Works</h2>
          </div>
          <div className="card-grid">
            {stepsData.map((step, index) => (
              <div className="card step-card" key={step.title}>
                <div className="step-circle">{index + 1}</div>
                <h3 style={{ marginTop: 12 }}>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: '#5b6b82', marginTop: 20 }}>Everything happens inside one unified infrastructure — from structuring to purchasing to resale.</p>
        </div>
      </section>

      <section className="section" style={{ background: '#f7f9ff' }}>
        <div className="container">
          <div className="section-title">
            <h2>Why LeadPass Is Different</h2>
          </div>
          <div className="card-grid">
            {whyCardsData.map((card, index) => (
              <div className="card why-card" key={card.title}>
                <div className="icon why-icon">{whyCards[index]?.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: '#5b6b82', marginTop: 20 }}>LeadPass unifies lead buying, selling, automation, and CRM syncing through one infrastructure.</p>
        </div>
      </section>

      <section className="section" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="section-title">
            <h2>Features Built Into the LeadPass Infrastructure</h2>
          </div>
          <div className="card-grid">
            {featuresData.map((feature, index) => (
              <div className="card text-center" key={feature.title}>
                <div className="icon feature-icon">{features[index]?.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="section-title">
            <h2>Built for Sales Teams, Agencies &amp; Lead Sellers</h2>
            <p>From solar to SaaS to real estate — LeadPass supports structured, compliant, automated lead operations.</p>
          </div>
          <div className="card-grid built-grid">
            {builtForData.map((item, index) => (
              <div className="card built-card" key={item.title}>
                <div className="icon built-icon">{builtFor[index]?.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#edf8ff' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>{page?.closingTitle ?? 'The Lead Economy Needed Infrastructure. This Is It.'}</h2>
          <p style={{ color: '#5b6b82', marginTop: 10 }}>{page?.closingText ?? 'LeadPass introduces infrastructure where there was fragmentation — standardization where there was inconsistency — and automation where everything was manual.'}</p>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <div>
            <h2>{page?.ctaTitle ?? 'Ready to Use the AI-Powered Lead Exchange Infrastructure?'}</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn">{page?.ctaPrimary ?? 'Get Started'}</button>
            <button className="btn secondary">{page?.ctaSecondary ?? 'Explore the Platform'}</button>
          </div>
          <p style={{ opacity: 0.9 }}>{page?.ctaFootnote ?? 'Structure your leads. Automate your buying. Operate on modern lead infrastructure.'}</p>
        </div>
      </section>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <Footer />
    </main>
  );
}
