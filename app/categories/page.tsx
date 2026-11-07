'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';
import { Product } from '@/types';
import categoryCountsData from '@/data/category_counts.json';
import ProductCard from '@/components/Commerce/ProductCard';

const PVT_BRANDS = [
  'TileTrendz',
  'Tuffar',
  'EzyWall',
  'Bondex',
  'Sanivo',
  'HydroLine',
  'Hydrolines',
  'CemXtra',
  'Xtra-Cam',
  'Strongfab',
  'ReflectoGlass',
];

const CATEGORY_ALIASES: Record<string, { categorySlug: string; brand?: string }> = {
  'tmt-steel': { categorySlug: 'tmt-bars', brand: 'Tuffar' },
  'tmt': { categorySlug: 'tmt-bars' },
  'steel': { categorySlug: 'tmt-bars' },
  'cement-ggbs': { categorySlug: 'cement', brand: 'CemXtra' },
  'aac-panels': { categorySlug: 'aac-wall-panel', brand: 'EzyWall' },
  'tiles-surfaces': { categorySlug: 'tiles', brand: 'TileTrendz' },
  'plumbing-pipes': { categorySlug: 'plumbing', brand: 'HydroLine' },
  'sanitaryware': { categorySlug: 'bath-fittings-sanitary', brand: 'Sanivo' },
  'adhesives-chemicals': { categorySlug: 'adhesive-waterproofing', brand: 'Bondex' },
  'structural-steel': { categorySlug: 'structural-steel', brand: 'Strongfab' },
  'safety-equipment': { categorySlug: 'safety-equipment', brand: 'SafeSite' },
  'architectural-glass': { categorySlug: 'tiles' },
};

