'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HUBS } from '@/data/hubs';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Site Delivery & Material Inquiries',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '85vh', paddingBottom: 60 }}>
      {/* Hero Banner */}
      <section style={{ background: 'linear-gradient(135deg, #0A2540 0%, #06192C 100%)', color: '#FFFFFF', padding: '44px 0' }}>
        <div className="site-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#94A3B8', marginBottom: 12 }}>
            <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <span style={{ color: '#34D399', fontWeight: 700 }}>Contact Us &amp; Fulfillment Hubs</span>
          </div>
          <h1 style={{ fontSize: 34, fontWeight: 900, marginBottom: 8 }}>
            Contact Matelioverse Logistics &amp; Support
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', maxWidth: 640 }}>
            Reach our central headquarters in Ahmedabad or connect with our regional dispatch hubs across India.
          </p>
        </div>
      </section>

      <div className="site-container" style={{ marginTop: 36 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32 }} className="contact-layout-2col">
          {/* Left: Hub Directory */}
          <div>
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 20, padding: 28, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#ECFDF5', color: '#047857', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', marginBottom: 8 }}>
                Corporate Headquarters
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
                Ahmedabad Central Hub
              </h3>
              <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.5, marginBottom: 16 }}>
                405 Claywalls, OPP. Shanti Palace, Hebatpur Road, Thaltej, Ahmedabad, Gujarat 380054
              </p>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', paddingTop: 14, borderTop: '1px solid #E2E8F0' }}>
                <a href="tel:+919824939888" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#0F172A', fontWeight: 700, fontSize: 13.5, textDecoration: 'none' }}>
                  <span>📞</span> +91 98249 39888
                </a>
                <a href="mailto:hello@matelioverse.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--primary-green)', fontWeight: 700, fontSize: 13.5, textDecoration: 'none' }}>
                  <span>✉️</span> hello@matelioverse.com
                </a>
                <a href="https://wa.me/919824939888" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#059669', fontWeight: 800, fontSize: 13.5, textDecoration: 'none' }}>
                  <span>💬</span> WhatsApp Logistics Desk
                </a>
              </div>
            </div>

            {/* Regional Hubs Grid */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 20, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
              <h4 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 16 }}>
                Regional Sourcing &amp; Dispatch Depots
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {HUBS.slice(1).map((hub) => (
                  <div key={hub.id} style={{ border: '1px solid #F1F5F9', background: '#F8FAFC', borderRadius: 12, padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>{hub.name} Hub</span>
                      <span style={{ fontSize: 10, background: '#ECFDF5', color: '#047857', padding: '1px 5px', borderRadius: 4, fontWeight: 800 }}>ACTIVE</span>
                    </div>
                    <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.4, margin: '4px 0 6px 0' }}>
                      {hub.address}
                    </p>
                    <div style={{ fontSize: 11.5, color: 'var(--primary-green)', fontWeight: 700 }}>
                      ⚡ {hub.instantSla}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 20, padding: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '36px 12px' }}>
                <span style={{ fontSize: 44, display: 'block', marginBottom: 12 }}>✉️</span>
                <h3 style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', marginBottom: 6 }}>
                  Message Sent Successfully!
                </h3>
                <p style={{ fontSize: 13.5, color: '#64748B', lineHeight: 1.5, marginBottom: 20 }}>
                  Thank you, <strong>{formData.name}</strong>. Our site support team will get back to you within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  style={{ background: 'var(--primary-green)', color: '#fff', padding: '10px 24px', borderRadius: 10, fontWeight: 700, border: 'none', cursor: 'pointer' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>
                  Send an Inquiry
                </h3>
                <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>
                  Have questions regarding site deliveries, bulk tonnage, or lab certificates? Let us know.
                </p>

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5 }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
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
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5 }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5, background: '#fff' }}
                    >
                      <option>Site Delivery &amp; Material Inquiries</option>
                      <option>Large Project BOQ Quotation</option>
                      <option>Matelio Credit Line / Payment Query</option>
                      <option>Franchise &amp; Dealership Inquiry</option>
                      <option>Quality &amp; Lab Test Certificate</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      Message or Site Details *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your site query, delivery timeline, or material questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5 }}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      height: 48,
                      background: 'var(--primary-green)',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: 14.5,
                      borderRadius: 12,
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(0, 168, 107, 0.35)',
                    }}
                  >
                    SEND MESSAGE →
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
