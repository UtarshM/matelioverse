'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/Commerce/ProductCard';
import PromoBannerSlider from '@/components/Commerce/PromoBannerSlider';
import CreditLineBanner from '@/components/B2B/CreditLineBanner';
import { useLocation } from '@/context/LocationContext';

export default function HomePage() {
  const { currentHub, pincode, openLocationModal } = useLocation();
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      badge: 'Backed by BuilditIndia',
      title: "India’s Smartest Building Materials Platform",
      highlight: 'Building Materials',
      desc: 'Reshaping how India sources, supplies, and scales construction material needs — with tech-first operations, powerful private labels, and a next-gen retail footprint.',
      img: 'https://api.matelioverse.com/assets/abe9ee82-b583-4b77-add9-8ca1b4f92d5f',
      bgClass: 'hero-slide--credit',
      ctaText: 'Explore Catalog',
      ctaLink: '/categories',
    },
    {
      badge: 'India First · World Ready',
      title: 'Brick & Click Strategy for Infra Entrepreneurs',
      highlight: 'Infra Entrepreneurs',
      desc: 'Replacing outdated inventory-led retail with demand-led, data-backed operations across franchise smart stores and online fulfillment hubs.',
      img: 'https://api.matelioverse.com/assets/3b42937e-6a9d-4e89-a3f7-e260a72a51d3',
      bgClass: 'hero-slide--refer',
      ctaText: 'Join Franchise Network',
      ctaLink: '/partner',
    },
    {
      badge: 'Proprietary Private Labels',
      title: 'Stronger Margins. Stronger Brands.',
      highlight: 'Stronger Brands.',
      desc: 'Own-brands like TileTrendz, Tuffar, EzyWall, CemXtra, Bondex, and Sanivo give dealers 20-35% higher margins while buyers get verified quality.',
      img: 'https://api.matelioverse.com/assets/c57b078c-15c5-43f9-a882-e256024915ce',
      bgClass: 'hero-slide--materials',
      ctaText: 'Explore Private Labels',
      ctaLink: '/categories',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4800);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const instantProducts = PRODUCTS.filter((p) => p.slaType === 'instant');
  const heavyMaterials = PRODUCTS.filter((p) => p.slaType === 'scheduled');

  return (
    <div>
      {/* ==========================================================================
           HERO SLIDER
           ========================================================================== */}
      <section className="hero-wrapper">
        <div className="site-container">
          <div className="hero-slider-container" id="hero-slider">
            <div
              className="hero-track"
              style={{
                transform: `translateX(-${activeSlide * 100}%)`,
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {heroSlides.map((slide, idx) => (
                <div key={idx} className={`hero-slide ${slide.bgClass}`}>
                  <div className="hero-slide-content">
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary-orange)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>
                      {slide.badge}
                    </div>
                    <h1 className="hero-h1">
                      {slide.title.replace(slide.highlight, '')}
                      <span className="accent-mint" style={{ color: 'var(--primary-orange)' }}>{slide.highlight}</span>
                    </h1>
                    <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, marginBottom: 16, maxWidth: 520 }}>
                      {slide.desc}
                    </p>

                    <div className="credit-features-row">
                      <div className="credit-feat-item">
                        <div className="feat-circle-icon">✓</div>
                        <span>100% Verified<br />Products</span>
                      </div>
                      <div className="credit-feat-item">
                        <div className="feat-circle-icon">📈</div>
                        <span>Built for<br />Scale</span>
                      </div>
                      <div className="credit-feat-item">
                        <div className="feat-circle-icon">🌐</div>
                        <span>Smart Dealer<br />Network</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12 }}>
                      <Link href={slide.ctaLink} className="hero-white-pill-btn">
                        {slide.ctaText}
                      </Link>
                      <Link
                        href="/rfq"
                        style={{
                          color: '#FFFFFF',
                          border: '1.5px solid rgba(255,255,255,0.4)',
                          padding: '10px 22px',
                          borderRadius: 24,
                          textDecoration: 'none',
                          fontSize: 13,
                          fontWeight: 700,
                          transition: 'background 0.15s',
                        }}
                      >
                        ⚡ Instant BOQ Quote
                      </Link>
                    </div>
                  </div>

                  <div className="hero-credit-graphic">
                    <img src={slide.img} alt="Matelioverse Platform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capsule Indicator Dots */}
          <div className="hero-dots-wrap">
            <div className="hero-dots-capsule">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`hero-dot-btn ${idx === activeSlide ? 'active' : ''}`}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           FUNCTIONAL QUICK-COMMERCE LOCATION & PROMISE STRIP
           ========================================================================== */}
      <section style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '14px 0' }}>
        <div className="site-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ background: 'var(--secondary-mint)', border: '1px solid var(--secondary-mint-border)', borderRadius: 8, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 14 }}>📍</span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--secondary-green)' }}>
                  Delivery to: <strong>{currentHub.name}</strong> ({pincode})
                </span>
              </div>
              <button
                type="button"
                onClick={openLocationModal}
                style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary-orange)', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer' }}
              >
                Change Location
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#475569', fontWeight: 600 }}>
                <span>🛡️</span> 100% Direct-from-Plant
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#475569', fontWeight: 600 }}>
                <span>🚚</span> Free Delivery Above ₹2,500
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#475569', fontWeight: 600 }}>
                <span>💵</span> Pay on Delivery Available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           PROMOTIONAL OFFER BANNER SLIDER (Exact Brand Offers)
           ========================================================================== */}
      <PromoBannerSlider />

      {/* ==========================================================================
           FEATURED CATEGORIES (Interactive Grid)
           ========================================================================== */}
      <section className="categories-section" style={{ padding: '36px 0 24px 0' }}>
        <div className="site-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 18 }}>
            <div>
              <h2 className="section-title-h2" style={{ marginBottom: 4 }}>
                Shop by Building Material Category
              </h2>
              <p style={{ fontSize: 13.5, color: '#64748B' }}>
                Select a category to browse verified products with wholesale slab pricing
              </p>
            </div>
            <Link href="/categories" style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary-green)', textDecoration: 'none' }}>
              View All Categories ›
            </Link>
          </div>

          {/* Row 1: 8 Core Categories */}
          <div className="categories-grid-row-1">
            {CATEGORIES.slice(0, 8).map((cat) => (
              <Link key={cat.id} href={`/categories#${cat.slug}`} className="cat-card-item">
                <div className="cat-card-box">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                </div>
                <span className="cat-card-label">{cat.shortName || cat.name}</span>
              </Link>
            ))}
          </div>

          {/* Row 2: Specialized Categories */}
          <div className="categories-grid-row-2">
            {CATEGORIES.slice(8, 15).map((cat) => (
              <Link key={cat.id} href={`/categories#${cat.slug}`} className="cat-card-item">
                <div className="cat-card-box">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                </div>
                <span className="cat-card-label">{cat.shortName || cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
           QUICK-COMMERCE PRODUCT GRID 1: INSTANT DELIVERY (90 MINS)
           ========================================================================== */}
      <section style={{ padding: '32px 0', background: '#F8FAFC' }}>
        <div className="site-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--secondary-mint)', color: 'var(--secondary-green)', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>
                ⚡ {currentHub.instantSla} Instant Delivery
              </div>
              <h2 className="section-title-h2" style={{ fontSize: 24, margin: '2px 0 4px 0' }}>
                Instant Site Essentials ({currentHub.instantSla})
              </h2>
              <p style={{ fontSize: 13.5, color: '#64748B' }}>
                Adhesives, plumbing, fittings, and site fasteners delivered directly to your job site
              </p>
            </div>
            <Link href="/categories" style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary-green)', textDecoration: 'none' }}>
              View All Quick Items ›
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {instantProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
           QUICK-COMMERCE PRODUCT GRID 2: HEAVY MATERIALS (SAME-DAY / SCHEDULED)
           ========================================================================== */}
      <section style={{ padding: '40px 0' }}>
        <div className="site-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--primary-orange-light)', color: 'var(--primary-orange-active)', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>
                🚛 Plant Direct Dispatch
              </div>
              <h2 className="section-title-h2" style={{ fontSize: 24, margin: '2px 0 4px 0' }}>
                Structural &amp; Foundation Materials (Same-Day Freight)
              </h2>
              <p style={{ fontSize: 13.5, color: '#64748B' }}>
                Primary billet TMT rebars, OPC 53 cement, AAC panels, and factory vitrified tiles
              </p>
            </div>
            <Link href="/categories" style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary-green)', textDecoration: 'none' }}>
              View All Materials ›
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
           B2B REVOLVING CREDIT LINE BANNER
           ========================================================================== */}
      <section style={{ padding: '16px 0 40px 0' }}>
        <div className="site-container">
          <CreditLineBanner />
        </div>
      </section>

      {/* ==========================================================================
           WHY CHOOSE MATELIOVERSE (3 Value Pillars)
           ========================================================================== */}
      <section className="section-block" style={{ background: '#F8FAFC', padding: '48px 0' }}>
        <div className="site-container">
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 36px' }}>
            <span style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--primary-orange)', textTransform: 'uppercase', letterSpacing: 1 }}>
              Smart Retail Architecture
            </span>
            <h2 className="section-title-h2" style={{ fontSize: 28, marginTop: 4, marginBottom: 8 }}>
              Why Choose <span style={{ color: 'var(--primary-orange)' }}>Matelioverse?</span>
            </h2>
            <p style={{ color: '#64748B', fontSize: 14 }}>
              Replacing outdated inventory-led retail with demand-led, data-backed operations across India.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }} className="why-matelio-grid">
            <div style={{ background: 'linear-gradient(135deg, #0E3128, #133028)', borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 24px rgba(14,49,40,0.18)', color: '#FFFFFF', position: 'relative' }} className="card-hover-effect">
              <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                <img src="https://api.matelioverse.com/assets/86b3e000-054c-47b6-ba67-c8cb893ce26d" alt="Built on Tech" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 20%, #0E3128 100%)' }}></div>
              </div>
              <div style={{ padding: 26 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(194, 236, 202, 0.4)', color: '#C2ECCA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 16, fontWeight: 800 }}>⚡</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF', marginBottom: 10 }}>Built on Tech. Designed for Scale.</h3>
                <p style={{ fontSize: 13.5, color: '#C2ECCA', lineHeight: 1.6 }}>Combining digital procurement tools with deep supply chain intelligence to optimize spot pricing, availability, and offloading speed.</p>
              </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #0E3128, #133028)', borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 24px rgba(14,49,40,0.18)', color: '#FFFFFF', position: 'relative' }} className="card-hover-effect">
              <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                <img src="https://api.matelioverse.com/assets/091a903c-77a1-41d9-ae33-4dc9a7162913" alt="From Hardware to Smart Store" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 20%, #0E3128 100%)' }}></div>
              </div>
              <div style={{ padding: 26 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(194, 236, 202, 0.4)', color: '#C2ECCA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 16, fontWeight: 800 }}>🏪</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF', marginBottom: 10 }}>From Hardware Store to Smart Store.</h3>
                <p style={{ fontSize: 13.5, color: '#C2ECCA', lineHeight: 1.6 }}>Replacing dead-stock retail with hyper-efficient franchise stores and regional fulfillment depots across Ahmedabad, Surat, Vadodara, and Rajkot.</p>
              </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #0E3128, #133028)', borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 24px rgba(14,49,40,0.18)', color: '#FFFFFF', position: 'relative' }} className="card-hover-effect">
              <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                <img src="https://api.matelioverse.com/assets/c57b078c-15c5-43f9-a882-e256024915ce" alt="Stronger Margins Stronger Brands" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 20%, #0E3128 100%)' }}></div>
              </div>
              <div style={{ padding: 26 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(194, 236, 202, 0.4)', color: '#C2ECCA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 16, fontWeight: 800 }}>💎</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF', marginBottom: 10 }}>Stronger Margins. Stronger Brands.</h3>
                <p style={{ fontSize: 13.5, color: '#C2ECCA', lineHeight: 1.6 }}>Own-brands like TileTrendz, Tuffar, EzyWall, Bondex, and Sanivo boost dealer profitability with 20-35% margins and certified quality test sheets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           OUR TECH EDGE
           ========================================================================== */}
      <section className="section-block" id="tech-edge" style={{ background: '#F0FDF4', padding: '48px 0' }}>
        <div className="site-container">
          <div style={{ maxWidth: 640, marginBottom: 28 }}>
            <span style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--primary-green)', textTransform: 'uppercase', letterSpacing: 1 }}>
              Proprietary Digital Architecture
            </span>
            <h2 className="section-title-h2" style={{ fontSize: 28, marginTop: 4, marginBottom: 8 }}>
              Our Tech Edge
            </h2>
            <p style={{ fontSize: 14, color: '#475569' }}>
              Matelioverse isn’t just a marketplace. It’s an intelligent retail-tech engine designed to power construction commerce.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 20 }} className="tech-edge-split-grid">
            <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', height: 360 }}>
              <img src="https://api.matelioverse.com/assets/6fc2fbf4-169e-401e-a993-6b5c27a2d02d" alt="Geo-tagged Inventory Tracking" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(14,49,40,0.92) 100%)' }}></div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, color: '#FFFFFF' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--primary-orange)', textTransform: 'uppercase', marginBottom: 6 }}>Live Telematics</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Geo-tagged Inventory Tracking</h3>
                <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.4 }}>Real-time stock visibility across centralized warehouses, transit hubs, and dealer outlets.</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', height: 172 }}>
                <img src="https://api.matelioverse.com/assets/3b748db5-005d-490e-bb32-d25d199df6e3" alt="Order Management System" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 20%, rgba(14,49,40,0.92) 100%)' }}></div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14, color: '#FFFFFF' }}>
                  <h4 style={{ fontSize: 14, fontWeight: 800 }}>Order Management (OMS)</h4>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>Automated dispatch &amp; fulfillment</p>
                </div>
              </div>

              <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', height: 172 }}>
                <img src="https://api.matelioverse.com/assets/ed6cd82e-6bfd-47d9-a7a3-fbe5358134ed" alt="AI Demand Prediction" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 20%, rgba(14,49,40,0.92) 100%)' }}></div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14, color: '#FFFFFF' }}>
                  <h4 style={{ fontSize: 14, fontWeight: 800 }}>AI Demand Prediction</h4>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>Predictive regional demand spikes</p>
                </div>
              </div>

              <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', height: 172 }}>
                <img src="https://api.matelioverse.com/assets/86fe988f-3eed-4031-a276-825e407db7f3" alt="Dynamic Pricing Tools" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 20%, rgba(14,49,40,0.92) 100%)' }}></div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14, color: '#FFFFFF' }}>
                  <h4 style={{ fontSize: 14, fontWeight: 800 }}>Dynamic Pricing Tools</h4>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>Margin-optimized spot rate quotes</p>
                </div>
              </div>

              <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', height: 172 }}>
                <img src="https://api.matelioverse.com/assets/785bde08-c573-4d8f-abb3-5714bff8cd30" alt="CRM & Dealer Dashboard" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 20%, rgba(14,49,40,0.92) 100%)' }}></div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14, color: '#FFFFFF' }}>
                  <h4 style={{ fontSize: 14, fontWeight: 800 }}>CRM &amp; Dealer Dashboard</h4>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>End-to-end franchise ledger tools</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           WHO WE SERVE
           ========================================================================== */}
      <section className="section-block" style={{ padding: '48px 0' }}>
        <div className="site-container">
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 32px' }}>
            <span style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--primary-green)', textTransform: 'uppercase', letterSpacing: 1 }}>
              Our Ecosystem
            </span>
            <h2 className="section-title-h2" style={{ fontSize: 28, marginTop: 4, marginBottom: 6 }}>
              Who We Serve
            </h2>
            <p style={{ fontSize: 14, color: '#64748B' }}>Connecting key stakeholders across the Indian construction value chain</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }} className="who-serve-grid">
            <div style={{ background: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: 18, padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#ECFDF5', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 16px' }}>🏗️</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>Infra Contractors</h3>
              <p style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.5 }}>Direct bulk plant sourcing, computerized mill test certificates, and scheduled offloading.</p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: 18, padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 16px' }}>🏪</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>Retail Dealers</h3>
              <p style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.5 }}>Exclusive territory franchise rights, 20-35% private label margins, and zero dead stock risk.</p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: 18, padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 16px' }}>🏢</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>Real Estate Developers</h3>
              <p style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.5 }}>Standardized project BOQ fulfillment, consistent grade quality, and transparent GST billing.</p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: 18, padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#F3E8FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 16px' }}>📐</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>Architects &amp; Planners</h3>
              <p style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.5 }}>Technical datasheets, physical material samples, and modern facade &amp; surface solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           NEWS & MEDIA
           ========================================================================== */}
      <section className="section-block" id="news-media" style={{ background: '#F8FAFC', padding: '48px 0' }}>
        <div className="site-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
            <div>
              <span style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--primary-green)', textTransform: 'uppercase', letterSpacing: 1 }}>Press Coverage</span>
              <h2 className="section-title-h2" style={{ fontSize: 28, marginTop: 4, marginBottom: 4 }}>News &amp; Media</h2>
              <p style={{ fontSize: 13.5, color: '#64748B' }}>Industry coverage and milestones of Matelioverse &amp; BuilditIndia</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }} className="news-media-grid">
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ position: 'relative', height: 110, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12 }}>
                <span style={{ position: 'absolute', top: 8, left: 8, background: 'var(--primary-green)', color: '#fff', fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 6 }}>14 Aug</span>
                <img src="https://api.matelioverse.com/assets/5a4e1820-e265-4988-96a8-6a2b995b7aee" alt="The India Awaaz" style={{ maxHeight: 40, maxWidth: '80%', objectFit: 'contain' }} />
              </div>
              <div style={{ padding: 16 }}>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>The India Awaaz</h4>
                <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5 }}>BuilditIndia launches subsidiary Matelio to redefine how India buys building materials.</p>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ position: 'relative', height: 110, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12 }}>
                <span style={{ position: 'absolute', top: 8, left: 8, background: 'var(--primary-green)', color: '#fff', fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 6 }}>13 Aug</span>
                <img src="https://api.matelioverse.com/assets/09e94aff-e8f9-457f-a174-e061b9c84558" alt="APN News" style={{ maxHeight: 40, maxWidth: '80%', objectFit: 'contain' }} />
              </div>
              <div style={{ padding: 16 }}>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>APN News</h4>
                <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5 }}>Next-gen retail-tech venture designed to digitize India&apos;s fragmented building-materials market.</p>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ position: 'relative', height: 110, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12 }}>
                <span style={{ position: 'absolute', top: 8, left: 8, background: 'var(--primary-green)', color: '#fff', fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 6 }}>13 Aug</span>
                <img src="https://api.matelioverse.com/assets/2a9b0488-a53c-49eb-9610-da155dcba1b6" alt="Media Infoline" style={{ maxHeight: 40, maxWidth: '80%', objectFit: 'contain' }} />
              </div>
              <div style={{ padding: 16 }}>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>Media Infoline</h4>
                <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5 }}>Aimed at organizing ₹225 billion building-materials sector through an omni-channel approach.</p>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ position: 'relative', height: 110, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12 }}>
                <span style={{ position: 'absolute', top: 8, left: 8, background: 'var(--primary-green)', color: '#fff', fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 6 }}>12 Aug</span>
                <img src="https://api.matelioverse.com/assets/67a470eb-3d55-459b-a8c2-743a25c4f3b9" alt="Silicon India" style={{ maxHeight: 40, maxWidth: '80%', objectFit: 'contain' }} />
              </div>
              <div style={{ padding: 16 }}>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>Silicon India</h4>
                <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5 }}>Appoints industry veteran Sandeep Kakkar as Director to lead the omni-channel venture.</p>
              </div>
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
