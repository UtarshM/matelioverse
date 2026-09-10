'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocation } from '@/context/LocationContext';
import { CATEGORIES } from '@/data/categories';

const PRIVATE_LABEL_BRANDS = [
  { name: 'TileTrendz', desc: 'Vitrified & GVT Tiles', slug: 'tiles' },
  { name: 'Tuffar', desc: 'Fe550D TMT Steel', slug: 'tmt-bars' },
  { name: 'EzyWall', desc: 'AAC Wall Panels', slug: 'aac-wall-panel' },
  { name: 'Bondex', desc: 'Tile Adhesives & Grouts', slug: 'adhesive-waterproofing' },
  { name: 'Sanivo', desc: 'Sanitaryware & Bath', slug: 'bath-fittings-sanitary' },
  { name: 'HydroLine', desc: 'CPVC & UPVC Pipes', slug: 'plumbing' },
  { name: 'CemXtra', desc: 'OPC 53 Grade Cement', slug: 'cement' },
  { name: 'Strongfab', desc: 'Structural Steel', slug: 'structural-steel' },
  { name: 'ReflectoGlass', desc: 'Architectural Glass', slug: 'tiles' },
];

export default function SubNav() {
  const { currentHub } = useLocation();
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>(CATEGORIES[0]?.slug || 'tmt-bars');
  const activeCat = CATEGORIES.find((c) => c.slug === activeCategorySlug) || CATEGORIES[0];

  return (
    <>
      {/* Mobile Sub-Bar: Fast Delivery Tagline */}
      <div className="mob-delivery-strip">
        <div className="site-container mob-delivery-strip-inner">
          <div className="mob-delivery-badge">
            <span className="bolt">⚡</span> Matelio Fast: {currentHub.instantSla}
          </div>
          <div className="mob-delivery-loc-text">
            Hub: {currentHub.name} <span className="chevron">▾</span>
          </div>
        </div>
      </div>

      {/* Secondary Sub-Nav Row */}
      <div className="sub-nav">
        <div className="site-container sub-nav-inner">
          <div className="sub-nav-left categories-nav-item">
            <Link
              href="/categories"
              className="sub-nav-link cat-dropdown-trigger"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                textDecoration: 'none',
                color: '#1E293B',
                fontWeight: 600,
                fontSize: 13.5,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z" />
              </svg>
              <span>Categories &amp; Brands</span>
              <span className="cat-arrow-down">▾</span>
            </Link>

            <div className="categories-dropdown-menu">
              {/* Left Sidebar: 15 Core Categories */}
              <div className="cat-dropdown-sidebar">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategorySlug === cat.slug;
                  return (
                    <div
                      key={cat.id}
                      className={`cat-mega-nav-item ${isActive ? 'active' : ''}`}
                      onMouseEnter={() => setActiveCategorySlug(cat.slug)}
                    >
                      <Link
                        href={`/categories?category=${cat.slug}#${cat.slug}`}
                        className="cat-mega-nav-link"
                      >
                        <div className="cat-mega-nav-info">
                          <div className="cat-mega-nav-name">{cat.name}</div>
                          <div className="cat-mega-nav-brands-preview">
                            {cat.associatedBrands?.slice(0, 3).join(', ')}
                            {cat.associatedBrands && cat.associatedBrands.length > 3 ? '...' : ''}
                          </div>
                        </div>
                        <span className="cat-mega-arrow">›</span>
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Right Detail Panel: Active Category Associated Brands */}
              {activeCat && (
                <div className="cat-mega-detail-panel">
                  {/* Matelio Private Label Brands Showcase Highlight (#FCEFD2) */}
                  <div
                    style={{
                      background: '#FCEFD2',
                      border: '1.5px solid #F59E0B',
                      borderRadius: 12,
                      padding: '12px 14px',
                      marginBottom: 16,
                      boxShadow: '0 2px 8px rgba(180, 83, 9, 0.08)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 11, background: '#F59E0B', color: '#FFFFFF', padding: '2px 6px', borderRadius: 4, fontWeight: 800 }}>⭐ PVT LABEL</span>
                        <span style={{ fontSize: 12, fontWeight: 800, color: '#92400E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Matelioverse Proprietary Brands
                        </span>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#B45309', background: 'rgba(255,255,255,0.8)', padding: '2px 8px', borderRadius: 10 }}>
                        20–35% Dealer Margins
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {PRIVATE_LABEL_BRANDS.map((pvt) => (
                        <Link
                          key={pvt.name}
                          href={`/categories?category=${pvt.slug}&brand=${encodeURIComponent(pvt.name)}#${pvt.slug}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            background: '#FFFFFF',
                            border: '1px solid #FCD34D',
                            color: '#78350F',
                            fontSize: 11.5,
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: 6,
                            textDecoration: 'none',
                          }}
                        >
                          <span>★</span>
                          <span>{pvt.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="cat-mega-detail-header">
                    <div className="cat-mega-detail-thumb">
                      <img src={activeCat.image} alt={activeCat.name} />
                    </div>
                    <div className="cat-mega-detail-meta">
                      <div className="cat-mega-detail-badge">{activeCat.tag || 'Verified Direct Plant'}</div>
                      <h3 className="cat-mega-detail-title">{activeCat.name}</h3>
                      <p className="cat-mega-detail-desc">{activeCat.description}</p>
                    </div>
                  </div>

                  <div className="cat-mega-brands-section">
                    <div className="cat-mega-brands-label">
                      <span>ASSOCIATED VERIFIED BRANDS</span>
                      <span className="cat-mega-brands-count">
                        {activeCat.associatedBrands?.length || 0} Brands
                      </span>
                    </div>

                    <div className="cat-mega-brands-grid">
                      {activeCat.associatedBrands?.map((brand) => {
                        const isPvt = PRIVATE_LABEL_BRANDS.some(
                          (b) => b.name.toLowerCase() === brand.toLowerCase() || brand.toLowerCase().includes(b.name.toLowerCase())
                        );
                        return (
                          <Link
                            key={brand}
                            href={`/categories?category=${activeCat.slug}&brand=${encodeURIComponent(brand)}#${activeCat.slug}`}
                            className="cat-mega-brand-chip"
                            title={`Browse ${brand} ${activeCat.name}`}
                            style={
                              isPvt
                                ? {
                                    background: '#FCEFD2',
                                    borderColor: '#F59E0B',
                                    color: '#92400E',
                                    fontWeight: 700,
                                  }
                                : undefined
                            }
                          >
                            <span className="brand-dot" style={isPvt ? { color: '#D97706' } : undefined}>
                              {isPvt ? '★' : '•'}
                            </span>
                            <span className="brand-name">{brand}</span>
                            {isPvt && (
                              <span
                                style={{
                                  fontSize: 9.5,
                                  background: '#F59E0B',
                                  color: '#FFFFFF',
                                  padding: '1px 5px',
                                  borderRadius: 4,
                                  marginLeft: 4,
                                  fontWeight: 800,
                                }}
                              >
                                PVT
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="cat-mega-bottom-cta">
                    <Link
                      href={`/categories?category=${activeCat.slug}#${activeCat.slug}`}
                      className="cat-mega-explore-btn"
                    >
                      Explore All {activeCat.name} ({activeCat.itemCount || 10}) →
                    </Link>
                    <div className="cat-mega-sla-pill">
                      ⚡ 90-Min Dispatch Available
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="sub-nav-right-links">
            <Link href="/categories" className="sub-link" style={{ fontWeight: 700, color: 'var(--primary-orange)' }}>
              Explore Catalog
            </Link>
            <Link href="/rfq" className="sub-link" style={{ fontWeight: 700, color: 'var(--primary-orange)' }}>
              ⚡ Bulk BOQ Quote
            </Link>
            <Link href="/about" className="sub-link">
              About Us
            </Link>
            <Link href="/partner" className="sub-link">
              Franchise Network
            </Link>
            <Link href="/contact" className="sub-link">
              Contact &amp; Hubs
            </Link>
            <Link href="/partner" className="matelio-star-pill" title="Dealer & Franchise Loyalty Program">
              <svg viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>matelio STAR</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
