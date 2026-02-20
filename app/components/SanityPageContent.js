import { PortableText } from '@portabletext/react';

export default function SanityPageContent({ page }) {
  if (!page?.content?.length) return null;

  return (
    <section className="section">
      <div className="container">
        <div className="sanity-content">
          <PortableText value={page.content} />
        </div>
      </div>
    </section>
  );
}
