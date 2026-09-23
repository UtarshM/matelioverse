'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PartnerPage() {
  const [partnerMode, setPartnerMode] = useState<'dealer' | 'franchise'>('dealer');
  const [monthlyTurnover, setMonthlyTurnover] = useState<number>(25); // in Lakhs
  const [checkPincode, setCheckPincode] = useState<string>('382421');
  const [pincodeStatus, setPincodeStatus] = useState<string>('Available for Exclusive Allocation');
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Ahmedabad',
    pincode: '382421',
    currentBusiness: 'Hardware / Sanitary Retailer',
    investmentCapacity: '₹25L – ₹50L',
  });

  // Profit calculation: 28% average margin on Matelioverse vs 5% traditional retail
  const estimatedGrossProfit = Math.round(monthlyTurnover * 0.28 * 100) / 100;
  const traditionalGrossProfit = Math.round(monthlyTurnover * 0.05 * 100) / 100;
  const extraProfitMonthly = Math.round((estimatedGrossProfit - traditionalGrossProfit) * 100) / 100;
  const extraProfitAnnual = Math.round(extraProfitMonthly * 12 * 10) / 10;

  const brands = [
    { name: 'TileTrendz', cat: 'Vitrified Slabs', margin: '28%', desc: 'Morbi plant direct GVT/PGVT' },
    { name: 'Tuffar', cat: 'Fe550D TMT Steel', margin: '20%', desc: 'Primary billet BIS 1786' },
    { name: 'EzyWall', cat: 'AAC Wall Panels', margin: '32%', desc: '0% seepage, 3x faster speed' },
    { name: 'Bondex', cat: 'Tile Adhesives', margin: '35%', desc: 'EN 12004 C2TE polymer high-grab' },
    { name: 'Sanivo', cat: 'Bath & Sanitaryware', margin: '30%', desc: 'Rimless commodes & CP brass' },
    { name: 'HydroLine', cat: 'CPVC & UPVC Pipes', margin: '28%', desc: 'ASTM D2846 leak-lock plumbing' },
  ];

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkPincode.trim().length === 6) {
      setPincodeStatus(`Territory Status: Open & Pre-Approved for ${checkPincode}`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit postal code');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '90vh', paddingBottom: 80 }}>
      {/* Top Hero Banner */}
      <section style={{ background: 'linear-gradient(135deg, #0E3128 0%, #133028 100%)', color: '#FFFFFF', padding: '48px 0' }}>
        <div className="site-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#A7F3D0', marginBottom: 12 }}>
            <Link href="/" style={{ color: '#A7F3D0', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <span style={{ color: 'var(--primary-orange)', fontWeight: 700 }}>Exclusive Territory Dealership</span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(249, 121, 56, 0.25)', color: 'var(--primary-orange)', padding: '4px 12px', borderRadius: 20, fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', marginBottom: 12 }}>
            <span>⭐</span> 20%–35% Gross Margins · Zero Dead Stock Risk
          </div>

          <h1 style={{ fontSize: 36, fontWeight: 900, marginBottom: 10, lineHeight: 1.2 }}>
            Stronger Margins. Stronger Brands. Exclusive Pincode Rights.
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', maxWidth: 760, lineHeight: 1.55 }}>
            Traditional national building brands squeeze dealers with razor-thin 4–6% margins. Matelioverse gives you certified proprietary private labels with protected postal territory rights, demand-led digital fulfillment, and revolving credit.
          </p>
        </div>
      </section>

      {/* Segment Selector & Simulator */}
      <div className="site-container" style={{ marginTop: 36 }}>
        {/* Partnership Mode Switch */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <div style={{ background: '#FFFFFF', padding: 6, borderRadius: 16, border: '1px solid #CBD5E1', display: 'flex', gap: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <button
              type="button"
              onClick={() => setPartnerMode('dealer')}
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                fontSize: 13.5,
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                background: partnerMode === 'dealer' ? 'var(--primary-green)' : 'transparent',
                color: partnerMode === 'dealer' ? '#FFFFFF' : '#475569',
                transition: 'all 0.15s ease',
              }}
            >
              🏪 Authorized Private Label Dealer
            </button>
            <button
              type="button"
              onClick={() => setPartnerMode('franchise')}
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                fontSize: 13.5,
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                background: partnerMode === 'franchise' ? 'var(--primary-green)' : 'transparent',
                color: partnerMode === 'franchise' ? '#FFFFFF' : '#475569',
                transition: 'all 0.15s ease',
              }}
            >
              🏬 Open a Franchise Smart Store
            </button>
          </div>
        </div>

        {/* Interactive Margin & Profit Simulator */}
        <div
          style={{
            background: '#FFFFFF',
            border: '2px solid #F59E0B',
            borderRadius: 24,
            padding: '36px',
            boxShadow: '0 8px 30px rgba(180, 83, 9, 0.08)',
            marginBottom: 44,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FEF3C7', color: '#B45309', padding: '3px 10px', borderRadius: 16, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', marginBottom: 6 }}>
                <span>📈</span> Interactive Profit Simulator
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', margin: 0 }}>
                Calculate Your Dealer Gross Profit with Matelio Brands
              </h2>
            </div>

            {/* Pincode Availability Checker */}
            <form onSubmit={handlePincodeCheck} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="text"
                value={checkPincode}
                onChange={(e) => setCheckPincode(e.target.value)}
                placeholder="Enter 6-digit Pincode"
                maxLength={6}
                style={{
                  border: '1.5px solid #CBD5E1',
                  borderRadius: 10,
                  padding: '8px 12px',
                  fontSize: 13,
                  fontWeight: 700,
                  outline: 'none',
                  width: 170,
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'var(--primary-orange)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: 12.5,
                  padding: '8px 16px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Check Exclusivity
              </button>
            </form>
          </div>

          {pincodeStatus && (
            <div style={{ background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0', padding: '8px 16px', borderRadius: 8, fontSize: 12.5, fontWeight: 700, marginBottom: 24 }}>
              ✓ {pincodeStatus}
            </div>
          )}

          {/* Turnover Slider */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#334155' }}>
                Your Projected Monthly Material Billing:
              </span>
              <span style={{ fontSize: 24, fontWeight: 900, color: 'var(--primary-orange)' }}>
                ₹{monthlyTurnover} Lakhs / Month
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              step={5}
              value={monthlyTurnover}
              onChange={(e) => setMonthlyTurnover(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary-orange)', height: 8, cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94A3B8', marginTop: 4 }}>
              <span>₹5 Lakhs</span>
              <span>₹25 Lakhs</span>
              <span>₹50 Lakhs</span>
              <span>₹75 Lakhs</span>
              <span>₹1 Crore</span>
            </div>
          </div>

          {/* Comparison Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 28 }} className="why-matelio-grid">
            <div style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
                Legacy Brands (UltraTech / Tata / Kajaria)
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#64748B', marginTop: 6, marginBottom: 4 }}>
                ₹{traditionalGrossProfit}L <span style={{ fontSize: 12, fontWeight: 600 }}>/ mo</span>
              </div>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>
                Average 5% gross margin after freight and credit discount deductions.
              </div>
            </div>

            <div style={{ background: '#FEF3C7', border: '2px solid #F59E0B', borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: '#B45309', textTransform: 'uppercase' }}>
                ⭐ Matelioverse Private Labels
              </div>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#78350F', marginTop: 6, marginBottom: 4 }}>
                ₹{estimatedGrossProfit}L <span style={{ fontSize: 13, fontWeight: 600 }}>/ mo</span>
              </div>
              <div style={{ fontSize: 12, color: '#92400E' }}>
                Blended 28% gross margin direct from manufacturing plants.
              </div>
            </div>

            <div style={{ background: '#ECFDF5', border: '2px solid #10B981', borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: '#047857', textTransform: 'uppercase' }}>
                Extra Annual Profit Unlocked
              </div>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#065F46', marginTop: 6, marginBottom: 4 }}>
                +₹{extraProfitAnnual} Lakhs
              </div>
              <div style={{ fontSize: 12, color: '#047857' }}>
                Plus up to ₹25L Matelio revolving credit to scale working capital.
              </div>
            </div>
          </div>

          {/* 6 Core Private Labels Margins */}
          <div style={{ borderTop: '1px dashed #CBD5E1', paddingTop: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginBottom: 14 }}>
              Guaranteed Dealer Margins Across Matelioverse Proprietary Labels:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
              {brands.map((b) => (
                <div key={b.name} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <strong style={{ fontSize: 13, color: '#0F172A' }}>{b.name}</strong>
                    <span style={{ background: '#FEF3C7', color: '#B45309', fontSize: 10.5, fontWeight: 800, padding: '2px 6px', borderRadius: 6 }}>
                      {b.margin}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>{b.cat}</div>
                  <div style={{ fontSize: 10.5, color: '#94A3B8', marginTop: 2 }}>{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Smart Store Kit Preview & Features */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 48 }} className="why-matelio-grid">
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 18, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 26, marginBottom: 12 }}>📍</div>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
              Pincode Territory Exclusivity
            </h3>
            <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>
              Guaranteed geo-tagged territorial rights. Any digital orders or contractor BOQ deliveries generated in your designated postal code are credited to your dealer ledger.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 18, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 26, marginBottom: 12 }}>🏬</div>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
              Lean Digital Surface Studio
            </h3>
            <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>
              No need to lock ₹2 Crore in slow-moving inventory. Display physical surface samples, while our regional fulfillment depots handle heavy plant dispatches directly to site.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 18, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 26, marginBottom: 12 }}>📊</div>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
              AI Demand &amp; OMS Dashboard
            </h3>
            <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>
              Dealer portal gives real-time visibility into local infrastructure projects, automated inventory re-ordering, and computerized test sheets for every consignment.
            </p>
          </div>
        </div>

        {/* Application Form */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 20, padding: 36, maxWidth: 720, margin: '0 auto', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <span style={{ fontSize: 48, display: 'block', marginBottom: 12 }}>🤝</span>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 8 }}>
                Territory Application Logged!
              </h3>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.5, marginBottom: 20 }}>
                Thank you, <strong>{formData.name}</strong>. Our commercial director for Gujarat will reach out on <strong>+91 {formData.phone}</strong> with the territory feasibility and franchise kit for <strong>{formData.city} ({formData.pincode})</strong>.
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
                  Apply for Territory Exclusivity &amp; Dealership
                </h3>
                <p style={{ fontSize: 13.5, color: '#64748B' }}>
                  Reserve your city or district before territory allocation closes in Gujarat
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
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="98249 XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                      style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      Target City / District *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ahmedabad, Surat, Vadodara, etc."
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5 }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      Postal Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 382421"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5 }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Current Business Profile &amp; Experience
                  </label>
                  <select
                    value={formData.currentBusiness}
                    onChange={(e) => setFormData({ ...formData, currentBusiness: e.target.value })}
                    style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5, background: '#fff' }}
                  >
                    <option>Building Materials / Hardware Retailer (Tiles, Sanitary, Paint)</option>
                    <option>Steel &amp; Cement Stockist / Wholesaler</option>
                    <option>Civil Contractor / Turnkey Builder</option>
                    <option>New Entrepreneur / Infra Investor</option>
                  </select>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    height: 50,
                    background: 'var(--primary-orange)',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: 15,
                    borderRadius: 12,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(249, 121, 56, 0.35)',
                  }}
                >
                  RESERVE TERRITORY DEALERSHIP →
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