const CATEGORY_COUNTS: Record<string, number> = categoryCountsData;
const TOTAL_CATALOG_COUNT = 11822;

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedSla, setSelectedSla] = useState<'all' | 'instant' | 'scheduled'>('all');
  const [onlyPrivateLabels, setOnlyPrivateLabels] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectCategory = (slug: string) => {
    setSelectedCategory(slug);
    setSelectedBrand('all');
  };

  // Auto-select category, brand, and search query from URL search params or hash
  useEffect(() => {
    const syncFromUrl = () => {
      if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        const qCat = searchParams.get('category');
        const qBrand = searchParams.get('brand');
        const qSearch = searchParams.get('q') || searchParams.get('search');
        const rawHash = (window.location.hash || '').replace(/^#/, '').trim();

        if (qSearch !== null && qSearch !== undefined) {
          setSearchQuery(qSearch);
        }

        const target = qCat || rawHash;
        if (target) {
          // Direct Category match
          const catExists = CATEGORIES.find((c) => c.slug === target);
          if (catExists) {
            setSelectedCategory(target);
            if (qBrand) {
              setSelectedBrand(qBrand);
            } else {
              setSelectedBrand('all');
            }
            return;
          }

          // Alias match
          if (CATEGORY_ALIASES[target]) {
            const alias = CATEGORY_ALIASES[target];
            setSelectedCategory(alias.categorySlug);
            if (qBrand) {
              setSelectedBrand(qBrand);
            } else if (alias.brand) {
              setSelectedBrand(alias.brand);
            } else {
              setSelectedBrand('all');
            }
            return;
          }

          // Direct Brand match
          const brandMatch = PVT_BRANDS.find((b) => b.toLowerCase() === target.toLowerCase());
          if (brandMatch) {
            setSelectedCategory('all');
            setSelectedBrand(brandMatch);
            return;
          }
        }

        if (qBrand) {
          setSelectedBrand(qBrand);
        }
      }
    };

    syncFromUrl();
    window.addEventListener('hashchange', syncFromUrl);
    window.addEventListener('popstate', syncFromUrl);
    return () => {
      window.removeEventListener('hashchange', syncFromUrl);
      window.removeEventListener('popstate', syncFromUrl);
    };
  }, []);

  const activeBrands = useMemo(() => {
    if (selectedCategory === 'all') {
      const brandSet = new Set<string>();
      CATEGORIES.forEach((c) => {
        c.associatedBrands?.forEach((b) => brandSet.add(b));
      });
      return Array.from(brandSet).slice(0, 16);
    }
    const cat = CATEGORIES.find((c) => c.slug === selectedCategory);
    return cat?.associatedBrands || [];
  }, [selectedCategory]);

  const PAGE_SIZE = 36;
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, selectedSla, onlyPrivateLabels, searchQuery]);


  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(TOTAL_CATALOG_COUNT);
  const [totalPages, setTotalPages] = useState<number>(Math.ceil(TOTAL_CATALOG_COUNT / PAGE_SIZE));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isCancelled = false;
    const fetchCatalog = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        params.set('page', currentPage.toString());
        params.set('limit', PAGE_SIZE.toString());
        if (selectedCategory !== 'all') params.set('category', selectedCategory);
        if (selectedBrand !== 'all') params.set('brand', selectedBrand);
        if (selectedSla !== 'all') params.set('sla', selectedSla);
        if (onlyPrivateLabels) params.set('pvt', 'true');
        if (searchQuery.trim()) params.set('q', searchQuery.trim());

        const res = await fetch(`/api/products?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch materials');
        const data = await res.json();
        if (!isCancelled) {
          setProducts(data.products || []);
          setTotalProducts(data.total || 0);
          setTotalPages(data.totalPages || 1);
        }
      } catch (err) {
        console.error('Catalog fetch error:', err);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    fetchCatalog();
    return () => {
      isCancelled = true;
    };
  }, [currentPage, selectedCategory, selectedBrand, selectedSla, onlyPrivateLabels, searchQuery]);

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
            Verified proprietary brands &amp; essential construction supplies across 15 core categories with direct-from-plant wholesale pricing
          </p>
        </div>

        {/* Matelio Private Label Brands Highlight Banner (#FCEFD2) */}
        <div
          style={{
            background: '#FCEFD2',
            border: '1.5px solid #F59E0B',
            borderRadius: 16,
            padding: '16px 20px',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            boxShadow: '0 2px 10px rgba(180, 83, 9, 0.08)',
          }}
        >
          <div style={{ maxWidth: 700 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 11, background: '#F59E0B', color: '#FFFFFF', padding: '2px 8px', borderRadius: 6, fontWeight: 800 }}>
                ⭐ PROPRIETARY PRIVATE LABELS
              </span>
              <span style={{ fontSize: 12, fontWeight: 800, color: '#92400E' }}>
                Higher Margins (20–35%) · Direct Plant Supply
              </span>
            </div>
            <p style={{ fontSize: 12.5, color: '#78350F', margin: 0, lineHeight: 1.4 }}>
              Boost retail profitability with Matelioverse certified own-brands: <strong>TileTrendz, Tuffar Steel, EzyWall Panels, Bondex, Sanivo, HydroLine, CemXtra, Strongfab, ReflectoGlass</strong>.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOnlyPrivateLabels(!onlyPrivateLabels)}
            style={{
              padding: '8px 18px',
              borderRadius: 20,
              fontSize: 12.5,
              fontWeight: 800,
              border: '1.5px solid #D97706',
              background: onlyPrivateLabels ? '#D97706' : '#FFFFFF',
              color: onlyPrivateLabels ? '#FFFFFF' : '#92400E',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 2px 6px rgba(180, 83, 9, 0.15)',
            }}
          >
            <span>{onlyPrivateLabels ? '✓ Showing Own Brands' : '⭐ View Own Brands Only'}</span>
          </button>
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
            <div style={{ flex: 1, minWidth: 'min(260px, 100%)' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by brand (e.g. Hindware, JSW, Dr. Fixit, UltraTech)..."
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
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setSelectedSla('all')}
                style={{
                  padding: '8px 14px',
                  borderRadius: 8,
                  fontSize: 12.5,
                  fontWeight: 700,
                  border: `1.5px solid ${selectedSla === 'all' ? 'var(--primary-orange)' : '#CBD5E1'}`,
                  background: selectedSla === 'all' ? 'var(--primary-orange-light)' : '#FFFFFF',
                  color: selectedSla === 'all' ? 'var(--primary-orange-active)' : '#475569',
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
                  border: `1.5px solid ${selectedSla === 'instant' ? 'var(--primary-orange)' : '#CBD5E1'}`,
                  background: selectedSla === 'instant' ? 'var(--secondary-mint)' : '#FFFFFF',
                  color: selectedSla === 'instant' ? 'var(--secondary-green)' : '#475569',
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
                  border: `1.5px solid ${selectedSla === 'scheduled' ? 'var(--primary-orange)' : '#CBD5E1'}`,
                  background: selectedSla === 'scheduled' ? 'var(--primary-orange-tint)' : '#FFFFFF',
                  color: selectedSla === 'scheduled' ? 'var(--primary-orange-active)' : '#475569',
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
                style={{ width: 16, height: 16, accentColor: 'var(--primary-orange)' }}
              />
              <span>Matelio Brands Only</span>
            </label>
          </div>

          {/* Category Pills Scroller */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBrand('all');
              }}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
                whiteSpace: 'nowrap',
                border: 'none',
                background: selectedCategory === 'all' ? 'var(--secondary-green)' : '#F1F5F9',
                color: selectedCategory === 'all' ? '#FFFFFF' : '#475569',
                cursor: 'pointer',
              }}
            >
              All Categories ({TOTAL_CATALOG_COUNT.toLocaleString()})
            </button>

            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              const count = CATEGORY_COUNTS[cat.slug] || 0;
              return (
                <button
                  key={cat.id}
                  id={cat.slug}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setSelectedBrand('all');
                  }}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    border: 'none',
                    background: isSelected ? 'var(--primary-orange)' : '#F1F5F9',
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

          {/* Associated Brands Filter Chips */}
          {activeBrands.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflowX: 'auto', paddingTop: 10, borderTop: '1px dashed #E2E8F0' }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: '#64748B', whiteSpace: 'nowrap' }}>
                🏷️ Brands:
              </span>
              <button
                type="button"
                onClick={() => setSelectedBrand('all')}
                style={{
                  padding: '4px 10px',
                  borderRadius: 14,
                  fontSize: 11.5,
                  fontWeight: selectedBrand === 'all' ? 700 : 500,
                  whiteSpace: 'nowrap',
                  border: selectedBrand === 'all' ? '1.5px solid var(--primary-green)' : '1px solid #CBD5E1',
                  background: selectedBrand === 'all' ? 'var(--secondary-mint)' : '#FFFFFF',
                  color: selectedBrand === 'all' ? 'var(--secondary-green)' : '#475569',
                  cursor: 'pointer',
                }}
              >
                All Brands
              </button>
              {activeBrands.map((brand) => {
                const isBrandSelected = selectedBrand === brand;
                const isPvt = PVT_BRANDS.some(
                  (b) => b.toLowerCase() === brand.toLowerCase() || brand.toLowerCase().includes(b.toLowerCase())
                );
                return (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => setSelectedBrand(isBrandSelected ? 'all' : brand)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 14,
                      fontSize: 11.5,
                      fontWeight: isBrandSelected || isPvt ? 700 : 500,
                      whiteSpace: 'nowrap',
                      border: isBrandSelected
                        ? '1.5px solid var(--primary-orange)'
                        : isPvt
                        ? '1px solid #F59E0B'
                        : '1px solid #CBD5E1',
                      background: isBrandSelected
                        ? 'var(--primary-orange-light)'
                        : isPvt
                        ? '#FCEFD2'
                        : '#FFFFFF',
                      color: isBrandSelected
                        ? 'var(--primary-orange-active)'
                        : isPvt
                        ? '#92400E'
                        : '#475569',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {isPvt && <span style={{ marginRight: 3 }}>⭐</span>}
                    {brand}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontSize: 14, color: '#64748B' }}>
            Showing <strong>{totalProducts > 0 ? (currentPage - 1) * PAGE_SIZE + 1 : 0}–{Math.min(currentPage * PAGE_SIZE, totalProducts)}</strong> of <strong>{totalProducts.toLocaleString()}</strong> verified materials
            {selectedCategory !== 'all' && (
              <span> in <em>{CATEGORIES.find((c) => c.slug === selectedCategory)?.name}</em></span>
            )}
            {selectedBrand !== 'all' && (
              <span> by <strong>{selectedBrand}</strong></span>
            )}
          </div>
          <Link
            href="/rfq"
            style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary-orange)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <span>Need Custom Tonnage or Wholesale BOQ? Request Quote →</span>
          </Link>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '48px 24px', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', width: 32, height: 32, border: '3px solid #E2E8F0', borderTopColor: 'var(--primary-green)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ marginTop: 12, fontSize: 14, fontWeight: 700, color: '#64748B' }}>Loading verified materials...</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '48px 24px', textAlign: 'center' }}>
            <span style={{ fontSize: 40, display: 'block', marginBottom: 10 }}>🔍</span>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>No matching materials found</h3>
            <p style={{ fontSize: 13.5, color: '#64748B', maxWidth: 360, margin: '0 auto 16px auto' }}>
              Try loosening your brand or delivery filters, or submit an RFQ to get custom factory sourcing.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBrand('all');
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
          <>
            <div className="categories-product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {products.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 42, flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                style={{
                  padding: '9px 16px',
                  borderRadius: 10,
                  border: '1.5px solid #E2E8F0',
                  background: currentPage === 1 ? '#F1F5F9' : '#FFFFFF',
                  color: currentPage === 1 ? '#94A3B8' : '#0F172A',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                ← Prev
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = currentPage;
                if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                if (pageNum < 1 || pageNum > totalPages) return null;
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      border: isActive ? '2px solid var(--primary-green)' : '1.5px solid #E2E8F0',
                      background: isActive ? 'var(--primary-green)' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#334155',
                      fontSize: 13,
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                style={{
                  padding: '9px 16px',
                  borderRadius: 10,
                  border: '1.5px solid #E2E8F0',
                  background: currentPage === totalPages ? '#F1F5F9' : '#FFFFFF',
                  color: currentPage === totalPages ? '#94A3B8' : '#0F172A',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Next →
              </button>
              <span style={{ fontSize: 13, color: '#64748B', marginLeft: 10 }}>
                Page {currentPage} of {totalPages}
              </span>
            </div>
          )}
          </>
        )}
      </div>
    </div>
  );
}
