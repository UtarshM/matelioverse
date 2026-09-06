'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useLocation } from '@/context/LocationContext';

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, items, totalAmount, clearCart } = useCart();
  const { currentHub, pincode } = useLocation();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    landmark: '',
    isB2B: true,
    companyName: '',
    gstin: '',
    paymentMethod: 'pod',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `MAT-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setIsSuccess(true);
    clearCart();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setIsSuccess(false);
  };

  return (
    <div
      className={`standard-modal-overlay ${isCheckoutOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="standard-modal-card" style={{ maxWidth: 540 }}>
        {/* Header */}
        <div className="standard-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>📦</span>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                {isSuccess ? 'Order Dispatched' : 'Site Delivery & Checkout'}
              </h3>
              <p style={{ fontSize: 12, color: '#64748B', margin: '2px 0 0 0' }}>
                Fulfillment via {currentHub.name} Hub ({pincode})
              </p>
            </div>
          </div>
          <button type="button" className="cart-drawer-close" onClick={handleClose} aria-label="Close checkout">
            ✕
          </button>
        </div>

        <div className="standard-modal-body">
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '24px 8px' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#ECFDF5', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 16px', fontWeight: 900 }}>
                ✓
              </div>
              <h4 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>
                Order Confirmed!
              </h4>
              <p style={{ fontSize: 13.5, color: '#64748B', marginBottom: 16, lineHeight: 1.5 }}>
                Order <strong>#{orderId}</strong> has been forwarded to our <strong>{currentHub.name} Fulfillment Hub</strong>.
                Our site logistics manager will contact you for delivery unloading coordinates.
              </p>

              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 14, textAlign: 'left', marginBottom: 20, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: '#64748B' }}>Payment Method:</span>
                  <strong style={{ color: '#0F172A', textTransform: 'uppercase' }}>
                    {formData.paymentMethod === 'credit_line' ? 'Matelio Credit Line (90-Day)' : formData.paymentMethod === 'pod' ? 'Pay on Delivery (POD)' : 'Online Payment'}
                  </strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: '#64748B' }}>Delivery Address:</span>
                  <strong style={{ color: '#0F172A' }}>{formData.address || currentHub.address}</strong>
                </div>
                {formData.gstin && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>GST Invoice:</span>
                    <strong style={{ color: '#047857' }}>{formData.gstin} (18% ITC)</strong>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <a
                  href={`https://wa.me/919824939888?text=Hello%20Matelioverse,%20I%20placed%20order%20${orderId}%20for%20site%20delivery.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    background: '#25D366',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: 13.5,
                    padding: '12px 16px',
                    borderRadius: 10,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <span>💬 Track on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  style={{
                    padding: '12px 20px',
                    background: '#F1F5F9',
                    color: '#0F172A',
                    fontWeight: 700,
                    fontSize: 13.5,
                    borderRadius: 10,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Site Details */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Contact Name &amp; Phone *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <input
                    type="text"
                    required
                    placeholder="Site Supervisor / Buyer"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 12px', borderRadius: 10, fontSize: 13.5, outline: 'none' }}
                  />
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="10-digit Mobile"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                    style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 12px', borderRadius: 10, fontSize: 13.5, outline: 'none' }}
                  />
                </div>
              </div>

              {/* Delivery Site Address */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Delivery Site Address &amp; Unloading Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Plot/Street/Site Address, Landmark"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 12px', borderRadius: 10, fontSize: 13.5, outline: 'none', marginBottom: 8 }}
                />
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ fontSize: 12, color: '#64748B' }}>
                    Hub: <strong>{currentHub.name}</strong> · Pincode: <strong>{pincode}</strong>
                  </div>
                </div>
              </div>

              {/* B2B GST Invoicing Section */}
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 14, marginBottom: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: formData.isB2B ? 12 : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 16 }}>🏢</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>B2B GST Invoicing</div>
                      <div style={{ fontSize: 11, color: '#64748B' }}>Claim 18% Input Tax Credit on building materials</div>
                    </div>
                  </div>
                  <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.isB2B}
                      onChange={(e) => setFormData({ ...formData, isB2B: e.target.checked })}
                      style={{ width: 16, height: 16, accentColor: 'var(--primary-green)' }}
                    />
                  </label>
                </div>

                {formData.isB2B && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <input
                      type="text"
                      placeholder="Company / Firm Name"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '8px 12px', borderRadius: 8, fontSize: 12.5, outline: 'none' }}
                    />
                    <input
                      type="text"
                      placeholder="GSTIN (e.g. 24AAAAA0000A1Z5)"
                      value={formData.gstin}
                      onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                      style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '8px 12px', borderRadius: 8, fontSize: 12.5, outline: 'none' }}
                    />
                  </div>
                )}
              </div>

              {/* Payment Methods */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 8 }}>
                  Select Payment Method
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {/* Option 1: POD */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: 10,
                      border: `1.5px solid ${formData.paymentMethod === 'pod' ? 'var(--primary-green)' : '#CBD5E1'}`,
                      background: formData.paymentMethod === 'pod' ? '#ECFDF5' : '#FFFFFF',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="pod"
                        checked={formData.paymentMethod === 'pod'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'pod' })}
                        style={{ accentColor: 'var(--primary-green)' }}
                      />
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0F172A' }}>Pay on Delivery (POD / Site Cash)</div>
                        <div style={{ fontSize: 11, color: '#64748B' }}>Inspect materials upon truck arrival before making payment</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 18 }}>💵</span>
                  </label>

                  {/* Option 2: UPI / Online */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: 10,
                      border: `1.5px solid ${formData.paymentMethod === 'online' ? 'var(--primary-green)' : '#CBD5E1'}`,
                      background: formData.paymentMethod === 'online' ? '#ECFDF5' : '#FFFFFF',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={formData.paymentMethod === 'online'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'online' })}
                        style={{ accentColor: 'var(--primary-green)' }}
                      />
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0F172A' }}>Instant Online (UPI / Card / NetBanking)</div>
                        <div style={{ fontSize: 11, color: '#64748B' }}>100% Escrow protected construction commerce</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 18 }}>⚡</span>
                  </label>

                  {/* Option 3: Matelio Credit Line */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: 10,
                      border: `1.5px solid ${formData.paymentMethod === 'credit_line' ? '#D97706' : '#CBD5E1'}`,
                      background: formData.paymentMethod === 'credit_line' ? '#FEF3C7' : '#FFFFFF',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit_line"
                        checked={formData.paymentMethod === 'credit_line'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'credit_line' })}
                        style={{ accentColor: '#D97706' }}
                      />
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 700, color: '#78350F' }}>Matelio Credit Line (Pay in 90 Days)</div>
                        <div style={{ fontSize: 11, color: '#92400E' }}>Up to ₹25 Lakhs zero-collateral revolving credit</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 18 }}>💎</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="checkout-action-btn"
                style={{ height: 50 }}
              >
                <span>CONFIRM ORDER DISPATCH</span>
                <span>₹{totalAmount.toLocaleString('en-IN')} →</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
