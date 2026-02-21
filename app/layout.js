import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800']
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Craivings',
  description: 'AI-powered lead exchange infrastructure.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={plusJakarta.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
