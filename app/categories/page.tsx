'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/Commerce/ProductCard';

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSla, setSelectedSla] = useState<'all' | 'instant' | 'scheduled'>('all');
  const [onlyPrivateLabels, setOnlyPrivateLabels] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) return false;
      if (selectedSla !== 'all' && p.slaType !== selectedSla) return false;
      if (onlyPrivateLabels && !p.isPrivateLabel) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchBrand = p.brand.toLowerCase().includes(query);
        const matchCategory = p.category.toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchCategory) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedSla, onlyPrivateLabels, searchQuery]);

  return (
    <div style={{ background: '#F8FAFC', minHeight: '80vh', padding: '24px 0 60px 0' }}>
      <div className="site-container">
        {/* Breadcrumb Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748B', marginBottom: 12 }}>
          <Link href="/" style={{ textDecoration: 'none', color: '#64748B' }}>Home</Link>
          <span>›</span>
          <span style={{ color: '#0F172A', fontWeight: 700 }}>Catalog &amp; Categories</span>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 30, fontWeight: 900, color: '#0F172A', marginBottom: 6 }}>
            Building Materials Catalog
          </h1>
          <p style={{ fontSize: 14, color: '#64748B' }}>
            Verified proprietary brands &amp; essential construction supplies with direct-from-plant wholesale pricing
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 16,
            padding: '16px 20px',
            marginBottom: 28,
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {/* Top Row: Search & Quick Toggles */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by brand, grade, or name..."
                style={{
                  width: '100%',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: 10,
                  padding: '9px 14px',
                  fontSize: 13.5,
                  outline: 'none',
                }}
              />
            </div>

            {/* SLA Toggles */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={() => setSelectedSla('all')}
                style={{
                  padding: '8px 14px',
                  borderRadius: 8,
                  fontSize: 12.5,
                  fontWeight: 700,
                  border: `1.5px solid ${selectedSla === 'all' ? 'var(--primary-green)' : '#CBD5E1'}`,
                  background: selectedSla === 'all' ? '#ECFDF5' : '#FFFFFF',
                  color: selectedSla === 'all' ? '#047857' : '#475569',
                  cursor: 'pointer',
                }}
              >
                All Delivery SLAs
              </button>

              <button
                type="button"
                onClick={() => setSelectedSla('instant')}
                style={{
                  padding: '8px 14px',
                  borderRadius: 8,
                  fontSize: 12.5,
                  fontWeight: 700,
                  border: `1.5px solid ${selectedSla === 'instant' ? 'var(--primary-green)' : '#CBD5E1'}`,
                  background: selectedSla === 'instant' ? '#ECFDF5' : '#FFFFFF',
                  color: selectedSla === 'instant' ? '#047857' : '#475569',
                  cursor: 'pointer',
                }}
              >
                ⚡ Matelio Fast (90 Mins)
              </button>

              <button
                type="button"
                onClick={() => setSelectedSla('scheduled')}
                style={{
                  padding: '8px 14px',
                  borderRadius: 8,
                  fontSize: 12.5,
                  fontWeight: 700,
                  border: `1.5px solid ${selectedSla === 'scheduled' ? '#D97706' : '#CBD5E1'}`,
                  background: selectedSla === 'scheduled' ? '#FEF3C7' : '#FFFFFF',
                  color: selectedSla === 'scheduled' ? '#B45309' : '#475569',
                  cursor: 'pointer',
                }}
              >
                🚚 Heavy Freight
              </button>
            </div>

            {/* Private Label Toggle */}
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: '#0F172A', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={onlyPrivateLabels}
                onChange={(e) => setOnlyPrivateLabels(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: 'var(--primary-green)' }}
              />
              <span>Matelio Brands Only</span>
            </label>
          </div>

          {/* Category Pills Scroller */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
                whiteSpace: 'nowrap',
                border: 'none',
                background: selectedCategory === 'all' ? '#0F172A' : '#F1F5F9',
                color: selectedCategory === 'all' ? '#FFFFFF' : '#475569',
                cursor: 'pointer',
              }}
            >
              All Categories ({PRODUCTS.length})
            </button>

            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              const count = PRODUCTS.filter((p) => p.categorySlug === cat.slug).length;
              return (
                <button
                  key={cat.id}
                  id={cat.slug}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    border: 'none',
                    background: isSelected ? 'var(--primary-green)' : '#F1F5F9',
                    color: isSelected ? '#FFFFFF' : '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {cat.shortName || cat.name} {count > 0 ? `(${count})` : ''}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div style={{ fontSize: 14, color: '#64748B' }}>
            Showing <strong>{filteredProducts.length}</strong> verified materials
          </div>
          <Link
            href="/rfq"
            style={{ fontSize: 13, fontWeight: 700, color: '#D97706', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <span>Need Custom Tonnage or Wholesale BOQ? Request Quote →</span>
          </Link>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '48px 24px', textAlign: 'center' }}>
            <span style={{ fontSize: 40, display: 'block', marginBottom: 10 }}>🔍</span>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>No matching materials found</h3>
            <p style={{ fontSize: 13.5, color: '#64748B', maxWidth: 360, margin: '0 auto 16px auto' }}>
              Try loosening your filters or search keywords, or submit an RFQ to get custom sourcing.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSla('all');
                setOnlyPrivateLabels(false);
                setSearchQuery('');
              }}
              style={{
                background: 'var(--primary-green)',
                color: '#fff',
                fontSize: 13,
                fontWeight: 700,
                padding: '8px 20px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
