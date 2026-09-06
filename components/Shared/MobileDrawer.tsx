'use client';

import React from 'react';
import Link from 'next/link';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

export default function MobileDrawer({ isOpen, onClose, onOpenLogin }: MobileDrawerProps) {
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

          <div className="mob-drawer-section-title">PRIVATE LABELS</div>
          <Link href="/categories#cement-ggbs" className="mob-drawer-link" onClick={onClose}>
            <span>🏗️</span> <span>CemXtra Cement</span>
          </Link>
          <Link href="/categories#tmt-steel" className="mob-drawer-link" onClick={onClose}>
            <span>🔩</span> <span>Tuffar TMT Steel</span>
          </Link>
          <Link href="/categories#aac-panels" className="mob-drawer-link" onClick={onClose}>
            <span>🧱</span> <span>EzyWall AAC Panels</span>
          </Link>
          <Link href="/categories#tiles-surfaces" className="mob-drawer-link" onClick={onClose}>
            <span>✨</span> <span>TileTrendz Vitrified Tiles</span>
          </Link>

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
          <button
            type="button"
            className="mob-drawer-login-btn"
            onClick={() => {
              onClose();
              onOpenLogin();
            }}
          >
            <span>👤</span> <span>Log in or Sign up</span>
          </button>
        </div>
      </div>
    </div>
  );
}
