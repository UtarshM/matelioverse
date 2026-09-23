'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import { HUBS } from '@/data/hubs';
import ProductCard from '@/components/Commerce/ProductCard';
import PromoBannerSlider from '@/components/Commerce/PromoBannerSlider';
import CreditLineBanner from '@/components/B2B/CreditLineBanner';
import { useLocation } from '@/context/LocationContext';

export default function HomePage() {
  const { currentHub, pincode, setPincode, openLocationModal } = useLocation();
  const [inputPincode, setInputPincode] = useState(pincode);
  const [pincodeMessage, setPincodeMessage] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<'all' | 'urgent' | 'foundation' | 'masonry' | 'finishing'>('all');
  const [activeCityHub, setActiveCityHub] = useState<string>('ahmedabad');

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = inputPincode.trim();
    if (cleanPin.length === 6) {
      setPincode(cleanPin);
      setPincodeMessage(`⚡ 90-Minute Express Delivery is Active for Pincode ${cleanPin}!`);
    } else {
      setPincodeMessage('Please enter a valid 6-digit postal code.');
    }
  };

  // Filter products by SLA type & project stage
  const instantProducts = PRODUCTS.filter((p) => p.slaType === 'instant');
  const heavyMaterials = PRODUCTS.filter((p) => p.slaType === 'scheduled');

  const filteredInstantProducts = instantProducts.filter((p) => {
    if (selectedStage === 'all' || selectedStage === 'urgent') return true;
    if (selectedStage === 'foundation') return p.categorySlug.includes('cement') || p.categorySlug.includes('steel');
    if (selectedStage === 'masonry') return p.categorySlug.includes('aac') || p.categorySlug.includes('adhesive');
    if (selectedStage === 'finishing') return p.categorySlug.includes('tile') || p.categorySlug.includes('sanitary') || p.categorySlug.includes('plumbing');
    return true;
  });

  return (
    <div>
      {/* ==========================================================================
           URGENT QUICK-COMMERCE SPLIT HERO (CONSUMER & CONTRACTOR FOCUS)
           ========================================================================== */}
      <section style={{ background: '#081D17', color: '#FFFFFF', padding: '28px 0 36px 0', borderBottom: '1px solid #1C5A4A' }}>
        <div className="site-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, alignItems: 'stretch' }} className="hero-split-grid">
            
            {/* HERO CARD 1: PRIMARY 90-MIN SITE ESSENTIALS */}
            <div
              style={{
                background: 'linear-gradient(145deg, #0E3128 0%, #133D32 100%)',
                border: '1.5px solid #236E5A',
                borderRadius: 24,
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35)',
              }}
            >
              {/* Background Glow */}
              <div
                style={{
                  position: 'absolute',
                  top: -60,
                  right: -60,
                  width: 220,
                  height: 220,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(249, 121, 56, 0.25) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(249, 121, 56, 0.2)', color: 'var(--primary-orange)', padding: '4px 12px', borderRadius: 20, fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 14 }}>
                  <span>⚡</span> 90-Minute Job-Site Delivery Guarantee
                </div>

                <h1 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.2, color: '#FFFFFF', marginBottom: 12 }}>
                  Hardware Store to Your Doorstep in <span style={{ color: 'var(--primary-orange)' }}>90 Minutes.</span>
                </h1>

                <p style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.86)', lineHeight: 1.55, marginBottom: 20 }}>
                  Never halt your site workforce. Get CPVC pipes, tile adhesives, drill bits, waterproof coatings, cutting blades, and safety gear delivered straight to your site gate before lunch.
                </p>

                {/* Live Pincode Quick Eligibility Checker */}
                <form
                  onSubmit={handleCheckPincode}
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: 14,
                    padding: 8,
                    display: 'flex',
                    gap: 8,
                    marginBottom: 14,
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: 16, paddingLeft: 8 }}>📍</span>
                  <input
                    type="text"
                    value={inputPincode}
                    onChange={(e) => setInputPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter your Site Pincode (e.g. 382421)"
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      color: '#FFFFFF',
                      fontSize: 13.5,
                      fontWeight: 700,
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: 'var(--primary-orange)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: 10,
                      padding: '9px 18px',
                      fontSize: 12.5,
                      fontWeight: 800,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Check Speed ⚡
                  </button>
                </form>

                {pincodeMessage && (
                  <div style={{ fontSize: 12, color: '#A7F3D0', fontWeight: 700, marginBottom: 14 }}>
                    {pincodeMessage}
                  </div>
                )}

                {/* 4 Micro Trust Badges */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#E2E8F0', fontWeight: 600 }}>
                    <span style={{ color: 'var(--primary-orange)' }}>✓</span> No Minimum Order
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#E2E8F0', fontWeight: 600 }}>
                    <span style={{ color: 'var(--primary-orange)' }}>✓</span> Live GPS Fleet Tracking
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#E2E8F0', fontWeight: 600 }}>
                    <span style={{ color: 'var(--primary-orange)' }}>✓</span> Pay on Delivery / UPI
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#E2E8F0', fontWeight: 600 }}>
                    <span style={{ color: 'var(--primary-orange)' }}>✓</span> QR Batch BIS Grade
                  </div>
                </div>
              </div>

              {/* CTAs and Delivery Image */}
              <div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
                  <Link
                    href="/categories"
                    style={{
                      background: 'var(--primary-orange)',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: 14,
                      padding: '12px 24px',
                      borderRadius: 24,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      boxShadow: '0 4px 14px rgba(249, 121, 56, 0.4)',
                    }}
                  >
                    <span>Order Site Essentials (90 Mins)</span>
                    <span>→</span>
                  </Link>
                  <Link
                    href="/rfq"
                    style={{
                      color: '#FFFFFF',
                      border: '1.5px solid rgba(255,255,255,0.4)',
                      padding: '11px 20px',
                      borderRadius: 24,
                      textDecoration: 'none',
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    ⚡ Instant AI Quote
                  </Link>
                </div>

                {/* Generated Quick Delivery Image */}
                <div style={{ borderRadius: 14, overflow: 'hidden', height: 160, position: 'relative', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <img
                    src="/images/quick-delivery-van.jpg"
                    alt="Matelioverse 90-Minute Quick Site Delivery Fleet"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(14,49,40,0.95) 100%)', padding: '8px 14px', fontSize: 11.5, color: '#A7F3D0', fontWeight: 700 }}>
                    ⚡ Dispatched from {currentHub.name} Hub · Next delivery slot in 20 mins
                  </div>
                </div>
              </div>
            </div>

            {/* HERO CARD 2: PLANT-DIRECT HEAVY STRUCTURAL FREIGHT */}
            <div
              style={{
                background: 'linear-gradient(145deg, #122B23 0%, #1B3F35 100%)',
                border: '1.5px solid #2A6E59',
                borderRadius: 24,
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35)',
              }}
            >
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(16, 185, 129, 0.2)', color: '#34D399', padding: '4px 12px', borderRadius: 20, fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 14 }}>
                  <span>🚛</span> Plant-Direct Bulk Dispatch · Mill Rates
                </div>

                <h2 style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.25, color: '#FFFFFF', marginBottom: 12 }}>
                  Bulk Steel, Cement &amp; AAC at Factory Rates.
                </h2>

                <p style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.55, marginBottom: 20 }}>
                  Save 12–18% by eliminating 3-tier distributor markups. Full truckload consignments direct from plants with computerized mill test certificates and weighbridge slips.
                </p>

                <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 14, padding: 14, border: '1px solid rgba(255,255,255,0.1)', marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 6 }}>
                    <span style={{ color: '#94A3B8' }}>Fe550D TMT (Tuffar / JSW):</span>
                    <strong style={{ color: '#A7F3D0' }}>Spot Rate: From ₹51,800/MT</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 6 }}>
                    <span style={{ color: '#94A3B8' }}>OPC 53 Cement (CemXtra / UltraTech):</span>
                    <strong style={{ color: '#A7F3D0' }}>From ₹342/Bag Direct</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
                    <span style={{ color: '#94A3B8' }}>Working Capital Credit:</span>
                    <strong style={{ color: 'var(--primary-orange)' }}>Up to ₹25L (90 Days)</strong>
                  </div>
                </div>

                {/* Generated Heavy Freight Image */}
                <div style={{ borderRadius: 14, overflow: 'hidden', height: 160, position: 'relative', border: '1px solid rgba(255,255,255,0.15)', marginBottom: 20 }}>
                  <img
                    src="/images/heavy-plant-freight.jpg"
                    alt="Matelioverse Plant Direct TMT Steel and Cement Truck Offloading"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(14,49,40,0.95) 100%)', padding: '8px 14px', fontSize: 11.5, color: '#A7F3D0', fontWeight: 700 }}>
                    🚛 Direct Factory Consignments · Computerized Weighbridge Slip Included
                  </div>
                </div>
              </div>

              <div>
                <Link
                  href="/rfq"
                  style={{
                    background: '#FFFFFF',
                    color: '#0E3128',
                    fontWeight: 900,
                    fontSize: 14,
                    padding: '12px 24px',
                    borderRadius: 24,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    boxShadow: '0 4px 14px rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <span>Upload BOQ for Magic AI Quote (60s)</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================================================
           "WHERE WE DELIVER" SERVICEABLE HUBS & LIVE SLA STRIP
           ========================================================================== */}
      <section style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '20px 0' }}>
        <div className="site-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--primary-orange)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Active Service Coverage
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0F172A', margin: '2px 0 0 0' }}>
                Where We Deliver in Gujarat
              </h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: '#475569' }}>
              <span>Current Hub: <strong>{currentHub.name} ({pincode})</strong></span>
              <button
                type="button"
                onClick={openLocationModal}
                style={{ color: 'var(--primary-green)', fontWeight: 800, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Change Hub
              </button>
            </div>
          </div>

          {/* Hub SLA Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {HUBS.map((hub) => {
              const isCurrent = hub.id === currentHub.id;
              return (
                <div
                  key={hub.id}
                  style={{
                    background: isCurrent ? '#ECFDF5' : '#FFFFFF',
                    border: `1.5px solid ${isCurrent ? '#10B981' : '#E2E8F0'}`,
                    borderRadius: 12,
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: isCurrent ? '#064E3B' : '#0F172A' }}>
                      {hub.name}
                    </div>
                    <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                      {hub.supportedPincodes.length}+ Pincodes Covered
                    </div>
                  </div>
                  <span
                    style={{
                      background: isCurrent ? 'var(--primary-orange)' : '#F1F5F9',
                      color: isCurrent ? '#FFFFFF' : '#475569',
                      fontSize: 10.5,
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: 10,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    ⚡ {hub.instantSla}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================================================
           PROMOTIONAL OFFER BANNER SLIDER
           ========================================================================== */}
      <PromoBannerSlider />

      {/* ==========================================================================
           BROWSE BY URGENT NEED / PROJECT STAGE
           ========================================================================== */}
      <section style={{ padding: '28px 0 12px 0', background: '#FFFFFF' }}>
        <div className="site-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 4 }}>
                Shop by Urgent Need &amp; Project Stage
              </h2>
              <p style={{ fontSize: 13.5, color: '#64748B', margin: 0 }}>
                Filter materials required for your active construction or repair phase
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {[
              { id: 'all', label: 'All Urgent Items', icon: '⚡' },
              { id: 'urgent', label: 'Site Essentials (90 Mins)', icon: '🚨' },
              { id: 'foundation', label: 'Foundation & Steel', icon: '🏗️' },
              { id: 'masonry', label: 'Masonry & AAC Walls', icon: '🧱' },
              { id: 'finishing', label: 'Surfaces, Bath & Tiles', icon: '✨' },
            ].map((tab) => {
              const active = selectedStage === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedStage(tab.id as any)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 16px',
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 800,
                    border: `1.5px solid ${active ? 'var(--primary-green)' : '#CBD5E1'}`,
                    background: active ? 'var(--primary-green)' : '#F8FAFC',
                    color: active ? '#FFFFFF' : '#334155',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================================================
           QUICK-COMMERCE PRODUCT GRID 1: INSTANT DELIVERY (90 MINS)
           ========================================================================== */}
      <section style={{ padding: '24px 0 40px 0', background: '#F8FAFC' }}>
        <div className="site-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--secondary-mint)', color: 'var(--secondary-green)', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>
                ⚡ {currentHub.instantSla} · No Minimum Order
              </div>
              <h2 className="section-title-h2" style={{ fontSize: 24, margin: '2px 0 4px 0' }}>
                Instant Site Essentials ({currentHub.instantSla})
              </h2>
              <p style={{ fontSize: 13.5, color: '#64748B' }}>
                Tile adhesives, CPVC pipes, sealants, drill bits, fasteners, and safety gear delivered straight to your job site
              </p>
            </div>
            <Link href="/categories" style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary-green)', textDecoration: 'none' }}>
              View All Quick Items ›
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {filteredInstantProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
           QUICK-COMMERCE PRODUCT GRID 2: HEAVY MATERIALS (SAME-DAY / SCHEDULED)
           ========================================================================== */}
      <section style={{ padding: '40px 0', background: '#FFFFFF' }}>
        <div className="site-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--primary-orange-light)', color: 'var(--primary-orange-active)', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>
                🚛 Direct Factory Dispatch
              </div>
              <h2 className="section-title-h2" style={{ fontSize: 24, margin: '2px 0 4px 0' }}>
                Structural &amp; Foundation Materials (Same-Day Freight)
              </h2>
              <p style={{ fontSize: 13.5, color: '#64748B' }}>
                Primary billet Fe550D TMT, OPC 53 cement, AAC panels, and vitrified tiles with computerized test sheets
              </p>
            </div>
            <Link href="/rfq" style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary-orange)', textDecoration: 'none' }}>
              Plan Bulk Consignment →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {heavyMaterials.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
           B2B REVOLVING CREDIT LINE BANNER (UP TO ₹25L)
           ========================================================================== */}
      <section style={{ padding: '16px 0 32px 0' }}>
        <div className="site-container">
          <CreditLineBanner />
        </div>
      </section>

      {/* ==========================================================================
           MATELIOVERSE PROPRIETARY PRIVATE LABELS (HIGHLIGHT COLOR #FCEFD2)
           ========================================================================== */}
      <section style={{ padding: '16px 0 48px 0', background: '#F8FAFC' }}>
        <div className="site-container">
          <div
            style={{
              background: '#FCEFD2',
              border: '2px solid #F59E0B',
              borderRadius: 24,
              padding: '36px 32px',
              boxShadow: '0 8px 30px rgba(180, 83, 9, 0.09)',
            }}
            className="pvt-showcase-box"
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
              <div style={{ maxWidth: 680 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#F59E0B', color: '#FFFFFF', padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>
                  <span>⭐</span> PROPRIETARY PRIVATE LABELS · 20%–35% DEALER MARGINS
                </div>
                <h2 style={{ fontSize: 28, fontWeight: 900, color: '#78350F', lineHeight: 1.25, marginBottom: 8 }}>
                  Our Own Brands. Engineered for High Margins &amp; Factory Precision.
                </h2>
                <p style={{ fontSize: 14, color: '#92400E', lineHeight: 1.55 }}>
                  Replacing generic low-margin supplies with high-recall, certified own-brands. Backed by computerized mill test certificates, 100% direct-from-plant logistics, and exclusive territory dealership rights.
                </p>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/categories"
                  style={{
                    background: '#D97706',
                    color: '#FFFFFF',
                    padding: '10px 20px',
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 800,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)',
                  }}
                >
                  <span>⭐</span> Explore Own Brands Catalog
                </Link>
                <Link
                  href="/partner"
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid #D97706',
                    color: '#78350F',
                    padding: '10px 20px',
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  Franchise Territory Dealership →
                </Link>
              </div>
            </div>

            {/* 9 Private Label Brands Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 16,
              }}
              className="pvt-brands-grid"
            >
              {[
                {
                  name: 'TileTrendz',
                  category: 'Vitrified & GVT Tiles',
                  highlight: '28% Margin · Morbi Direct',
                  spec: 'GVT, PGVT, Full Body, High-gloss 600x1200mm slabs with zero curvature tolerance.',
                  slug: 'tiles-surfaces',
                  icon: '✨',
                },
                {
                  name: 'Tuffar®',
                  category: 'Fe550D TMT Steel Rebars',
                  highlight: '20% Margin · BIS 1786',
                  spec: 'Primary billet manufactured Fe550D earthquake-resistant TMT rebars with computerized mill test sheets.',
                  slug: 'tmt-steel',
                  icon: '🔩',
                },
                {
                  name: 'EzyWall',
                  category: 'AAC Wall Panels & Blocks',
                  highlight: '32% Margin · 3x Fast Speed',
                  spec: 'Lightweight reinforced autoclaved aerated concrete wall panels. 0% wall seepage with acoustic barrier.',
                  slug: 'aac-panels',
                  icon: '🧱',
                },
                {
                  name: 'Bondex',
                  category: 'Tile Adhesives & Waterproofing',
                  highlight: '35% Margin · EN 12004 C2TE',
                  spec: 'Polymer-modified high grab tile adhesives, epoxy grouts, and crack-bridging waterproofing coatings.',
                  slug: 'adhesives-chemicals',
                  icon: '🧪',
                },
                {
                  name: 'Sanivo',
                  category: 'Sanitaryware & Bathware',
                  highlight: '30% Margin · Nano Glaze',
                  spec: 'Rimless wall-hung commodes, vanity basins, and certified CP brass bath fittings with 10-year warranty.',
                  slug: 'sanitaryware',
                  icon: '🚿',
                },
                {
                  name: 'HydroLine',
                  category: 'CPVC & UPVC Piping Systems',
                  highlight: '28% Margin · ASTM D2846',
                  spec: 'Lead-free hot & cold water plumbing systems, pressure-rated UPVC conduit & fittings with leak-lock design.',
                  slug: 'plumbing-pipes',
                  icon: '🚰',
                },
                {
                  name: 'CemXtra',
                  category: 'OPC 53 & PPC Plant Cement',
                  highlight: '22% Margin · 53 MPa Tested',
                  spec: 'Direct clinker plant dispatch, high early compressive strength for structural casting and heavy slabs.',
                  slug: 'cement-ggbs',
                  icon: '🏗️',
                },
                {
                  name: 'Strongfab',
                  category: 'Structural Steel & Heavy Beams',
                  highlight: '24% Margin · IS 2062 Tested',
                  spec: 'Fabricated I-beams, MS channels, angles, and tubular hollow sections with computerized cut lengths.',
                  slug: 'structural-steel',
                  icon: '📐',
                },
                {
                  name: 'ReflectoGlass',
                  category: 'Architectural & Facade Glass',
                  highlight: '30% Margin · High U-Value',
                  spec: 'Toughened solar-control low-E safety glass, double glazed insulated acoustic panels for modern facades.',
                  slug: 'architectural-glass',
                  icon: '🏢',
                },
              ].map((b) => (
                <Link
                  key={b.name}
                  href={`/categories?category=${b.slug}&brand=${encodeURIComponent(b.name)}#${b.slug}`}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #FCD34D',
                    borderRadius: 16,
                    padding: '18px 20px',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 8px rgba(180, 83, 9, 0.05)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  className="pvt-brand-card-item"
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 20 }}>{b.icon}</span>
                        <h3 style={{ fontSize: 17, fontWeight: 900, color: '#0F172A', margin: 0 }}>
                          {b.name}
                        </h3>
                      </div>
                      <span
                        style={{
                          fontSize: 10.5,
                          fontWeight: 800,
                          background: '#FEF3C7',
                          color: '#B45309',
                          border: '1px solid #FDE68A',
                          padding: '2px 8px',
                          borderRadius: 6,
                        }}
                      >
                        {b.highlight}
                      </span>
                    </div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--primary-orange)', textTransform: 'uppercase', marginBottom: 6 }}>
                      {b.category}
                    </div>
                    <p style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.45, margin: 0 }}>
                      {b.spec}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, paddingTop: 10, borderTop: '1px dashed #F1F5F9', fontSize: 12, fontWeight: 700, color: '#B45309' }}>
                    <span>Browse Products</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           PARTNER CTA BANNER
           ========================================================================== */}
      <section className="section-block" style={{ padding: '16px 0 40px 0' }}>
        <div className="site-container">
          <div style={{ background: 'linear-gradient(135deg, #0E3128 0%, #133028 100%)', borderRadius: 24, padding: '44px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#FFFFFF' }} className="partner-cta-box">
            <div style={{ maxWidth: 600 }}>
              <span style={{ background: 'rgba(249, 121, 56, 0.2)', color: 'var(--primary-orange)', fontSize: 11.5, fontWeight: 800, padding: '4px 12px', borderRadius: 12, textTransform: 'uppercase' }}>
                Franchise &amp; Dealership Network
              </span>
              <h2 style={{ fontSize: 28, fontWeight: 800, marginTop: 10, marginBottom: 8, lineHeight: 1.25 }}>
                Be Part of the Matelioverse.
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                Join the movement that’s modernizing India’s ₹100,000 Cr+ retail building material market. Whether you’re a dealer, distributor, or franchisee — Matelioverse gives you high margin recall brands.
              </p>
            </div>
            <div>
              <Link href="/partner" className="hero-white-pill-btn" style={{ background: 'var(--primary-orange)', color: '#FFFFFF', fontSize: 14, padding: '14px 36px', boxShadow: '0 4px 16px rgba(249, 121, 56, 0.35)' }}>
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
