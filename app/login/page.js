import Link from 'next/link';
import { sanityClient } from '../../lib/sanity.client';
import { loginPageQuery } from '../../lib/sanity.queries';
import { urlFor } from '../../lib/sanity.image';

export async function generateMetadata() {
  const page = await sanityClient.fetch(loginPageQuery);
  const seo = page?.seo || {};
  const title = seo.metaTitle || 'Login | LeadPass';
  const description =
    seo.metaDescription || 'Access the AI-powered infrastructure for lead operations';
  const ogImageUrl = seo.ogImage ? urlFor(seo.ogImage).width(1200).height(630).url() : null;
  const twitterImageUrl = seo.twitterImage ? urlFor(seo.twitterImage).width(1200).height(630).url() : null;
  const robots = [seo.noIndex ? 'noindex' : 'index', seo.noFollow ? 'nofollow' : 'follow'].join(',');

  return {
    title,
    description,
    keywords: seo.keywords,
    alternates: { canonical: seo.canonicalUrl || '/login' },
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

export default async function Login() {
  const page = await sanityClient.fetch(loginPageQuery);
  const structuredData = page?.seo?.structuredData;
  let jsonLd = null;
  if (structuredData) {
    try {
      jsonLd = JSON.parse(structuredData);
    } catch {
      jsonLd = null;
    }
  }

  return (
    <main className="login-wrap">
      <div className="login-card">
        <div className="logo" style={{ marginBottom: 18 }}>
          <img className="logo-img" src="/logo.png" alt="LeadPass logo" />
        </div>
        <h1>{page?.title ?? 'Sign in to your account'}</h1>
        <p style={{ color: '#667085', fontSize: 14, marginBottom: 18 }}>{page?.subtitle ?? 'Access the AI-powered infrastructure for lead operations'}</p>
        <input className="input" placeholder="Email address" />
        <input className="input" placeholder="Password" type="password" />
        <div className="login-links">
          <label><input type="checkbox" /> {page?.rememberLabel ?? 'Remember me'}</label>
          <Link href="#">{page?.forgotLabel ?? 'Forgot password?'}</Link>
        </div>
        <button className="btn" style={{ width: '100%' }}>{page?.signInLabel ?? 'Sign In'}</button>
        <div className="divider">{page?.dividerLabel ?? 'or'}</div>
        <button className="btn secondary" style={{ width: '100%', marginBottom: 10 }}>{page?.googleLabel ?? 'Continue with Google'}</button>
        <button className="btn secondary" style={{ width: '100%' }}>{page?.microsoftLabel ?? 'Continue with Microsoft'}</button>
        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: '#667085' }}>
          {page?.footerText ?? "Don't have an account?"}{' '}
          <Link href="#" style={{ color: '#2b63ff', fontWeight: 600 }}>{page?.footerCtaLabel ?? 'Get Started'}</Link>
        </p>
        <p style={{ textAlign: 'center', marginTop: 10, fontSize: 11, color: '#98a2b3' }}>{page?.securityNote ?? 'Protected by enterprise-grade security and encrypted infrastructure'}</p>
        {jsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        ) : null}
      </div>
    </main>
  );
}
