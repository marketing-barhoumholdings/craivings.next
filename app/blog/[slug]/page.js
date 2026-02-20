import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { PortableText } from '@portabletext/react';
import { sanityClient } from '../../../lib/sanity.client';
import { postBySlugQuery } from '../../../lib/sanity.queries';
import { urlFor } from '../../../lib/sanity.image';

export async function generateMetadata({ params }) {
  const post = await sanityClient.fetch(postBySlugQuery, { slug: params.slug });

  if (!post) {
    return {};
  }

  const seo = post.seo || {};
  const title = seo.metaTitle || post.title;
  const description = seo.metaDescription || post.excerpt || '';
  const ogImage = seo.ogImage || post.featuredImage;
  const twitterImage = seo.twitterImage || ogImage;
  const ogImageUrl = ogImage ? urlFor(ogImage).width(1200).height(630).url() : null;
  const twitterImageUrl = twitterImage ? urlFor(twitterImage).width(1200).height(630).url() : null;
  const robots = [seo.noIndex ? 'noindex' : 'index', seo.noFollow ? 'nofollow' : 'follow'].join(',');

  return {
    title,
    description,
    keywords: seo.keywords,
    alternates: seo.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
    robots,
    openGraph: {
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      images: ogImageUrl ? [{ url: ogImageUrl, alt: seo.ogImageAlt || post.featuredImageAlt || post.title }] : undefined
    },
    twitter: {
      title: seo.twitterTitle || title,
      description: seo.twitterDescription || description,
      images: twitterImageUrl ? [twitterImageUrl] : undefined
    }
  };
}

export default async function BlogPost({ params }) {
  const post = await sanityClient.fetch(postBySlugQuery, { slug: params.slug });

  if (!post) {
    return (
      <main>
        <Nav active="blog" />
        <section className="section">
          <div className="container">
            <h1>Post not found</h1>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const structuredData = post.seo?.structuredData;
  let jsonLd = null;
  if (structuredData) {
    try {
      jsonLd = JSON.parse(structuredData);
    } catch {
      jsonLd = null;
    }
  }

  return (
    <main>
      <Nav active="blog" />
      <section className="section">
        <div className="container">
          <h1>{post.title}</h1>
          {post.excerpt ? <p style={{ color: '#667085' }}>{post.excerpt}</p> : null}
          {post.body?.length ? (
            <div style={{ marginTop: 20 }}>
              <PortableText value={post.body} />
            </div>
          ) : null}
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
