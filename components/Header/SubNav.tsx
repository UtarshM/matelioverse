'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocation } from '@/context/LocationContext';
import { CATEGORIES } from '@/data/categories';

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
                      {activeCat.associatedBrands?.map((brand) => (
                        <Link
                          key={brand}
                          href={`/categories?category=${activeCat.slug}&brand=${encodeURIComponent(brand)}#${activeCat.slug}`}
                          className="cat-mega-brand-chip"
                          title={`Browse ${brand} ${activeCat.name}`}
                        >
                          <span className="brand-dot">•</span>
                          <span className="brand-name">{brand}</span>
                        </Link>
                      ))}
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
