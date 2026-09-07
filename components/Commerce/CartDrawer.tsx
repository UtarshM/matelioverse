'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useLocation } from '@/context/LocationContext';

export default function CartDrawer() {
  const {
    items,
    cartCount,
    subtotal,
    savings,
    gstAmount,
    deliveryFee,
    totalAmount,
    freeDeliveryThreshold,
    amountNeededForFreeDelivery,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    setIsCheckoutOpen,
  } = useCart();
  const { currentHub } = useLocation();

  if (!isCartOpen) return null;

  const freeDeliveryProgress = Math.min(
    100,
    Math.round((subtotal / freeDeliveryThreshold) * 100)
  );

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      className={`cart-drawer-overlay ${isCartOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsCartOpen(false);
      }}
    >
      <div className="cart-drawer">
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-drawer-title">
            <span>🛒 My Cart</span>
            <span style={{ fontSize: 13, background: '#E2E8F0', color: '#334155', padding: '2px 8px', borderRadius: 12, fontWeight: 700 }}>
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            type="button"
            className="cart-drawer-close"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
          >
            ✕
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div className="free-delivery-meter-box">
          <div className="meter-text-row">
            {amountNeededForFreeDelivery > 0 ? (
              <span>Add ₹{amountNeededForFreeDelivery.toLocaleString('en-IN')} more for <strong>FREE Site Delivery</strong></span>
            ) : (
              <span style={{ color: '#047857' }}>🎉 You unlocked <strong>FREE Site Delivery</strong>!</span>
            )}
            <span>{freeDeliveryProgress}%</span>
          </div>
          <div className="meter-bar-track">
            <div className="meter-bar-fill" style={{ width: `${freeDeliveryProgress}%` }}></div>
          </div>
        </div>

        {/* Items List or Empty State */}
        {items.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
            <span style={{ fontSize: 48, marginBottom: 12 }}>🏗️</span>
            <h4 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>Your Cart is Empty</h4>
            <p style={{ fontSize: 13, color: '#64748B', maxWidth: 260, marginBottom: 20 }}>
              Add verified building materials like CemXtra, Tuffar TMT, or TileTrendz to begin.
            </p>
            <Link
              href="/categories"
              onClick={() => setIsCartOpen(false)}
              style={{
                background: 'var(--primary-orange)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: 13.5,
                padding: '10px 24px',
                borderRadius: 10,
                textDecoration: 'none',
              }}
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="cart-items-scroll">
            {items.map(({ product, quantity, unitPrice }) => (
              <div key={product.id} className="cart-item-card">
                <img src={product.image} alt={product.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span className="cart-item-brand">{product.brand}</span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        style={{ color: '#94A3B8', fontSize: 13, border: 'none', background: 'none', cursor: 'pointer', padding: '0 4px' }}
                        title="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                    <h5 className="cart-item-name">{product.name}</h5>
                    <div className="cart-item-unit">Unit: {product.unit}</div>
                  </div>

                  <div className="cart-item-price-row">
                    <div>
                      <div className="cart-item-price">
                        ₹{(unitPrice * quantity).toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: 11, color: '#64748B' }}>
                        ₹{unitPrice}/{product.unit.split(' ')[0]}
                      </div>
                    </div>

                    <div className="cart-item-stepper">
                      <button
                        type="button"
                        className="cart-stepper-btn"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="cart-stepper-val">{quantity}</span>
                      <button
                        type="button"
                        className="cart-stepper-btn"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Summary & Checkout Button */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-row">
              <span>Items Subtotal</span>
              <span style={{ fontWeight: 700, color: '#0F172A' }}>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {savings > 0 && (
              <div className="cart-summary-row" style={{ color: '#059669', fontWeight: 700 }}>
                <span>Total Wholesale Savings</span>
                <span>-₹{savings.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="cart-summary-row">
              <span>GST (18% B2B Input Credit)</span>
              <span>₹{gstAmount.toLocaleString('en-IN')}</span>
            </div>

            <div className="cart-summary-row">
              <span>Site Delivery ({currentHub.name})</span>
              <span>{deliveryFee === 0 ? <strong style={{ color: '#047857' }}>FREE</strong> : `₹${deliveryFee}`}</span>
            </div>

            <div className="cart-summary-row cart-summary-total">
              <span>Payable Amount</span>
              <span style={{ color: 'var(--primary-orange)' }}>₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>

            <button
              type="button"
              className="checkout-action-btn"
              onClick={handleProceedToCheckout}
            >
              <span>PROCEED TO CHECKOUT</span>
              <span>₹{totalAmount.toLocaleString('en-IN')} →</span>
            </button>

            <div style={{ textAlign: 'center', fontSize: 11, color: '#94A3B8', marginTop: 10 }}>
              🛡️ 100% Authentic Products · Direct Manufacturer Dispatch
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
