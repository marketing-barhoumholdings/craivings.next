import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="logo" style={{ marginBottom: 12 }}>
            <img className="logo-img" src="/logo.png" alt="Craivings logo" />
          </div>
          <p>The AI-powered lead exchange infrastructure for modern sales teams.</p>
        </div>
        <div>
          <strong>Product</strong>
          <p>Features</p>
          <p>Pricing</p>
          <p>Integrations</p>
          <p>API</p>
        </div>
        <div>
          <strong>Company</strong>
          <p>About</p>
          <p>Blog</p>
          <p>Careers</p>
          <p>Contact</p>
        </div>
        <div>
          <strong>Support</strong>
          <p>Documentation</p>
          <p>Help Center</p>
          <p>Community</p>
          <p>Status</p>
        </div>
      </div>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 24, color: '#98a2b3', fontSize: 12, flexWrap: 'wrap' }}>
        <span>? 2024 Craivings. All rights reserved.</span>
        <div style={{ display: 'flex', gap: 16 }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
