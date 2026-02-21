import Link from 'next/link';

export default function Nav({ active }) {
  return (
    <div className="nav-wrap">
      <header className="container nav">
        <Link className="logo brand" href="/">
          <img className="logo-img" src="/logo.png" alt="Craivings logo" />
        </Link>
        <nav className="nav-links">
          <Link href="/" className={active === 'home' ? 'active' : ''}>Home</Link>
          <Link href="/about" className={active === 'about' ? 'active' : ''}>About</Link>
          <Link href="/blog" className={active === 'blog' ? 'active' : ''}>Blog</Link>
          <Link href="/contact" className={active === 'contact' ? 'active' : ''}>Contact</Link>
        </nav>
        <div className="nav-actions">
          <Link href="/#how" className="nav-link">View How It Works</Link>
          <Link href="/login" className="btn">Get Started</Link>
        </div>
      </header>
    </div>
  );
}
