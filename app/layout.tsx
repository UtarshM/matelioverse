import type { Metadata } from 'next';
import './globals.css';
import { LocationProvider } from '@/context/LocationContext';
import { CartProvider } from '@/context/CartContext';
import ClientShell from '@/components/Shared/ClientShell';

export const metadata: Metadata = {
  metadataBase: new URL('https://matelioverse.com'),
  title: {
    default: 'Matelioverse — India’s Smartest Building Materials & Quick-Commerce Platform',
    template: '%s | Matelioverse',
  },
  description: 'Order certified building materials with Matelio Fast (90 mins to same-day delivery). Direct plant pricing on CemXtra Cement, Tuffar TMT, EzyWall AAC Panels, TileTrendz, HydroLine, and Sanivo. Backed by BuilditIndia.',
  keywords: [
    'building materials India',
    'quick commerce construction',
    'TMT bars 12mm 16mm',
    'OPC 53 cement',
    'AAC wall panels',
    'vitrified tiles manufacturer',
    'CPVC plumbing pipes',
    'B2B construction credit',
    'BOQ quotation Ahmedabad',
    'BuilditIndia',
  ],
  authors: [{ name: 'Matelioverse & BuilditIndia' }],
  creator: 'Matelioverse',
  publisher: 'BuilditIndia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://matelioverse.com',
    siteName: 'Matelioverse',
    title: 'Matelioverse — India’s Smartest Building Materials & Quick-Commerce Platform',
    description: 'Fast delivery on construction materials with verified private labels: CemXtra, Tuffar TMT, EzyWall AAC, and TileTrendz. Up to ₹25 Lakhs B2B credit line.',
    images: [
      {
        url: 'https://api.matelioverse.com/assets/e0847d46-2489-475e-8dfc-e7b520e1df15',
        width: 1200,
        height: 630,
        alt: 'Matelioverse Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matelioverse — India’s Smartest Building Materials Platform',
    description: '90-min to same-day delivery for contractors, builders, and dealers across India. Backed by BuilditIndia.',
    images: ['https://api.matelioverse.com/assets/e0847d46-2489-475e-8dfc-e7b520e1df15'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: 'https://matelioverse.com/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Matelioverse',
    url: 'https://matelioverse.com',
    logo: 'https://api.matelioverse.com/assets/e0847d46-2489-475e-8dfc-e7b520e1df15',
    description: "India's smartest quick-commerce building materials platform backed by BuilditIndia.",
    parentOrganization: {
      '@type': 'Organization',
      name: 'BuilditIndia',
      url: 'https://builditindia.com',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'BuilditIndia HQ, Lubi Corporate Rd, opp. Ratnam Auram, rode, Zundal',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: '382421',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-98249-39888',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi', 'gu'],
    },
  };

  return (
    <html lang="en-IN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
      </head>
      <body>
        <LocationProvider>
          <CartProvider>
            <ClientShell>{children}</ClientShell>
          </CartProvider>
        </LocationProvider>
      </body>
    </html>
  );
}
