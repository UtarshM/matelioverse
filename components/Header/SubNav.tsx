'use client';

import React from 'react';
import Link from 'next/link';
import { useLocation } from '@/context/LocationContext';

export default function SubNav() {
  const { currentHub } = useLocation();

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
              <Link href="/categories#cement-ggbs" className="cat-dropdown-item">
                CemXtra (OPC 53 Cement &amp; GGBS) <span>›</span>
              </Link>
              <Link href="/categories#aac-panels" className="cat-dropdown-item">
                EzyWall (AAC Lightweight Wall Panels) <span>›</span>
              </Link>
              <Link href="/categories#tmt-steel" className="cat-dropdown-item">
                Tuffar (Fe550D TMT Steel Rebars) <span>›</span>
              </Link>
              <Link href="/categories#tiles-surfaces" className="cat-dropdown-item">
                TileTrendz (GVT &amp; Vitrified Tiles) <span>›</span>
              </Link>
              <Link href="/categories#plumbing-pipes" className="cat-dropdown-item">
                HydroLine (CPVC / UPVC Piping) <span>›</span>
              </Link>
              <Link href="/categories#sanitaryware" className="cat-dropdown-item">
                Sanivo (Sanitaryware &amp; CP Fixtures) <span>›</span>
              </Link>
              <Link href="/categories#structural-steel" className="cat-dropdown-item">
                Strongfab (Structural Beams &amp; PEB Steel) <span>›</span>
              </Link>
              <Link href="/categories#architectural-glass" className="cat-dropdown-item">
                ReflectoGlass (Architectural Toughened Glass) <span>›</span>
              </Link>
              <Link href="/categories#adhesives-chemicals" className="cat-dropdown-item">
                Bondex (Tile Adhesives &amp; Waterproofing) <span>›</span>
              </Link>
            </div>
          </div>

          <div className="sub-nav-right-links">
            <Link href="/categories" className="sub-link" style={{ fontWeight: 700, color: 'var(--primary-green)' }}>
              Explore Catalog
            </Link>
            <Link href="/rfq" className="sub-link" style={{ fontWeight: 700, color: '#D97706' }}>
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
