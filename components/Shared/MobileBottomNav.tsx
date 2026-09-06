'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <Link href="/" className={`mob-nav-tab ${pathname === '/' ? 'active' : ''}`}>
        <svg className="mob-tab-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        <span>Home</span>
      </Link>

      <Link href="/categories" className={`mob-nav-tab ${pathname?.startsWith('/categories') ? 'active' : ''}`}>
        <svg className="mob-tab-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z" />
        </svg>
        <span>Catalog</span>
      </Link>

      <Link href="/rfq" className={`mob-nav-tab ${pathname === '/rfq' ? 'active' : ''}`}>
        <svg className="mob-tab-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
        <span>BOQ Quote</span>
      </Link>

      <button
        type="button"
        className="mob-nav-tab"
        onClick={() => setIsCartOpen(true)}
        style={{ position: 'relative' }}
      >
        <svg className="mob-tab-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
        <span>Cart</span>
        {cartCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: 2,
              right: '25%',
              background: '#EF4444',
              color: '#FFFFFF',
              fontSize: 10,
              fontWeight: 800,
              width: 16,
              height: 16,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {cartCount}
          </span>
        )}
      </button>

      <Link href="/partner" className={`mob-nav-tab ${pathname === '/partner' ? 'active' : ''}`}>
        <svg className="mob-tab-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
        <span>Partner</span>
      </Link>
    </nav>
  );
}
