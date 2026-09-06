'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PartnerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    partnerType: 'Franchise Smart Store',
    investmentCapacity: '₹25L – ₹50L',
    experienceYears: '3-5 Years',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '85vh', paddingBottom: 60 }}>
      {/* Top Hero Banner */}
      <section style={{ background: 'linear-gradient(135deg, #064E3B 0%, #06192C 100%)', color: '#FFFFFF', padding: '44px 0' }}>
        <div className="site-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#A7F3D0', marginBottom: 12 }}>
            <Link href="/" style={{ color: '#A7F3D0', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <span style={{ color: '#FBBF24', fontWeight: 700 }}>Franchise &amp; Dealership Network</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(251, 191, 36, 0.2)', color: '#FBBF24', padding: '4px 12px', borderRadius: 20, fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', marginBottom: 12 }}>
            <span>⭐</span> matelio STAR Partner Program
          </div>
          <h1 style={{ fontSize: 34, fontWeight: 900, marginBottom: 10, lineHeight: 1.25 }}>
            Stronger Margins. Stronger Brands. Exclusive Territory Rights.
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', maxWidth: 720, lineHeight: 1.5 }}>
            Join the omni-channel revolution modernizing India&apos;s ₹100,000 Cr+ retail building materials market. Earn 20–35% margins with zero dead-stock risk through demand-led digital fulfillment.
          </p>
        </div>
      </section>

      {/* Value Pillars */}
      <div className="site-container" style={{ marginTop: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 44 }} className="why-matelio-grid">
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 18, padding: 28, boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16 }}>
              💎
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>20–35% Gross Margins</h3>
            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.55 }}>
              Standard retail brands offer razor-thin 4–6% margins. Matelioverse proprietary lines (TileTrendz, Tuffar, CemXtra) double your return on working capital.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 18, padding: 28, boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16 }}>
              📍
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>Exclusive Pincode Exclusivity</h3>
            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.55 }}>
              Guaranteed geo-tagged territory protection. All digital customer orders and contractor BOQ deliveries generated in your postal area route through your franchise store.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 18, padding: 28, boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16 }}>
              🏬
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>Lean Capital Smart Store</h3>
            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.55 }}>
              No need to lock up ₹2 Crore in slow inventory. Showcase digital surface studios and let our central regional hubs fulfill heavy materials on demand.
            </p>
          </div>
        </div>

        {/* Application Form */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 20, padding: 36, maxWidth: 680, margin: '0 auto', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <span style={{ fontSize: 44, display: 'block', marginBottom: 12 }}>🤝</span>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 8 }}>
                Application Received!
              </h3>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.5, marginBottom: 20 }}>
                Thank you, <strong>{formData.name}</strong>. Our franchise business director will contact you on <strong>+91 {formData.phone}</strong> with the territory feasibility report for <strong>{formData.city}</strong>.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                style={{ background: 'var(--primary-green)', color: '#fff', padding: '10px 24px', borderRadius: 10, fontWeight: 700, border: 'none', cursor: 'pointer' }}
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 6 }}>
                  Apply for Territory Rights
                </h3>
                <p style={{ fontSize: 13.5, color: '#64748B' }}>
                  Reserve your city or district before territory allocation closes
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5 }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      Mobile Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                      style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      Proposed City / District *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Surat, Rajkot, Pune"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5 }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      Partner Model
                    </label>
                    <select
                      value={formData.partnerType}
                      onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                      style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5, background: '#fff' }}
                    >
                      <option>Franchise Smart Store</option>
                      <option>Authorized Retail Dealer</option>
                      <option>Regional Transit Hub Partner</option>
                      <option>Manufacturer Private Label Supply</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      Investment Capacity
                    </label>
                    <select
                      value={formData.investmentCapacity}
                      onChange={(e) => setFormData({ ...formData, investmentCapacity: e.target.value })}
                      style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5, background: '#fff' }}
                    >
                      <option>₹15L – ₹25L</option>
                      <option>₹25L – ₹50L</option>
                      <option>₹50L – ₹1 Cr</option>
                      <option>₹1 Cr+</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      Building Material Experience
                    </label>
                    <select
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                      style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5, background: '#fff' }}
                    >
                      <option>New to Industry</option>
                      <option>1-3 Years</option>
                      <option>3-5 Years</option>
                      <option>5+ Years (Existing Dealer)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    height: 50,
                    background: 'var(--primary-green)',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: 15,
                    borderRadius: 12,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0, 168, 107, 0.35)',
                  }}
                >
                  APPLY FOR FRANCHISE ALLOCATION →
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
