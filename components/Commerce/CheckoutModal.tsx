'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useLocation } from '@/context/LocationContext';
import OrderTrackingModal from '@/components/Commerce/OrderTrackingModal';

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, items, totalAmount, clearCart } = useCart();
  const { currentHub, pincode } = useLocation();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    landmark: '',
    unloadingNotes: '',
    isB2B: true,
    companyName: '',
    gstin: '',
    paymentMethod: 'pod',
    creditBand: '₹5 Lakhs',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);

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
    <>
      <div
        className={`standard-modal-overlay ${isCheckoutOpen ? 'active' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
        style={{ zIndex: 99990 }}
      >
        <div className="standard-modal-card" style={{ maxWidth: 540 }}>
          {/* Header */}
          <div className="standard-modal-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 22 }}>⚡</span>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  {isSuccess ? 'Dispatch Commenced' : 'Instant Site Delivery & Checkout'}
                </h3>
                <p style={{ fontSize: 12, color: '#64748B', margin: '2px 0 0 0' }}>
                  90-Min Quick Fulfillment via {currentHub.name} Hub ({pincode})
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
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--secondary-mint)', color: 'var(--secondary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 16px', fontWeight: 900 }}>
                  ✓
                </div>
                <h4 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>
                  Order Dispatched to Site!
                </h4>
                <p style={{ fontSize: 13.5, color: '#64748B', marginBottom: 16, lineHeight: 1.5 }}>
                  Order <strong>#{orderId}</strong> is assigned to our <strong>{currentHub.name} Express Fleet</strong>. Estimated arrival: <strong>90–120 minutes</strong>.
                </p>

                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 14, textAlign: 'left', marginBottom: 20, fontSize: 13 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ color: '#64748B' }}>Payment Method:</span>
                    <strong style={{ color: '#0F172A', textTransform: 'uppercase' }}>
                      {formData.paymentMethod === 'credit_line'
                        ? `Matelio Credit (${formData.creditBand} · 90-Day)`
                        : formData.paymentMethod === 'pod'
                        ? 'Pay on Delivery (POD)'
                        : 'Instant Online UPI'}
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ color: '#64748B' }}>Delivery Address:</span>
                    <strong style={{ color: '#0F172A' }}>{formData.address || currentHub.address}</strong>
                  </div>
                  {formData.unloadingNotes && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ color: '#64748B' }}>Site Instructions:</span>
                      <strong style={{ color: '#0F172A' }}>{formData.unloadingNotes}</strong>
                    </div>
                  )}
                  {formData.gstin && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748B' }}>GST Invoice:</span>
                      <strong style={{ color: '#047857' }}>{formData.gstin} (18% ITC Verified)</strong>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setIsTrackingOpen(true)}
                    style={{
                      flex: 1,
                      background: 'var(--primary-orange)',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: 13.5,
                      padding: '12px 16px',
                      borderRadius: 10,
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      boxShadow: '0 4px 12px rgba(249, 121, 56, 0.3)',
                    }}
                  >
                    <span>🚚 Live Fleet Telematics</span>
                  </button>

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
                    <span>💬 WhatsApp Support</span>
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
                {/* 90-Min Urgent Delivery Banner */}
                <div
                  style={{
                    background: 'var(--secondary-mint)',
                    border: '1px solid var(--secondary-mint-border)',
                    borderRadius: 10,
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 16,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: 'var(--secondary-green)' }}>
                    <span>⚡</span> 90-Min Express Site Dispatch Guaranteed
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#047857' }}>NO MIN ORDER</span>
                </div>

                {/* Site Contact Details */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Site Supervisor / Contact Person *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <input
                      type="text"
                      required
                      placeholder="Supervisor Name"
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
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Delivery Site Address &amp; Gate Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Plot / Project Name, Street, Landmark"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 12px', borderRadius: 10, fontSize: 13.5, outline: 'none', marginBottom: 8 }}
                  />
                  <input
                    type="text"
                    placeholder="Gate note (e.g. North Gate unloading, crane access required)"
                    value={formData.unloadingNotes}
                    onChange={(e) => setFormData({ ...formData, unloadingNotes: e.target.value })}
                    style={{ width: '100%', border: '1px solid #CBD5E1', padding: '8px 12px', borderRadius: 8, fontSize: 12.5, outline: 'none', background: '#F8FAFC' }}
                  />
                  <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 4 }}>
                    Fulfillment: <strong>{currentHub.name} Hub</strong> · Pincode: <strong>{pincode}</strong>
                  </div>
                </div>

                {/* B2B GST Invoicing */}
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 12, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: formData.isB2B ? 10 : 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 16 }}>🏢</span>
                      <div>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A' }}>B2B GST Invoicing</div>
                        <div style={{ fontSize: 11, color: '#64748B' }}>18% Input Tax Credit with computerized invoices</div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.isB2B}
                      onChange={(e) => setFormData({ ...formData, isB2B: e.target.checked })}
                      style={{ width: 16, height: 16, accentColor: 'var(--primary-orange)' }}
                    />
                  </div>

                  {formData.isB2B && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <input
                        type="text"
                        placeholder="Company / Firm Name"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '8px 12px', borderRadius: 8, fontSize: 12.5, outline: 'none', background: '#fff' }}
                      />
                      <input
                        type="text"
                        placeholder="GSTIN (e.g. 24AAAAA0000A1Z5)"
                        value={formData.gstin}
                        onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                        style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '8px 12px', borderRadius: 8, fontSize: 12.5, outline: 'none', background: '#fff' }}
                      />
                    </div>
                  )}
                </div>

                {/* Payment Methods */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 8 }}>
                    Select Payment Method
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {/* POD */}
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: `1.5px solid ${formData.paymentMethod === 'pod' ? 'var(--primary-orange)' : '#CBD5E1'}`,
                        background: formData.paymentMethod === 'pod' ? 'var(--primary-orange-light)' : '#FFFFFF',
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
                          style={{ accentColor: 'var(--primary-orange)' }}
                        />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Pay on Delivery (POD / Site Cash)</div>
                          <div style={{ fontSize: 11, color: '#64748B' }}>Inspect materials at site before release of payment</div>
                        </div>
                      </div>
                      <span style={{ fontSize: 16 }}>💵</span>
                    </label>

                    {/* Online */}
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: `1.5px solid ${formData.paymentMethod === 'online' ? 'var(--primary-orange)' : '#CBD5E1'}`,
                        background: formData.paymentMethod === 'online' ? 'var(--primary-orange-light)' : '#FFFFFF',
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
                          style={{ accentColor: 'var(--primary-orange)' }}
                        />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Instant Online (UPI / Card / QR)</div>
                          <div style={{ fontSize: 11, color: '#64748B' }}>Zero transaction fee, instant payment receipt</div>
                        </div>
                      </div>
                      <span style={{ fontSize: 16 }}>⚡</span>
                    </label>

                    {/* Matelio Credit Line */}
                    <label
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: `1.5px solid ${formData.paymentMethod === 'credit_line' ? '#D97706' : '#CBD5E1'}`,
                        background: formData.paymentMethod === 'credit_line' ? '#FEF3C7' : '#FFFFFF',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
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
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#78350F' }}>Matelio Credit Line (Pay in 90 Days)</div>
                            <div style={{ fontSize: 11, color: '#92400E' }}>0% Collateral · Instant GST-based Approval</div>
                          </div>
                        </div>
                        <span style={{ fontSize: 16 }}>💎</span>
                      </div>

                      {formData.paymentMethod === 'credit_line' && (
                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px dashed #FCD34D' }}>
                          <div style={{ fontSize: 11.5, fontWeight: 700, color: '#92400E', marginBottom: 6 }}>
                            Select Pre-Approved Credit Band:
                          </div>
                          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            {['₹2 Lakhs', '₹5 Lakhs', '₹10 Lakhs', '₹25 Lakhs'].map((band) => (
                              <button
                                key={band}
                                type="button"
                                onClick={() => setFormData({ ...formData, creditBand: band })}
                                style={{
                                  padding: '4px 10px',
                                  borderRadius: 6,
                                  fontSize: 11,
                                  fontWeight: 800,
                                  border: '1px solid #D97706',
                                  background: formData.creditBand === band ? '#D97706' : '#FFFBEB',
                                  color: formData.creditBand === band ? '#FFFFFF' : '#92400E',
                                  cursor: 'pointer',
                                }}
                              >
                                {band}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Action button */}
                <button
                  type="submit"
                  className="checkout-action-btn"
                  style={{
                    height: 50,
                    borderRadius: 12,
                    background: 'var(--primary-orange)',
                    boxShadow: '0 4px 16px rgba(249, 121, 56, 0.35)',
                  }}
                >
                  <span>CONFIRM 90-MIN DISPATCH</span>
                  <span>₹{totalAmount.toLocaleString('en-IN')} →</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Live Order Tracker Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        initialOrderId={orderId}
      />
    </>
  );
}
