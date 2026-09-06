'use client';

import React, { useState } from 'react';

export default function CreditLineBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [creditForm, setCreditForm] = useState({
    businessName: '',
    gstin: '',
    turnover: '50L-2Cr',
    phone: '',
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <div className="credit-line-box">
        <div style={{ maxWidth: 620 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(52, 211, 153, 0.15)', color: '#34D399', fontSize: 11.5, fontWeight: 800, padding: '4px 12px', borderRadius: 20, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>⚡</span> B2B Revolving Working Capital
          </div>
          <h3 style={{ fontSize: 26, fontWeight: 900, color: '#FFFFFF', marginBottom: 10, lineHeight: 1.25 }}>
            Matelio Credit Line — Up to <span style={{ color: '#FBBF24' }}>₹25 Lakhs</span>
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.82)', lineHeight: 1.5, marginBottom: 18 }}>
            0% Collateral. 90-Day Repayment Cycle. Never let cement or steel supply delay your site casting schedule.
          </p>

          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#E2E8F0' }}>
              <span style={{ color: '#34D399', fontWeight: 900 }}>✓</span> 10-Minute GST Approval
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#E2E8F0' }}>
              <span style={{ color: '#34D399', fontWeight: 900 }}>✓</span> Zero Documentation Friction
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#E2E8F0' }}>
              <span style={{ color: '#34D399', fontWeight: 900 }}>✓</span> Dedicated Account Desk
            </div>
          </div>
        </div>

        <div style={{ flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            style={{
              background: '#FBBF24',
              color: '#78350F',
              fontSize: 14.5,
              fontWeight: 800,
              padding: '14px 28px',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(251, 191, 36, 0.35)',
              transition: 'transform 0.15s ease',
            }}
          >
            Check Credit Limit →
          </button>
        </div>
      </div>

      {/* Credit Line Modal */}
      {isOpen && (
        <div
          className="standard-modal-overlay active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="standard-modal-card" style={{ maxWidth: 480 }}>
            <div className="standard-modal-header">
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#D97706', textTransform: 'uppercase' }}>
                  Matelio Pay Later &amp; Credit Line
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', margin: '2px 0 0 0' }}>
                  Check Your Credit Eligibility
                </h3>
              </div>
              <button
                type="button"
                className="cart-drawer-close"
                onClick={() => {
                  setIsOpen(false);
                  setSubmitted(false);
                }}
              >
                ✕
              </button>
            </div>

            <div className="standard-modal-body">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '24px 8px' }}>
                  <span style={{ fontSize: 44, display: 'block', marginBottom: 12 }}>🎉</span>
                  <h4 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
                    Application Initiated!
                  </h4>
                  <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5, marginBottom: 20 }}>
                    Our B2B lending partner desk is verifying your GSTIN (<strong>{creditForm.gstin || '24AAACT1234A1Z1'}</strong>).
                    We will send an instant sanction letter and credit code to <strong>+91 {creditForm.phone || '9824939888'}</strong> within 2 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setSubmitted(false);
                    }}
                    style={{
                      background: 'var(--primary-green)',
                      color: '#fff',
                      fontWeight: 700,
                      padding: '10px 24px',
                      borderRadius: 10,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply}>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      Firm / Contracting Entity Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Infra Projects Pvt Ltd"
                      value={creditForm.businessName}
                      onChange={(e) => setCreditForm({ ...creditForm, businessName: e.target.value })}
                      style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5 }}
                    />
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      GSTIN Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 24AAACB1234A1Z5"
                      value={creditForm.gstin}
                      onChange={(e) => setCreditForm({ ...creditForm, gstin: e.target.value.toUpperCase() })}
                      style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5 }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                        Annual Turnover
                      </label>
                      <select
                        value={creditForm.turnover}
                        onChange={(e) => setCreditForm({ ...creditForm, turnover: e.target.value })}
                        style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 12px', borderRadius: 10, fontSize: 13.5, background: '#fff' }}
                      >
                        <option value="25L-50L">₹25L – ₹50L</option>
                        <option value="50L-2Cr">₹50L – ₹2 Cr</option>
                        <option value="2Cr-10Cr">₹2 Cr – ₹10 Cr</option>
                        <option value="10Cr+">₹10 Cr+</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                        Contact Mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="10-digit number"
                        value={creditForm.phone}
                        onChange={(e) => setCreditForm({ ...creditForm, phone: e.target.value.replace(/\D/g, '') })}
                        style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 12px', borderRadius: 10, fontSize: 13.5 }}
                      >
                      </input>
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      height: 48,
                      background: '#D97706',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: 14.5,
                      borderRadius: 12,
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(217, 119, 6, 0.3)',
                    }}
                  >
                    SUBMIT FOR 10-MIN APPROVAL →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
