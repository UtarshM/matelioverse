'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useLocation } from '@/context/LocationContext';

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart, setIsCartOpen } = useCart();
  const { currentHub, pincode, openLocationModal } = useLocation();

  const [qty, setQty] = useState<number>(1);
  const [downloadModal, setDownloadModal] = useState(false);
  const [qrModal, setQrModal] = useState(false);

  // Compute tier price for current qty
  let currentUnitPrice = product.sellingPrice;
  if (product.bulkPricing && product.bulkPricing.length > 0) {
    const sorted = [...product.bulkPricing].sort((a, b) => b.minQty - a.minQty);
    for (const tier of sorted) {
      if (qty >= tier.minQty) {
        currentUnitPrice = tier.pricePerUnit;
        break;
      }
    }
  }

  const handleAddToCart = () => {
    addToCart(product, qty);
    setIsCartOpen(true);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 36, background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 20, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }} className="pdp-layout-grid">
      {/* Left: Image & Trust Highlights */}
      <div>
        <div
          style={{
            height: 380,
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            position: 'relative',
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />

          {product.discountPercent > 0 && (
            <span
              style={{
                position: 'absolute',
                top: 14,
                left: 14,
                background: '#EF4444',
                color: '#FFFFFF',
                fontSize: 12,
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: 8,
              }}
            >
              {product.discountPercent}% OFF
            </span>
          )}

          {product.isPrivateLabel && (
            <span
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                background: '#064E3B',
                color: '#34D399',
                fontSize: 11,
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: 6,
                letterSpacing: '0.5px',
              }}
            >
              PROPRIETARY BRAND
            </span>
          )}
        </div>

        {/* Action Buttons: Datasheet & QR Batch */}
        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <button
            type="button"
            onClick={() => setDownloadModal(true)}
            style={{
              flex: 1,
              background: '#EFF6FF',
              color: '#2563EB',
              border: '1px solid #BFDBFE',
              borderRadius: 10,
              padding: '10px 14px',
              fontSize: 12.5,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              cursor: 'pointer',
            }}
          >
            <span>📑</span> Download Technical Spec Sheet
          </button>

          <button
            type="button"
            onClick={() => setQrModal(true)}
            style={{
              flex: 1,
              background: '#ECFDF5',
              color: '#065F46',
              border: '1px solid #A7F3D0',
              borderRadius: 10,
              padding: '10px 14px',
              fontSize: 12.5,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              cursor: 'pointer',
            }}
          >
            <span>🔍</span> QR Batch Mill Certificate
          </button>
        </div>
      </div>

      {/* Right: Pricing, Slabs, Unit, Steppers, Specs */}
      <div>
        {/* Brand & Category */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary-orange)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {product.brand}
          </span>
          <span style={{ color: '#CBD5E1' }}>•</span>
          <span style={{ fontSize: 13, color: '#64748B' }}>{product.category}</span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', lineHeight: 1.3, marginBottom: 12 }}>
          {product.name}
        </h1>

        {/* Rating and Reviews */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#FEF3C7', color: '#92400E', padding: '3px 8px', borderRadius: 6, fontSize: 12, fontWeight: 800 }}>
            <span>★</span> {product.rating}
          </div>
          <span style={{ fontSize: 13, color: '#64748B' }}>{product.reviewCount} Verified Site Inspections</span>
          <span style={{ color: '#CBD5E1' }}>•</span>
          <span style={{ fontSize: 12.5, color: '#047857', fontWeight: 700 }}>✓ In Stock ({currentHub.name} Hub)</span>
        </div>

        {/* Price Box */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 14, padding: '16px 20px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span style={{ fontSize: 32, fontWeight: 900, color: '#0F172A' }}>
              ₹{currentUnitPrice.toLocaleString('en-IN')}
            </span>
            <span style={{ fontSize: 16, color: '#94A3B8', textDecoration: 'line-through' }}>
              ₹{product.mrp}
            </span>
            <span style={{ fontSize: 13, color: '#059669', fontWeight: 800 }}>
              Save ₹{product.mrp - currentUnitPrice}/{product.unit.split(' ')[0]}
            </span>
          </div>
          <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
            Unit of Sale: <strong>{product.unit}</strong> · Exclusive of 18% GST (B2B Tax Credit Eligible)
          </div>
        </div>

        {/* Delivery SLA Location Info */}
        <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 12, padding: '12px 16px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#065F46', textTransform: 'uppercase' }}>
              ⚡ Delivery Promise to {pincode}
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginTop: 2 }}>
              {product.slaType === 'instant' ? `Matelio Fast: Delivery in ${product.deliverySla}` : `Freight Dispatch: ${product.deliverySla}`}
            </div>
          </div>
          <button
            type="button"
            onClick={openLocationModal}
            style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary-orange)', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer' }}
          >
            Change Pincode
          </button>
        </div>

        {/* Wholesale Slab Pricing Table */}
        {product.bulkPricing && product.bulkPricing.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>
              Wholesale Bulk Slabs (Auto-applied in cart)
            </div>
            <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
                <thead>
                  <tr style={{ background: '#F1F5F9', borderBottom: '1px solid #E2E8F0', textAlign: 'left' }}>
                    <th style={{ padding: '8px 12px', color: '#475569' }}>Order Volume</th>
                    <th style={{ padding: '8px 12px', color: '#475569' }}>Rate per Unit</th>
                    <th style={{ padding: '8px 12px', color: '#475569' }}>Savings Note</th>
                  </tr>
                </thead>
                <tbody>
                  {product.bulkPricing.map((tier, i) => {
                    const isCurrent = qty >= tier.minQty && (!tier.maxQty || qty <= tier.maxQty);
                    return (
                      <tr
                        key={i}
                        style={{
                          borderBottom: '1px solid #F1F5F9',
                          background: isCurrent ? '#FEF3C7' : '#FFFFFF',
                          fontWeight: isCurrent ? 800 : 500,
                        }}
                      >
                        <td style={{ padding: '8px 12px' }}>
                          {tier.maxQty ? `${tier.minQty} - ${tier.maxQty}` : `${tier.minQty}+ (Mill Direct)`} {product.unit}s
                        </td>
                        <td style={{ padding: '8px 12px', color: 'var(--primary-orange)', fontWeight: 800 }}>
                          ₹{tier.pricePerUnit}
                        </td>
                        <td style={{ padding: '8px 12px', color: '#64748B' }}>
                          {tier.discountNote || 'Bulk volume tier'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quantity Stepper & ADD CTA */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #CBD5E1', borderRadius: 12, overflow: 'hidden', height: 48 }}>
            <button
              type="button"
              onClick={() => setQty(Math.max(1, qty - 1))}
              style={{ width: 44, height: '100%', background: '#F8FAFC', border: 'none', fontSize: 18, fontWeight: 800, cursor: 'pointer' }}
            >
              -
            </button>
            <span style={{ minWidth: 48, textAlign: 'center', fontWeight: 800, fontSize: 16, color: '#0F172A' }}>
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty(qty + 1)}
              style={{ width: 44, height: '100%', background: '#F8FAFC', border: 'none', fontSize: 18, fontWeight: 800, cursor: 'pointer' }}
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            style={{
              flex: 1,
              height: 48,
              background: 'var(--primary-orange)',
              color: '#FFFFFF',
              borderRadius: 12,
              fontWeight: 800,
              fontSize: 15,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0, 168, 107, 0.35)',
            }}
          >
            <span>ADD TO SITE CART</span>
            <span>· ₹{(currentUnitPrice * qty).toLocaleString('en-IN')}</span>
          </button>
        </div>

        {/* Description & Technical Specifications Table */}
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>
            Material Overview
          </h3>
          <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.6, marginBottom: 18 }}>
            {product.description}
          </p>

          <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>
            Technical Compliance &amp; Specs
          </h4>
          <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
            {Object.entries(product.specs).map(([key, val], idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  padding: '10px 14px',
                  borderBottom: idx !== Object.entries(product.specs).length - 1 ? '1px solid #F1F5F9' : 'none',
                  background: idx % 2 === 0 ? '#F8FAFC' : '#FFFFFF',
                  fontSize: 13,
                }}
              >
                <span style={{ width: '40%', fontWeight: 700, color: '#475569' }}>{key}</span>
                <span style={{ width: '60%', color: '#0F172A', fontWeight: 600 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Datasheet Mock Modal */}
      {downloadModal && (
        <div className="standard-modal-overlay active" onClick={() => setDownloadModal(false)}>
          <div className="standard-modal-card" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
            <div className="standard-modal-header">
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>Download Technical Spec Sheet</h3>
              <button type="button" className="cart-drawer-close" onClick={() => setDownloadModal(false)}>✕</button>
            </div>
            <div className="standard-modal-body" style={{ textAlign: 'center', padding: '24px 16px' }}>
              <span style={{ fontSize: 44, display: 'block', marginBottom: 12 }}>📑</span>
              <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 6 }}>{product.name} Datasheet</h4>
              <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>
                Includes compressive strength curves, chemical composition, BIS certification number, and storage guidelines.
              </p>
              <button
                type="button"
                onClick={() => {
                  alert(`Downloading official technical datasheet for ${product.name} (PDF).`);
                  setDownloadModal(false);
                }}
                style={{ background: 'var(--primary-orange)', color: '#fff', padding: '12px 24px', borderRadius: 10, fontWeight: 700, border: 'none', cursor: 'pointer' }}
              >
                Download PDF Specification (2.4 MB)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Batch Certificate Modal */}
      {qrModal && (
        <div className="standard-modal-overlay active" onClick={() => setQrModal(false)}>
          <div className="standard-modal-card" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
            <div className="standard-modal-header">
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>QR Batch Verification Certificate</h3>
              <button type="button" className="cart-drawer-close" onClick={() => setQrModal(false)}>✕</button>
            </div>
            <div className="standard-modal-body" style={{ textAlign: 'center', padding: '24px 16px' }}>
              <div style={{ width: 120, height: 120, background: '#0F172A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', borderRadius: 12, fontSize: 48 }}>
                📱
              </div>
              <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 6 }}>Batch ID: #MTV-2026-B{Math.floor(1000 + Math.random() * 9000)}</h4>
              <p style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>
                Certified Genuine Material from <strong>{product.brand} Plant</strong>. 100% compliant with Bureau of Indian Standards (BIS).
              </p>
              <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 8, padding: 10, fontSize: 12, color: '#047857', fontWeight: 700 }}>
                ✓ Lab Ultrasonic &amp; Tensile Tested · 0% Defect Tolerance
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
