'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

interface PromoBannerItem {
  id: string;
  category: string;
  categorySlug: string;
  brand: string;
  brandLogoText: string;
  headline: string[];
  discountText: string;
  discountHighlight: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
  cardTheme: 'hindware' | 'asianpaints' | 'polycab' | 'ultratech' | 'drfixit';
  productImage: string;
  imageAlt: string;
}

const PROMO_BANNERS: PromoBannerItem[] = [
  {
    id: 'promo-hindware',
    category: 'Bath Fittings & Sanitary Ware',
    categorySlug: 'bath-fittings-sanitary',
    brand: 'Hindware Italian Collection',
    brandLogoText: 'hindware',
    headline: ['Bathroom', 'solutions that last'],
    discountText: 'Up to',
    discountHighlight: '29% OFF',
    ctaText: 'Order now',
    ctaLink: '/categories#bath-fittings-sanitary',
    bgGradient: 'linear-gradient(135deg, #3A352F 0%, #2A2520 60%, #1F1C18 100%)',
    cardTheme: 'hindware',
    productImage: 'https://cdn.madoverbuildings.com/category/category/Bathroom.webp',
    imageAlt: 'Hindware Wall Mounted Toilet Suite',
  },
  {
    id: 'promo-asianpaints',
    category: 'Paints & Wall Coatings',
    categorySlug: 'paints',
    brand: 'Birla Opus / Asian Paints',
    brandLogoText: 'asianpaints',
    headline: ['Transform every', 'wall with elegance'],
    discountText: 'Up to',
    discountHighlight: '37% OFF',
    ctaText: 'Order now',
    ctaLink: '/categories#paints',
    bgGradient: 'linear-gradient(135deg, #9C3A62 0%, #872E54 50%, #681E3E 100%)',
    cardTheme: 'asianpaints',
    productImage: 'https://cdn.madoverbuildings.com/category/category/Paints_Putty_and_Coatings.webp',
    imageAlt: 'Interior Luxury Emulsion Paint',
  },
  {
    id: 'promo-polycab',
    category: 'Plumbing & Electrical Wiring',
    categorySlug: 'plumbing',
    brand: 'Polycab / Astral',
    brandLogoText: 'POLYCAB',
    headline: ['Trusted wires', 'for every project'],
    discountText: 'Up to',
    discountHighlight: '53% OFF',
    ctaText: 'Order now',
    ctaLink: '/categories#plumbing',
    bgGradient: 'linear-gradient(135deg, #3B67B5 0%, #2B4E94 50%, #1F366E 100%)',
    cardTheme: 'polycab',
    productImage: 'https://cdn.madoverbuildings.com/category/category/Hardware_and_Fittings.webp',
    imageAlt: 'Polycab Project Grade Copper Wire Coil',
  },
  {
    id: 'promo-ultratech',
    category: 'Cement & Concrete',
    categorySlug: 'cement',
    brand: 'UltraTech Cement',
    brandLogoText: 'UltraTech',
    headline: ['Direct plant', 'heavy RCC cement'],
    discountText: 'Up to',
    discountHighlight: '18% OFF',
    ctaText: 'Order now',
    ctaLink: '/categories#cement',
    bgGradient: 'linear-gradient(135deg, #2B333B 0%, #1D232A 60%, #13171C 100%)',
    cardTheme: 'ultratech',
    productImage: 'https://cdn.madoverbuildings.com/category/category/Building_Materials.webp',
    imageAlt: 'UltraTech Super PPC Cement Bag',
  },
  {
    id: 'promo-drfixit',
    category: 'Adhesive & Waterproofing',
    categorySlug: 'adhesive-waterproofing',
    brand: 'Dr. Fixit / Roff',
    brandLogoText: 'Dr. Fixit',
    headline: ['Zero leakage,', 'total peace of mind'],
    discountText: 'Up to',
    discountHighlight: '24% OFF',
    ctaText: 'Order now',
    ctaLink: '/categories#adhesive-waterproofing',
    bgGradient: 'linear-gradient(135deg, #0E4E42 0%, #0A3A31 60%, #05241E 100%)',
    cardTheme: 'drfixit',
    productImage: 'https://cdn.madoverbuildings.com/category/category/Paints_Putty_and_Coatings.webp',
    imageAlt: 'Dr. Fixit 101 LW+ Integral Waterproofing',
  },
];

