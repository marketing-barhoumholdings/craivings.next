import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Link from 'next/link';
import { sanityClient } from '../../lib/sanity.client';
import { blogPageQuery } from '../../lib/sanity.queries';
import { urlFor } from '../../lib/sanity.image';

export async function generateMetadata() {
  const page = await sanityClient.fetch(blogPageQuery);
  const seo = page?.seo || {};
  const title = seo.metaTitle || 'Blog | LeadPass';
  const description =
    seo.metaDescription ||
    'Insights, updates, and technical deep-dives on building the future of lead exchange infrastructure.';
  const ogImageUrl = seo.ogImage ? urlFor(seo.ogImage).width(1200).height(630).url() : null;
  const twitterImageUrl = seo.twitterImage ? urlFor(seo.twitterImage).width(1200).height(630).url() : null;
  const robots = [seo.noIndex ? 'noindex' : 'index', seo.noFollow ? 'nofollow' : 'follow'].join(',');

  return {
    title,
    description,
    keywords: seo.keywords,
    alternates: { canonical: seo.canonicalUrl || '/blog' },
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

const posts = [
  { title: 'API Rate Limiting Best Practices', tag: 'Engineering', author: 'Sarah Johnson' },
  { title: 'Lead Quality Scoring Algorithm', tag: 'Product', author: 'Emma Rodriguez' },
  { title: 'Zero-Trust Security Architecture', tag: 'Security', author: 'Michael Park' },
  { title: 'The Future of B2B Lead Generation', tag: 'Industry', author: 'Lia Wang' },
  { title: 'Building a Remote-First Engineering Team', tag: 'Company', author: 'Daniel Kim' },
  { title: 'GraphQL vs REST for Lead APIs', tag: 'Engineering', author: 'James Wilson' }
];

export default async function Blog() {
  const page = await sanityClient.fetch(blogPageQuery);
  const structuredData = page?.seo?.structuredData;
  let jsonLd = null;
  if (structuredData) {
    try {
      jsonLd = JSON.parse(structuredData);
    } catch {
      jsonLd = null;
    }
  }
  const postsData = page?.posts?.length ? page.posts : posts;
  const tabsData = page?.tabs?.length ? page.tabs : ['All posts', 'Engineering', 'Product', 'Industry', 'Company'];
  const featured = page?.featured ?? {};

  return (
    <main>
      <Nav active="blog" />
      <section className="blog-hero" style={{ background: '#ffffff' }}>
        <div className="container">
          <h1 style={{ fontSize: 32, marginBottom: 8 }}>{page?.heroTitle ?? 'Blog'}</h1>
          <p style={{ color: '#667085', maxWidth: 560 }}>{page?.heroSubtitle ?? 'Insights, updates, and technical deep-dives on building the future of lead exchange infrastructure.'}</p>
          <div className="featured">
            <div className="featured-card">
              <div className="featured-meta">
                <span className="tag">{featured.tag ?? 'Featured'}</span>
                <span className="dot" />
                <span className="featured-date">{featured.date ?? 'December 28, 2024'}</span>
              </div>
              <h2 className="featured-title">{featured.title ?? 'Building Real-time Lead Distribution at Scale'}</h2>
              <p>{featured.excerpt ?? 'How we engineered our infrastructure to handle millions of lead exchanges per day with sub-100ms latency, ensuring your leads reach the right buyers instantly.'}</p>
              <div className="featured-author">
                <div className="avatar">AC</div>
                <div className="featured-author-info">
                  <strong>{featured.author ?? 'Alex Chen'}</strong>
                  <small>{featured.role ?? 'Engineering Lead'}</small>
                </div>
                <Link href={featured.ctaHref ?? '/blog/lead-exchange-infrastructure'} className="btn dark">{featured.ctaLabel ?? 'Read article'}</Link>
              </div>
            </div>
            <div className="featured-image" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="blog-toolbar">
            <div className="blog-tabs">
              {tabsData.map((tab, idx) => (
                <button key={tab} className={`tab ${idx === 0 ? 'active' : ''}`}>{tab}</button>
              ))}
            </div>
            <div className="search">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <input className="input" placeholder="Search articles..." />
            </div>
          </div>
          <div className="blog-grid">
            {postsData.map((post) => (
              <div className="blog-card" key={post.title}>
                <div className="blog-image" />
                <div className="blog-body">
                  <span className="tag">{post.tag}</span>
                  <h3 style={{ marginTop: 10 }}>{post.title}</h3>
                  <p style={{ color: '#667085', fontSize: 13, marginTop: 6 }}>By {post.author}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button className="page active">1</button>
            <button className="page">2</button>
            <button className="page">3</button>
            <span>...</span>
            <button className="page">12</button>
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
