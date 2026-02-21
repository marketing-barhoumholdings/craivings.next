import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { sanityClient } from '../../lib/sanity.client';
import { contactPageQuery } from '../../lib/sanity.queries';
import { urlFor } from '../../lib/sanity.image';

export async function generateMetadata() {
  const page = await sanityClient.fetch(contactPageQuery);
  const seo = page?.seo || {};
  const title = seo.metaTitle || 'Contact | Craivings';
  const description =
    seo.metaDescription ||
    'Ready to transform your lead infrastructure? Our team is here to help you get started with Craivings.';
  const ogImageUrl = seo.ogImage ? urlFor(seo.ogImage).width(1200).height(630).url() : null;
  const twitterImageUrl = seo.twitterImage ? urlFor(seo.twitterImage).width(1200).height(630).url() : null;
  const robots = [seo.noIndex ? 'noindex' : 'index', seo.noFollow ? 'nofollow' : 'follow'].join(',');

  return {
    title,
    description,
    keywords: seo.keywords,
    alternates: { canonical: seo.canonicalUrl || '/contact' },
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

export default async function Contact() {
  const page = await sanityClient.fetch(contactPageQuery);
  const structuredData = page?.seo?.structuredData;
  let jsonLd = null;
  if (structuredData) {
    try {
      jsonLd = JSON.parse(structuredData);
    } catch {
      jsonLd = null;
    }
  }
  const cards = page?.contactCards?.length ? page.contactCards : [
    { title: 'Email us', line1: 'hello@leadpass.com', line2: 'We will get back to you within 24 hours' },
    { title: 'Call us', line1: '+1 (555) 123-4567', line2: 'Monday to Friday, 9am to 6pm PST' },
    { title: 'Schedule a demo', line1: 'Book a personalized walkthrough', line2: '30-minute session with our team' }
  ];
  const formFields = page?.formFields?.length ? page.formFields : [
    'First name',
    'Last name',
    'Work email',
    'Company',
    'Phone number',
    'Tell us about your project'
  ];
  const selectOptions = page?.formSelectOptions?.length ? page.formSelectOptions : [
    'Lead Exchange Platform',
    'Enterprise Marketplace',
    'Lead Routing'
  ];

  return (
    <main>
      <Nav active="contact" />
      <section className="section">
        <div className="container contact-wrap">
          <div>
            <h1 style={{ fontSize: 32, marginBottom: 10 }}>{page?.heroTitle ?? 'Get in touch'}</h1>
            <p style={{ color: '#667085', marginBottom: 24 }}>{page?.heroSubtitle ?? 'Ready to transform your lead infrastructure? Our team is here to help you get started with Craivings.'}</p>
            {cards.map((card, index) => (
              <div className="card" style={{ marginBottom: index < 2 ? 16 : 0 }} key={card.title}>
                <div className="icon">{index === 0 ? '✉' : index === 1 ? '☎' : '📅'}</div>
                <strong>{card.title}</strong>
                <p style={{ color: '#667085' }}>{card.line1}</p>
                <small style={{ color: '#98a2b3' }}>{card.line2}</small>
              </div>
            ))}
          </div>

          <div className="form-card">
            {page?.formHeading ? <h3 style={{ marginBottom: 16 }}>{page.formHeading}</h3> : null}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input className="input" placeholder={formFields[0] ?? 'First name'} />
              <input className="input" placeholder={formFields[1] ?? 'Last name'} />
            </div>
            <input className="input" placeholder={formFields[2] ?? 'Work email'} />
            <input className="input" placeholder={formFields[3] ?? 'Company'} />
            <input className="input" placeholder={formFields[4] ?? 'Phone number'} />
            <select className="input" defaultValue={selectOptions[0] ?? 'Lead Exchange Platform'}>
              {selectOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <textarea className="input" rows={4} placeholder={formFields[5] ?? 'Tell us about your project'} />
            <label className="checkbox">
              <input type="checkbox" />
              <span>{page?.consentText ?? 'I agree to receive communications from Craivings and understand that I can opt out at any time.'}</span>
            </label>
            <button className="btn" style={{ width: '100%' }}>{page?.submitLabel ?? 'Send message'}</button>
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