export default function PromoBannerSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const track = trackRef.current;
    if (track) {
      track.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (track) track.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const scrollAmount = trackRef.current.clientWidth * 0.75;
    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="promo-banner-slider-wrapper" style={{ padding: '24px 0 16px 0', position: 'relative' }}>
      <div className="site-container" style={{ position: 'relative' }}>
        
        {/* Navigation Arrow Left */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScroll('left')}
            aria-label="Previous promotional offers"
            className="promo-slider-nav-btn prev"
            style={{
              position: 'absolute',
              left: 4,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#1E293B',
              fontSize: 20,
              fontWeight: 700,
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            ‹
          </button>
        )}

        {/* Navigation Arrow Right */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScroll('right')}
            aria-label="Next promotional offers"
            className="promo-slider-nav-btn next"
            style={{
              position: 'absolute',
              right: 4,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#1E293B',
              fontSize: 20,
              fontWeight: 700,
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            ›
          </button>
        )}

        {/* Carousel Scroll Track */}
        <div
          ref={trackRef}
          className="promo-cards-track hide-scrollbar"
          style={{
            display: 'flex',
            gap: 20,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: 8,
            paddingTop: 4,
            paddingLeft: 4,
            paddingRight: 4,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {PROMO_BANNERS.map((banner) => (
            <div
              key={banner.id}
              className="promo-card"
              style={{
                flex: '0 0 calc(33.333% - 14px)',
                minWidth: 290,
                maxWidth: 420,
                height: 245,
                borderRadius: 22,
                overflow: 'hidden',
                position: 'relative',
                background: banner.bgGradient,
                scrollSnapAlign: 'start',
                boxShadow: '0 6px 20px rgba(0,0,0,0.09)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '22px 20px 20px 22px',
                color: '#FFFFFF',
                boxSizing: 'border-box',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
            >
              {/* Card Top Row: Headlines and Brand Logo */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 3 }}>
                <div>
                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      lineHeight: 1.15,
                      margin: 0,
                      color: '#FFFFFF',
                      letterSpacing: '-0.4px',
                      textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                    }}
                  >
                    {banner.headline.map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx < banner.headline.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </h3>

                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 14,
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontWeight: 500,
                    }}
                  >
                    {banner.discountText}{' '}
                    <strong style={{ fontWeight: 800, color: '#FFFFFF', fontSize: 15 }}>
                      {banner.discountHighlight}
                    </strong>
                  </div>
                </div>

                {/* Brand Logo / Badge */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  {banner.cardTheme === 'hindware' && (
                    <span
                      style={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        fontWeight: 700,
                        fontSize: 18,
                        letterSpacing: '-0.5px',
                        color: '#FFFFFF',
                        opacity: 0.95,
                      }}
                    >
                      hindware
                    </span>
                  )}
                  {banner.cardTheme === 'asianpaints' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span
                        style={{
                          fontWeight: 900,
                          fontSize: 20,
                          color: '#FFFFFF',
                          lineHeight: 1,
                        }}
                      >
                        ap
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: 'rgba(255,255,255,0.85)',
                          textTransform: 'lowercase',
                          letterSpacing: '-0.2px',
                        }}
                      >
                        asianpaints
                      </span>
                    </div>
                  )}
                  {banner.cardTheme === 'polycab' && (
                    <span
                      style={{
                        fontWeight: 900,
                        fontSize: 15,
                        letterSpacing: '1px',
                        color: '#FFFFFF',
                      }}
                    >
                      POLYCAB
                    </span>
                  )}
                  {banner.cardTheme === 'ultratech' && (
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: 14,
                        letterSpacing: '0.5px',
                        color: '#FBBF24',
                        background: 'rgba(0,0,0,0.3)',
                        padding: '3px 8px',
                        borderRadius: 6,
                      }}
                    >
                      UltraTech
                    </span>
                  )}
                  {banner.cardTheme === 'drfixit' && (
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: 14,
                        color: '#F97938',
                        background: '#FFFFFF',
                        padding: '3px 8px',
                        borderRadius: 6,
                      }}
                    >
                      Dr. Fixit
                    </span>
                  )}
                </div>
              </div>

              {/* Product Visual Mockup / Floating Image Layer */}
              <div
                style={{
                  position: 'absolute',
                  right: 10,
                  bottom: 10,
                  width: '45%',
                  height: '75%',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              >
                {banner.cardTheme === 'hindware' && (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {/* Stylized Modern Wall-Mounted Commode Graphic */}
                    <svg viewBox="0 0 140 120" style={{ width: '92%', height: 'auto', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.4))' }}>
                      {/* Chrome flush pipe */}
                      <path d="M 68 0 L 68 35" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="68" cy="35" r="3" fill="#E2E8F0" />
                      {/* Commode body */}
                      <path
                        d="M 25 35 Q 25 30 35 30 L 105 30 Q 115 30 115 35 L 110 75 Q 105 110 70 110 Q 35 110 30 75 Z"
                        fill="#FFFFFF"
                      />
                      {/* Soft-close seat lid */}
                      <path
                        d="M 23 35 C 23 31 35 30 70 30 C 105 30 117 31 117 35 C 117 39 105 40 70 40 C 35 40 23 39 23 35 Z"
                        fill="#F8FAFC"
                        stroke="#E2E8F0"
                        strokeWidth="1.5"
                      />
                      {/* Rimless bowl interior shading */}
                      <path
                        d="M 36 43 Q 70 43 104 43 Q 98 75 70 75 Q 42 75 36 43 Z"
                        fill="#E2E8F0"
                        opacity="0.4"
                      />
                    </svg>
                  </div>
                )}

                {banner.cardTheme === 'asianpaints' && (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {/* Stylized Paint Bucket and Cozy Chair silhouette */}
                    <svg viewBox="0 0 150 120" style={{ width: '96%', height: 'auto', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.4))' }}>
                      {/* Cozy Velvet Armchair */}
                      <path
                        d="M 10 70 Q 10 50 25 45 Q 35 45 42 55 Q 42 75 38 90 L 10 90 Z"
                        fill="#5B1E3E"
                        opacity="0.6"
                      />
                      <path
                        d="M 15 90 L 10 108 M 38 90 L 42 108"
                        stroke="#2B0E1E"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      {/* Paint Bucket Drum */}
                      <path
                        d="M 70 35 L 130 35 L 124 105 Q 123 110 100 110 Q 77 110 76 105 Z"
                        fill="#F8FAFC"
                      />
                      {/* Bucket Lid */}
                      <ellipse cx="100" cy="35" rx="30" ry="6" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
                      <ellipse cx="100" cy="32" rx="28" ry="4" fill="#FFFFFF" />
                      {/* Bucket Label Banner */}
                      <rect x="73" y="55" width="54" height="35" rx="3" fill="#E11D48" opacity="0.9" />
                      <path d="M 80 65 Q 100 60 120 70" stroke="#FBBF24" strokeWidth="2" fill="none" />
                      <circle cx="100" cy="74" r="5" fill="#FFFFFF" />
                    </svg>
                  </div>
                )}

                {banner.cardTheme === 'polycab' && (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {/* Stylized Cable Wire Box & Green Coils */}
                    <svg viewBox="0 0 150 120" style={{ width: '96%', height: 'auto', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.4))' }}>
                      {/* Cable Coils */}
                      <ellipse cx="115" cy="75" rx="26" ry="32" fill="none" stroke="#22C55E" strokeWidth="7" />
                      <ellipse cx="115" cy="75" rx="18" ry="24" fill="none" stroke="#16A34A" strokeWidth="5" />
                      {/* Polycab Box */}
                      <polygon points="50,45 95,40 105,85 60,95" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
                      <polygon points="50,45 65,30 110,25 95,40" fill="#E2E8F0" />
                      <polygon points="95,40 110,25 120,70 105,85" fill="#CBD5E1" />
                      {/* Red Brand Stripe on Box */}
                      <polygon points="54,65 99,60 101,74 56,79" fill="#DC2626" />
                    </svg>
                  </div>
                )}

                {banner.cardTheme === 'ultratech' && (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {/* Stylized Cement Bag */}
                    <svg viewBox="0 0 140 120" style={{ width: '90%', height: 'auto', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.4))' }}>
                      <path
                        d="M 50 25 Q 85 22 120 25 Q 125 65 122 105 Q 85 110 48 105 Q 45 65 50 25 Z"
                        fill="#F1F5F9"
                        stroke="#CBD5E1"
                        strokeWidth="1.5"
                      />
                      {/* Yellow UltraTech Band */}
                      <rect x="50" y="48" width="72" height="28" fill="#FBBF24" />
                      <rect x="50" y="58" width="72" height="3" fill="#1E293B" />
                    </svg>
                  </div>
                )}

                {banner.cardTheme === 'drfixit' && (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {/* Stylized Waterproofing Canister */}
                    <svg viewBox="0 0 140 120" style={{ width: '90%', height: 'auto', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.4))' }}>
                      <path
                        d="M 55 30 L 115 30 Q 120 30 120 35 L 120 105 Q 120 110 115 110 L 55 110 Q 50 110 50 105 L 50 35 Q 50 30 55 30 Z"
                        fill="#F97938"
                      />
                      {/* Handle */}
                      <path d="M 68 30 L 68 18 Q 85 15 102 18 L 102 30" fill="none" stroke="#FFFFFF" strokeWidth="4" />
                      {/* Yellow Label */}
                      <rect x="55" y="50" width="60" height="36" rx="4" fill="#FEF08A" />
                      <circle cx="85" cy="68" r="8" fill="#0E4E42" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Card Bottom Row: "Order now" White Pill Button */}
              <div style={{ position: 'relative', zIndex: 3, marginTop: 'auto' }}>
                <Link
                  href={banner.ctaLink}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    color: '#0E3128',
                    padding: '10px 22px',
                    borderRadius: 24,
                    fontSize: 13.5,
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  }}
                  className="promo-order-now-btn"
                >
                  {banner.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .promo-slider-nav-btn:hover {
          background-color: #f8fafc !important;
          transform: translateY(-50%) scale(1.08) !important;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.22) !important;
        }
        .promo-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16) !important;
        }
        .promo-order-now-btn:hover {
          transform: scale(1.04);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2) !important;
        }
        @media (max-width: 768px) {
          .promo-card {
            flex: 0 0 84% !important;
            min-width: 260px !important;
          }
          .promo-slider-nav-btn {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
