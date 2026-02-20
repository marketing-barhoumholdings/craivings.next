import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { sanityClient } from '../../lib/sanity.client';
import { aboutPageQuery } from '../../lib/sanity.queries';
import { urlFor } from '../../lib/sanity.image';

export async function generateMetadata() {
  const page = await sanityClient.fetch(aboutPageQuery);
  const seo = page?.seo || {};
  const title = seo.metaTitle || 'About | LeadPass';
  const description =
    seo.metaDescription ||
    "We are pioneering a new era of intelligent lead exchange infrastructure that scales with modern growth teams.";
  const ogImageUrl = seo.ogImage ? urlFor(seo.ogImage).width(1200).height(630).url() : null;
  const twitterImageUrl = seo.twitterImage ? urlFor(seo.twitterImage).width(1200).height(630).url() : null;
  const robots = [seo.noIndex ? 'noindex' : 'index', seo.noFollow ? 'nofollow' : 'follow'].join(',');

  return {
    title,
    description,
    keywords: seo.keywords,
    alternates: { canonical: seo.canonicalUrl || '/about' },
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

const focusCards = [
  {
    title: 'Cloud Native Architecture',
    text: 'Elastic infrastructure with multi-region resilience.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 15a4 4 0 0 1 0-8 5 5 0 0 1 9.7 1.5A3.5 3.5 0 0 1 17.5 15H7z" />
      </svg>
    )
  },
  {
    title: 'AI Powered Exchange',
    text: 'Machine learning models optimize match quality.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 8h12v8H6z" />
        <path d="M9 4h6v3H9zM9 17h6v3H9z" />
      </svg>
    )
  },
  {
    title: 'Zero Trust Security',
    text: 'Continuous verification and data governance.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3l7 4v6c0 4.5-3.1 6.9-7 8-3.9-1.1-7-3.5-7-8V7l7-4z" />
      </svg>
    )
  }
];

const timeline = [
  { year: '2019', title: 'Company Founded', text: 'Started with a vision to revolutionize infrastructure management through intelligent automation.' },
  { year: '2020', title: 'First Product Launch', text: 'Released our flagship cognitive infrastructure platform to early adopters and enterprise clients.' },
  { year: '2021', title: 'Series A Funding', text: 'Secured $25M in Series A funding to accelerate product development and market expansion.' },
  { year: '2022', title: 'Global Expansion', text: 'Expanded operations to Europe and Asia, serving Fortune 500 companies worldwide.' },
  { year: '2024', title: 'AI Platform 2.0', text: 'Launched next-generation AI-powered infrastructure platform with advanced predictive capabilities.' }
];

export default async function About() {
  const page = await sanityClient.fetch(aboutPageQuery);
  const structuredData = page?.seo?.structuredData;
  let jsonLd = null;
  if (structuredData) {
    try {
      jsonLd = JSON.parse(structuredData);
    } catch {
      jsonLd = null;
    }
  }
  const focusCardsData = page?.focusCards?.length ? page.focusCards : focusCards;
  const timelineData = page?.timelineItems?.length ? page.timelineItems : timeline;
  const statsData = page?.stats?.length ? page.stats : [
    { value: '500+', label: 'Companies Served' },
    { value: '99.9%', label: 'Uptime Guarantee' },
    { value: '24/7', label: 'Expert Support' }
  ];

  return (
    <main>
      <Nav active="about" />
      <section className="section about-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="about-title">{page?.heroTitle ?? "Building Tomorrow's Infrastructure"}</h1>
          <p className="about-subtitle">{page?.heroSubtitle ?? 'We are pioneering a new era of intelligent lead exchange infrastructure that scales with modern growth teams.'}</p>
        </div>
      </section>

      <section className="section">
        <div className="container split about-split">
          <div>
            <span className="pill-badge blue">{page?.missionBadge ?? 'Our Mission'}</span>
            <h2 style={{ margin: '14px 0' }}>{page?.missionHeading ?? 'Empowering Digital Transformation'}</h2>
            <p style={{ color: '#667085', marginBottom: 12 }}>
              {page?.missionText1 ?? 'We believe that robust infrastructure is the foundation of every successful digital transformation. Our mission is to democratize access to enterprise-grade infrastructure solutions, making them accessible to organizations of all sizes.'}
            </p>
            <p style={{ color: '#667085', marginBottom: 18 }}>
              {page?.missionText2 ?? "Through innovative technology and unwavering commitment to excellence, we're building the backbone that powers the digital economy of tomorrow."}
            </p>
            <div className="about-stats">
              {statsData.map((stat) => (
                <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
              ))}
            </div>
          </div>
          <div className="image-panel about-image" />
        </div>
      </section>

      <section className="section about-light">
        <div className="container">
          <div className="section-title">
            <span className="pill-badge blue">{page?.focusBadge ?? 'Infrastructure Vision'}</span>
            <h2>{page?.focusHeading ?? 'The Future of Connected Systems'}</h2>
            <p>{page?.focusText ?? 'Our vision extends beyond traditional infrastructure to create intelligent, self-healing, and adaptive systems that evolve with your business needs.'}</p>
          </div>
          <div className="card-grid">
            {focusCardsData.map((card, index) => (
              <div className="card about-card" key={card.title}>
                <div className="icon about-icon">{focusCards[index]?.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split about-split">
          <div className="about-image-panel" />
          <div>
            <span className="pill-badge">{page?.categoryBadge ?? 'Category Creation'}</span>
            <h2 style={{ margin: '14px 0' }}>{page?.categoryHeading ?? 'Pioneering a New Era'}</h2>
            <p style={{ color: '#667085' }}>{page?.categoryIntro ?? "We didn't just enter an existing market — we created an entirely new category of intelligent infrastructure solutions."}</p>
            <h3 style={{ margin: '16px 0 8px' }}>From Vision to Reality</h3>
            <p style={{ color: '#667085' }}>{page?.categoryText ?? 'We identified a critical gap in the market: organizations needed infrastructure that could think, adapt, and evolve. Traditional solutions were static, reactive, and required constant manual intervention.'}</p>
            <p style={{ color: '#667085' }}>{page?.categoryText ? null : 'We envisioned a new category of "Cognitive Infrastructure" — systems that combine the reliability of traditional infrastructure with the intelligence of modern AI and machine learning.'}</p>
            <ul className="about-bullets">
              {(page?.categoryBullets?.length ? page.categoryBullets : [
                'Self-healing and adaptive systems',
                'Predictive maintenance and optimization',
                'Autonomous scaling and resource management'
              ]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section about-light">
        <div className="container">
          <div className="timeline-header">
            <span className="timeline-pill">{page?.timelineBadge ?? 'Our Journey'}</span>
            <h2>{page?.timelineHeading ?? 'Timeline of Innovation'}</h2>
          </div>
          <div className="timeline-grid">
            {timelineData.map((item, index) => {
              const left = index % 2 === 0;
              return (
                <div className={`timeline-row ${left ? 'left' : 'right'}`} key={item.year}>
                  <div className="timeline-col">
                    {left ? (
                      <div className="timeline-card">
                        <div className="timeline-year">{item.year}</div>
                        <strong>{item.title}</strong>
                        <p>{item.text}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="timeline-center">
                    <span className="timeline-dot" />
                  </div>
                  <div className="timeline-col">
                    {!left ? (
                      <div className="timeline-card">
                        <div className="timeline-year">{item.year}</div>
                        <strong>{item.title}</strong>
                        <p>{item.text}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
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
