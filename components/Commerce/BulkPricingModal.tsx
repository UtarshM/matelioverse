'use client';

import React from 'react';
import { Product } from '@/types';

interface BulkPricingModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectTier: (product: Product, qty: number) => void;
}

export default function BulkPricingModal({
  product,
  isOpen,
  onClose,
  onSelectTier,
}: BulkPricingModalProps) {
  if (!isOpen || !product) return null;

  return (
    <div
      className={`standard-modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="standard-modal-card" style={{ maxWidth: 480 }}>
        <div className="standard-modal-header">
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--primary-orange)', textTransform: 'uppercase' }}>
              Wholesale Slabs &amp; Tier Rates
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: '2px 0 0 0' }}>
              {product.name}
            </h3>
          </div>
          <button type="button" className="cart-drawer-close" onClick={onClose} aria-label="Close bulk rates modal">
            ✕
          </button>
        </div>

        <div className="standard-modal-body">
          <p style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>
            Direct manufacturer discount applies automatically when your order quantity meets the volume thresholds below:
          </p>

          <div style={{ border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left' }}>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>Order Slab</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>Unit Rate</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>Savings</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Standard Base Rate */}
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0F172A' }}>1 - {(product.bulkPricing[0]?.minQty || 10) - 1} {product.unit}s</td>
                  <td style={{ padding: '10px 14px', fontWeight: 800, color: '#0F172A' }}>₹{product.sellingPrice}</td>
                  <td style={{ padding: '10px 14px', color: '#64748B' }}>Standard</td>
                  <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectTier(product, 1);
                        onClose();
                      }}
                      style={{ background: '#F1F5F9', color: '#0F172A', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 6, border: 'none', cursor: 'pointer' }}
                    >
                      Add 1
                    </button>
                  </td>
                </tr>

                {/* Tier Slabs */}
                {product.bulkPricing.map((tier, idx) => {
                  const label = tier.maxQty
                    ? `${tier.minQty} - ${tier.maxQty} ${product.unit}s`
                    : `${tier.minQty}+ ${product.unit}s (Direct Plant)`;
                  const saving = product.sellingPrice - tier.pricePerUnit;
                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9', background: 'var(--secondary-mint)' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--secondary-green)' }}>{label}</td>
                      <td style={{ padding: '10px 14px', fontWeight: 900, color: 'var(--primary-orange)' }}>₹{tier.pricePerUnit}</td>
                      <td style={{ padding: '10px 14px', color: 'var(--secondary-green)', fontWeight: 700, fontSize: 12 }}>
                        Save ₹{saving}/{product.unit}
                      </td>
                      <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                        <button
                          type="button"
                          onClick={() => {
                            onSelectTier(product, tier.minQty);
                            onClose();
                          }}
                          style={{ background: 'var(--primary-orange)', color: '#FFFFFF', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 6, border: 'none', cursor: 'pointer' }}
                        >
                          Add {tier.minQty}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 10, padding: '12px 14px', fontSize: 12, color: '#1E40AF', display: 'flex', gap: 8, alignItems: 'center' }}>
            <span>💡</span>
            <div>
              <strong>Contractor Tip:</strong> Bulk slab rate applies automatically in your cart as you adjust quantities!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
