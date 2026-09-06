'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocation } from '@/context/LocationContext';
import { useCart } from '@/context/CartContext';

interface TopNavProps {
  onOpenMobileDrawer: () => void;
  onOpenLoginModal: () => void;
  onOpenLoyaltyModal: () => void;
}

export default function TopNav({
  onOpenMobileDrawer,
  onOpenLoginModal,
  onOpenLoyaltyModal,
}: TopNavProps) {
  const { currentHub, pincode, openLocationModal } = useLocation();
  const { cartCount, setIsCartOpen } = useCart();
  const [searchPlaceholder, setSearchPlaceholder] = useState('Search "TileTrendz"');

  const searchPhrases = [
    'Search "TileTrendz GVT Tiles"',
    'Search "EzyWall AAC Panels"',
    'Search "Tuffar Fe550D TMT"',
    'Search "CemXtra OPC 53 Cement"',
    'Search "Sanivo Sanitaryware"',
    'Search "HydroLine CPVC Pipes"',
    'Search "Bondex Tile Adhesives"',
    'Search "Strongfab Structural Steel"',
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % searchPhrases.length;
      setSearchPlaceholder(searchPhrases[index]);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="top-nav">
      <div className="site-container top-nav-inner">
        {/* Left: Hamburger & Logo & Delivery Promise */}
        <div className="nav-left-group">
          <button
            type="button"
            className="mob-hamburger-btn"
            id="mob-hamburger-btn"
            aria-label="Open Navigation Menu"
            onClick={onOpenMobileDrawer}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <Link href="/" className="brand-logo-wrap" aria-label="Matelioverse Homepage">
            <img
              src="https://api.matelioverse.com/assets/e0847d46-2489-475e-8dfc-e7b520e1df15"
              alt="Matelioverse — India's Smartest Building Materials Platform"
              className="brand-logo-img"
              width={160}
              height={30}
            />
          </Link>

          {/* Quick Commerce Delivery Promise & Location Selector */}
          <button
            type="button"
            onClick={openLocationModal}
            className="delivery-picker-btn"
            id="delivery-picker"
            style={{ textAlign: 'left' }}
            title="Click to change delivery city or pincode"
          >
            <div className="delivery-lightning" style={{ animation: 'pulse 1.5s infinite' }}>⚡</div>
            <div className="delivery-text-wrap">
              <div className="delivery-title-row" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontWeight: 800, color: 'var(--primary-green)' }}>Matelio Fast</span>
                <span style={{ fontSize: 10, background: '#ECFDF5', color: '#047857', padding: '1px 5px', borderRadius: 4, fontWeight: 800 }}>
                  {currentHub.instantSla.includes('90') ? '90 Mins' : '2 Hours'}
                </span>
              </div>
              <div className="delivery-location-row" style={{ fontSize: 11.5, color: '#475569', fontWeight: 600 }}>
                {currentHub.name} · {pincode} <span style={{ color: '#00A86B' }}>▾</span>
              </div>
            </div>
          </button>
        </div>

        {/* Center: Search Bar with AI Quick Match */}
        <div className="top-search-wrap">
          <div className="top-search-inner">
            <input
              type="search"
              id="top-search-input"
              className="top-search-input"
              placeholder={searchPlaceholder}
              autoComplete="off"
              aria-label="Search Matelioverse categories and brands"
            />
            <Link
              href="/rfq"
              className="top-search-ai-btn"
              aria-label="Search with AI or Instant BOQ Quote"
              title="Get Magic AI BOQ Quote in 60s"
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1.27c.34-.6.99-1 1.73-1a2 2 0 010 4c-.74 0-1.39-.4-1.73-1H20a7 7 0 01-7 7v1.27c.6.34 1 .99 1 1.73a2 2 0 01-4 0c0-.74.4-1.39 1-1.73V23a7 7 0 01-7-7H2.73c-.34.6-.99 1-1.73 1a2 2 0 010-4c.74 0 1.39.4 1.73 1H4a7 7 0 017-7V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z" />
              </svg>
              <span>AI Quote</span>
            </Link>
          </div>
        </div>

        {/* Right: Referral/Cashback, Login, Cart */}
        <div className="top-nav-actions">
          {/* Matelio Cash / Refer & Earn */}
          <button
            type="button"
            onClick={onOpenLoyaltyModal}
            className="referral-pill-btn"
            aria-label="Refer and Earn"
            title="Refer an infra colleague and both get ₹1000 cashback"
          >
            <span className="referral-gift-icon">🎁</span>
            <div className="referral-text-stack">
              <span className="referral-label-sm">Matelio Cash</span>
              <span className="referral-label-lg">Get ₹1,000</span>
            </div>
          </button>

          {/* Login Button */}
          <button
            type="button"
            className="nav-login-pill"
            id="nav-login-btn"
            onClick={onOpenLoginModal}
          >
            Login
          </button>

          {/* Quick-Commerce Persistent Cart Button */}
          <button
            type="button"
            className="nav-cart-btn"
            aria-label="View Cart"
            onClick={() => setIsCartOpen(true)}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span>Cart</span>
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: -4,
                  right: -6,
                  background: '#EF4444',
                  color: '#FFFFFF',
                  fontSize: 10.5,
                  fontWeight: 800,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)',
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
