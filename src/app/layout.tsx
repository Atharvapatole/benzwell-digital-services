import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://digital.benzwell.in'),
  title: {
    default: 'BenzWell – Professional Website Development Plans & Digital Solutions',
    template: '%s | BenzWell',
  },
  description:
    'Build your online business presence with professionally designed websites, customized business solutions and powerful admin dashboards. Transparent pricing, 1-year hosting included.',
  keywords: [
    'BenzWell',
    'Website Development',
    'Website Development India',
    'Professional Website Design',
    'Small Business Website Packages',
    'Full Stack Web Development',
    'Admin Dashboard Websites',
    'Transparent Website Pricing',
  ],
  authors: [{ name: 'BenzWell', url: 'https://digital.benzwell.in' }],
  creator: 'BenzWell',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://digital.benzwell.in',
    title: 'BenzWell – Website Development Plans & Lead Management Platform',
    description:
      'Professional websites, customized business solutions, and powerful admin dashboards with 100% transparent pricing and 1-year hosting included.',
    siteName: 'BenzWell',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BenzWell – Website Development Plans',
    description:
      'Professional websites, customized business solutions and powerful admin dashboards.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'BenzWell',
    image: 'https://digital.benzwell.in/logo.png',
    '@id': 'https://digital.benzwell.in',
    url: 'https://digital.benzwell.in',
    telephone: '+919876543210',
    priceRange: '₹7,999 - ₹19,999',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    description:
      'Professional website development, custom business layouts, and full-stack admin dashboard websites for business owners.',
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
