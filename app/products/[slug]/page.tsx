import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/Commerce/ProductCard';
import ProductDetailClient from './ProductDetailClient';

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) return {};

  return {
    title: `${product.name} | Direct Wholesale Price | Matelioverse`,
    description: `${product.name} (${product.brand}) available at ₹${product.sellingPrice} per ${product.unit}. ${product.description.slice(0, 150)}... Certified by BuilditIndia.`,
    openGraph: {
      title: `${product.name} — Matelioverse`,
      description: `Buy ${product.name} with wholesale slab pricing. Delivery SLA: ${product.deliverySla}.`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 4);

  const jsonLdProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    sku: product.id,
    offers: {
      '@type': 'Offer',
      url: `https://matelioverse.com/products/${product.slug}`,
      priceCurrency: 'INR',
      price: product.sellingPrice,
      priceValidUntil: '2026-12-31',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />

      <div style={{ background: '#F8FAFC', minHeight: '90vh', padding: '24px 0 60px 0' }}>
        <div className="site-container">
          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748B', marginBottom: 20 }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#64748B' }}>Home</Link>
            <span>›</span>
            <Link href="/categories" style={{ textDecoration: 'none', color: '#64748B' }}>Categories</Link>
            <span>›</span>
            <Link href={`/categories#${product.categorySlug}`} style={{ textDecoration: 'none', color: '#64748B' }}>
              {product.category}
            </Link>
            <span>›</span>
            <span style={{ color: '#0F172A', fontWeight: 700 }}>{product.name}</span>
          </div>

          {/* Interactive PDP Client Component */}
          <ProductDetailClient product={product} />

          {/* Related Items Section */}
          {relatedProducts.length > 0 && (
            <div style={{ marginTop: 60 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Related Materials in {product.category}
                  </h3>
                  <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0 0' }}>
                    Sourced from verified plants with direct freight dispatch
                  </p>
                </div>
                <Link
                  href={`/categories#${product.categorySlug}`}
                  style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary-green)', textDecoration: 'none' }}
                >
                  View Category ›
                </Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
