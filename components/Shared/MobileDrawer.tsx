'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

export default function MobileDrawer({ isOpen, onClose, onOpenLogin }: MobileDrawerProps) {
  const { user, isLoggedIn, logout, openLoginModal } = useAuth();
  if (!isOpen) return null;

  return (
    <div
      className="mobile-drawer-overlay active"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="mobile-drawer-card">
        <div className="mob-drawer-header">
          <img
            src="https://api.matelioverse.com/assets/e0847d46-2489-475e-8dfc-e7b520e1df15"
            alt="Matelioverse"
            style={{ height: 24, width: 'auto' }}
          />
          <button type="button" className="mob-drawer-close-btn" aria-label="Close menu" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="mob-drawer-body">
          <div className="mob-drawer-section-title">EXPLORE MATELIOVERSE</div>
          <Link href="/" className="mob-drawer-link" onClick={onClose}>
            <span>🏠</span> <span>Home</span>
          </Link>
          <Link href="/categories" className="mob-drawer-link" onClick={onClose}>
            <span>⊞</span> <span>Products &amp; Categories</span>
            <span className="mob-badge-new">QUICK ADD</span>
          </Link>
          <Link href="/rfq" className="mob-drawer-link" onClick={onClose}>
            <span>📄</span> <span>Bulk BOQ Quote</span>
            <span className="mob-badge-hot">INSTANT</span>
          </Link>
          <Link href="/partner" className="mob-drawer-link" onClick={onClose}>
            <span>🤝</span> <span>Partner With Us</span>
            <span className="mob-badge-hot">FRANCHISE</span>
          </Link>
          <Link href="/about" className="mob-drawer-link" onClick={onClose}>
            <span>🏢</span> <span>About Us</span>
          </Link>
          <Link href="/contact" className="mob-drawer-link" onClick={onClose}>
            <span>✉️</span> <span>Contact &amp; Hubs</span>
          </Link>

          <div className="mob-drawer-divider"></div>

          <div
            style={{
              background: '#FCEFD2',
              border: '1px solid #F59E0B',
              borderRadius: 14,
              padding: '12px 10px',
              marginBottom: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, padding: '0 4px' }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#92400E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                ⭐ Matelio Private Labels
              </span>
              <span style={{ fontSize: 9.5, fontWeight: 800, background: '#F59E0B', color: '#FFFFFF', padding: '1px 5px', borderRadius: 4 }}>
                20-35% Margin
              </span>
            </div>
            <Link href="/categories?category=cement-ggbs&brand=CemXtra#cement-ggbs" className="mob-drawer-link" onClick={onClose} style={{ padding: '7px 8px', fontSize: 13, color: '#78350F' }}>
              <span>🏗️</span> <span>CemXtra Cement</span>
            </Link>
            <Link href="/categories?category=tmt-steel&brand=Tuffar#tmt-steel" className="mob-drawer-link" onClick={onClose} style={{ padding: '7px 8px', fontSize: 13, color: '#78350F' }}>
              <span>🔩</span> <span>Tuffar Fe550D Steel</span>
            </Link>
            <Link href="/categories?category=aac-panels&brand=EzyWall#aac-panels" className="mob-drawer-link" onClick={onClose} style={{ padding: '7px 8px', fontSize: 13, color: '#78350F' }}>
              <span>🧱</span> <span>EzyWall AAC Panels</span>
            </Link>
            <Link href="/categories?category=tiles-surfaces&brand=TileTrendz#tiles-surfaces" className="mob-drawer-link" onClick={onClose} style={{ padding: '7px 8px', fontSize: 13, color: '#78350F' }}>
              <span>✨</span> <span>TileTrendz Vitrified Tiles</span>
            </Link>
            <Link href="/categories?category=adhesives-chemicals&brand=Bondex#adhesives-chemicals" className="mob-drawer-link" onClick={onClose} style={{ padding: '7px 8px', fontSize: 13, color: '#78350F' }}>
              <span>🧪</span> <span>Bondex Tile Adhesives</span>
            </Link>
            <Link href="/categories?category=sanitaryware&brand=Sanivo#sanitaryware" className="mob-drawer-link" onClick={onClose} style={{ padding: '7px 8px', fontSize: 13, color: '#78350F' }}>
              <span>🚿</span> <span>Sanivo Bathware &amp; CP</span>
            </Link>
          </div>

          <div className="mob-drawer-divider"></div>

          <div className="mob-drawer-section-title">24x7 SITE SUPPORT</div>
          <a
            href="https://wa.me/919824939888"
            target="_blank"
            rel="noopener noreferrer"
            className="mob-drawer-link"
            style={{ color: '#059669', fontWeight: 700 }}
          >
            <span>💬</span> <span>WhatsApp Logistics Desk</span>
          </a>
        </div>

        <div className="mob-drawer-footer">
          {isLoggedIn && user ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: '#0E3128',
                  color: '#FFFFFF',
                  padding: '10px 14px',
                  borderRadius: 14,
                  border: '1px solid #1C5A4A',
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: 'var(--primary-orange)',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {user.name.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: 10.5, color: '#FCEFD2', fontWeight: 700, textTransform: 'capitalize' }}>
                    {user.role} · +91 {user.phone}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  logout();
                  onClose();
                }}
                style={{
                  width: '100%',
                  height: 40,
                  borderRadius: 12,
                  border: '1px solid #EF4444',
                  background: '#FEF2F2',
                  color: '#EF4444',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <span>🚪</span>
                <span>Sign Out / Logout</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="mob-drawer-login-btn"
              onClick={() => {
                onClose();
                openLoginModal('login');
                onOpenLogin();
              }}
            >
              <span>👤</span> <span>Log in or Sign up</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
