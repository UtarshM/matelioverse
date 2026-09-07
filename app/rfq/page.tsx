'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RFQPage() {
  const [submitted, setSubmitted] = useState(false);
  const [quoteId, setQuoteId] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    mobile: '',
    city: 'Ahmedabad',
    productCategory: 'Mixed BOQ (Cement, TMT, AAC, Tiles)',
    requirements: '',
    deliveryTimeline: 'Within 3-5 Days',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `BOQ-${Math.floor(10000 + Math.random() * 90000)}`;
    setQuoteId(id);
    setSubmitted(true);
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '85vh', paddingBottom: 60 }}>
      {/* Top Banner */}
      <section style={{ background: 'linear-gradient(135deg, #0E3128 0%, #133028 100%)', color: '#FFFFFF', padding: '40px 0' }}>
        <div className="site-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#94A3B8', marginBottom: 12 }}>
            <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <span style={{ color: 'var(--primary-orange)', fontWeight: 700 }}>Bulk Procurement &amp; BOQ Quote</span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>
            Matelio BOQ Quote — Direct Plant Commercial Rates
          </h1>
          <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.85)', maxWidth: 680, lineHeight: 1.5 }}>
            Submit your Bill of Quantities (BOQ) or large project requisition. Get a consolidated single-invoice wholesale quotation across our private labels within 4 hours.
          </p>
        </div>
      </section>

      {/* Main Layout */}
      <div className="site-container" style={{ marginTop: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 32 }} className="contact-layout-2col">
          {/* Left: Why Procure via Matelio BOQ */}
          <div>
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 20, padding: 28, boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 18 }}>
                Contractor &amp; Builder Advantages
              </h3>

              <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#ECFDF5', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  💎
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>Direct Manufacturer Pricing</div>
                  <div style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.45, marginTop: 2 }}>
                    Bypass 3-tier distributor markups on CemXtra, Tuffar TMT, EzyWall AAC, and TileTrendz.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  📜
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>Guaranteed Mill Test Certificates</div>
                  <div style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.45, marginTop: 2 }}>
                    Batch lab test certificates and BIS conformance reports provided with every truck dispatch.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  ⚡
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>Dedicated Key Account Manager</div>
                  <div style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.45, marginTop: 2 }}>
                    Single point of contact for daily site dispatch schedules, weighbridge slips, and credit terms.
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #E2E8F0' }}>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>
                  Need Instant WhatsApp Assistance?
                </h4>
                <a
                  href="https://wa.me/919824939888?text=Hello%20Matelioverse,%20I%20have%20a%20project%20BOQ%20requirement."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#059669', fontWeight: 800, textDecoration: 'none', fontSize: 14 }}
                >
                  <span>💬 Share BOQ on WhatsApp (+91 98249 39888)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Submission Form */}
          <div>
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 20, padding: 32, boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '36px 12px' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#ECFDF5', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 16px', fontWeight: 900 }}>
                    ✓
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 8 }}>
                    BOQ Requisition Logged!
                  </h3>
                  <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.5, marginBottom: 20 }}>
                    Your quotation requisition reference is <strong>#{quoteId}</strong>. Our senior pricing engineer is preparing your itemized rates for <strong>{formData.city}</strong> site offloading.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    style={{ background: 'var(--primary-green)', color: '#fff', padding: '10px 24px', borderRadius: 10, fontWeight: 700, border: 'none', cursor: 'pointer' }}
                  >
                    Submit Another BOQ
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: 19, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>
                    Submit Project Requisition
                  </h3>
                  <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>
                    Enter your site requirements or item specifications below
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 14 }}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                        Company / Contractor Entity *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Paramount Infra Developers LLP"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5 }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                          Contact Person *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          value={formData.contactPerson}
                          onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
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
                          pattern="[0-9]{10}"
                          placeholder="98249 XXXXX"
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                          style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5 }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                          Delivery Site City *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="City, State"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5 }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                          Primary Product Line
                        </label>
                        <select
                          value={formData.productCategory}
                          onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                          style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5, background: '#fff' }}
                        >
                          <option>Mixed BOQ (Cement, TMT, AAC, Tiles)</option>
                          <option>CemXtra Cement / GGBS</option>
                          <option>Tuffar Fe550D TMT Steel</option>
                          <option>EzyWall AAC Wall Panels</option>
                          <option>TileTrendz Vitrified Tiles</option>
                          <option>HydroLine Plumbing &amp; CPVC</option>
                          <option>Strongfab Structural Steel</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ marginBottom: 18 }}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                        Itemized BOQ Requirements / Approximate Tonnage
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Mention item grades, sizes (e.g. 50 Tons 12mm TMT, 500 Bags OPC 53, 200 Panels EzyWall 100mm)..."
                        value={formData.requirements}
                        onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                        style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5 }}
                      ></textarea>
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
                      REQUEST SPOT QUOTATION →
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
