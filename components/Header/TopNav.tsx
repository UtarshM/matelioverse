'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLocation } from '@/context/LocationContext';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

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
  const { user, isLoggedIn, logout, openLoginModal } = useAuth();
  const [searchPlaceholder, setSearchPlaceholder] = useState('Search "TileTrendz"');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
                <span style={{ fontWeight: 800, color: 'var(--primary-orange)' }}>Matelio Fast</span>
                <span style={{ fontSize: 10, background: 'var(--secondary-mint)', color: 'var(--secondary-green)', padding: '1px 5px', borderRadius: 4, fontWeight: 800 }}>
                  {currentHub.instantSla.includes('90') ? '90 Mins' : '2 Hours'}
                </span>
              </div>
              <div className="delivery-location-row" style={{ fontSize: 11.5, color: '#475569', fontWeight: 600 }}>
                {currentHub.name} · {pincode} <span style={{ color: 'var(--primary-orange)' }}>▾</span>
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

          {/* User Profile Dropdown or Login Button */}
          {isLoggedIn && user ? (
            <div ref={userMenuRef} style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#0E3128',
                  color: '#FFFFFF',
                  padding: '5px 12px 5px 6px',
                  borderRadius: 24,
                  border: '1.5px solid #1C5A4A',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(14, 49, 40, 0.2)',
                  transition: 'all 0.2s ease',
                }}
                aria-expanded={isUserMenuOpen}
                aria-label="User Account Menu"
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: 'var(--primary-orange)',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textTransform: 'uppercase',
                  }}
                >
                  {user.name.charAt(0)}
                </div>
                <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF', maxWidth: 100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user.name.split(' ')[0]}
                  </div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#FCEFD2', textTransform: 'capitalize' }}>
                    {user.role}
                  </div>
                </div>
                <span style={{ fontSize: 10, color: '#C2ECCA', marginLeft: 2 }}>▾</span>
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: 240,
                    background: '#FFFFFF',
                    borderRadius: 14,
                    boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
                    border: '1px solid #E2E8F0',
                    zIndex: 1000,
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ padding: '12px 14px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    <div style={{ fontWeight: 800, fontSize: 13, color: '#0F172A' }}>{user.name}</div>
                    {user.businessName && (
                      <div style={{ fontSize: 11, color: '#64748B', marginTop: 1 }}>{user.businessName}</div>
                    )}
                    <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 3 }}>+91 {user.phone}</div>
                    {user.gstin && (
                      <div style={{ fontSize: 10, color: '#059669', fontWeight: 700, marginTop: 4 }}>
                        GSTIN: {user.gstin}
                      </div>
                    )}
                  </div>

                  <div style={{ padding: '6px 0' }}>
                    <Link
                      href="/rfq"
                      onClick={() => setIsUserMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '9px 14px',
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: '#334155',
                        textDecoration: 'none',
                      }}
                    >
                      <span>📋</span>
                      <span>My BOQ / RFQ Quotes</span>
                    </Link>
                    <Link
                      href="/partner"
                      onClick={() => setIsUserMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '9px 14px',
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: '#334155',
                        textDecoration: 'none',
                      }}
                    >
                      <span>🤝</span>
                      <span>Partner Hub &amp; Margins</span>
                    </Link>
                    <Link
                      href="/categories"
                      onClick={() => setIsUserMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '9px 14px',
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: '#334155',
                        textDecoration: 'none',
                      }}
                    >
                      <span>🛒</span>
                      <span>Order Materials</span>
                    </Link>
                  </div>

                  <div style={{ borderTop: '1px solid #F1F5F9', padding: '6px 0' }}>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '9px 14px',
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: '#EF4444',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <span>🚪</span>
                      <span>Sign Out / Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              className="nav-login-pill"
              id="nav-login-btn"
              onClick={() => {
                openLoginModal('login');
                onOpenLoginModal();
              }}
            >
              Login
            </button>
          )}

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
