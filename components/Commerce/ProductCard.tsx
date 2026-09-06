'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import BulkPricingModal from './BulkPricingModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { getItemQuantity, addToCart, updateQuantity } = useCart();
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  const quantity = getItemQuantity(product.id);

  const handleInitialAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleMinus = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, quantity - 1);
  };

  const handlePlus = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, quantity + 1);
  };

  const lowestBulkPrice = product.bulkPricing && product.bulkPricing.length > 0
    ? product.bulkPricing[product.bulkPricing.length - 1].pricePerUnit
    : null;

  return (
    <>
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 16,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          position: 'relative',
        }}
        className="product-card-hover"
      >
        {/* Image & Badges Container */}
        <div style={{ position: 'relative', height: 180, background: '#F8FAFC', overflow: 'hidden' }}>
          <Link href={`/products/${product.slug}`} style={{ display: 'block', width: '100%', height: '100%' }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 12, transition: 'transform 0.3s ease' }}
              loading="lazy"
            />
          </Link>

          {/* Discount Pill */}
          {product.discountPercent > 0 && (
            <span
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                background: '#EF4444',
                color: '#FFFFFF',
                fontSize: 11,
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: 6,
                boxShadow: '0 2px 6px rgba(239, 68, 68, 0.3)',
              }}
            >
              {product.discountPercent}% OFF
            </span>
          )}

          {/* SLA Badge */}
          <span
            style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
            }}
          >
            {product.slaType === 'instant' ? (
              <span className="sla-badge-instant">⚡ {product.deliverySla}</span>
            ) : (
              <span className="sla-badge-scheduled">🚚 {product.deliverySla}</span>
            )}
          </span>

          {/* Private Label Pill */}
          {product.isPrivateLabel && (
            <span
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'rgba(6, 78, 59, 0.85)',
                color: '#34D399',
                fontSize: 10,
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: 4,
                letterSpacing: '0.5px',
              }}
            >
              OWN LABEL
            </span>
          )}
        </div>

        {/* Content Body */}
        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
          <div>
            {/* Brand and Unit */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--primary-green)', textTransform: 'uppercase' }}>
                {product.brand}
              </span>
              <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>
                {product.unit}
              </span>
            </div>

            {/* Product Name */}
            <h3 style={{ fontSize: 13.5, fontWeight: 700, color: '#0F172A', lineHeight: 1.35, minHeight: 38, marginBottom: 6 }}>
              <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {product.name}
              </Link>
            </h3>

            {/* Trust Badges Row */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
              {product.qrBatchVerified && (
                <span className="trust-badge-pill" title="Lab Tested Batch Verification">
                  <span style={{ color: 'var(--primary-green)' }}>✓</span> QR Verified
                </span>
              )}
              {product.bisCertified && (
                <span className="trust-badge-pill" title="Bureau of Indian Standards Certified">
                  <span>🛡️</span> BIS Grade
                </span>
              )}
            </div>

            {/* Bulk Pricing Link if available */}
            {lowestBulkPrice && (
              <button
                type="button"
                onClick={() => setIsBulkModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#2563EB',
                  background: '#EFF6FF',
                  padding: '3px 8px',
                  borderRadius: 6,
                  border: 'none',
                  cursor: 'pointer',
                  marginBottom: 10,
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <span>📦 Buy bulk from ₹{lowestBulkPrice}/{product.unit.split(' ')[0]}</span>
                <span>▾</span>
              </button>
            )}
          </div>

          {/* Pricing & ADD Button Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 17, fontWeight: 900, color: '#0F172A' }}>
                  ₹{product.sellingPrice}
                </span>
                <span style={{ fontSize: 12, color: '#94A3B8', textDecoration: 'line-through' }}>
                  ₹{product.mrp}
                </span>
              </div>
              <div style={{ fontSize: 10.5, color: '#059669', fontWeight: 700 }}>
                Save ₹{product.mrp - product.sellingPrice}
              </div>
            </div>

            {/* Add / Stepper Button */}
            <div>
              {quantity === 0 ? (
                <button
                  type="button"
                  className="product-initial-add-btn"
                  onClick={handleInitialAdd}
                  aria-label={`Add ${product.name} to cart`}
                >
                  + ADD
                </button>
              ) : (
                <div className="product-add-stepper-wrap">
                  <button
                    type="button"
                    className="product-add-stepper-btn"
                    onClick={handleMinus}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="product-add-stepper-val">{quantity}</span>
                  <button
                    type="button"
                    className="product-add-stepper-btn"
                    onClick={handlePlus}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Slabs Modal */}
      <BulkPricingModal
        product={product}
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        onSelectTier={(prod, qty) => addToCart(prod, qty)}
      />
    </>
  );
}
