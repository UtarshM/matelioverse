'use client';

import React from 'react';
import Link from 'next/link';
import { HUBS } from '@/data/hubs';

export default function Footer() {
  return (
    <footer className="site-dark-footer">
      <div className="site-container">
        <div className="footer-top-grid">
          {/* Col 1: Logo & Mission */}
          <div className="footer-brand-col">
            <div className="footer-logo-wrap">
              <Link href="/">
                <img
                  src="https://api.matelioverse.com/assets/e0847d46-2489-475e-8dfc-e7b520e1df15"
                  alt="Matelioverse"
                  className="footer-logo-img"
                  width={180}
                  height={34}
                />
              </Link>
            </div>
            <div className="footer-materials-h4">India&apos;s Smartest Building Materials Platform</div>
            <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.5, marginBottom: 14, maxWidth: 320 }}>
              Reshaping how India sources, supplies, and scales construction materials — with verified private labels, tech-first logistics, and a next-gen retail footprint.
            </p>
            <div style={{ fontSize: 12.5, color: '#64748B' }}>Powered By</div>
            <div style={{ color: '#34D399', fontWeight: 800, fontSize: 15, marginTop: 2 }}>
              BuilditIndia.com &amp; Buildverse Group
            </div>
          </div>

          {/* Col 2: Quick Commerce & Sourcing */}
          <div>
            <h4 className="footer-col-h4">SOURCING &amp; SERVICES</h4>
            <ul className="footer-links-list">
              <li><Link href="/categories">All Building Materials</Link></li>
              <li><Link href="/rfq">Bulk BOQ Quotation (RFQ)</Link></li>
              <li><Link href="/partner">Partner &amp; Franchise Network</Link></li>
              <li><Link href="/partner">matelio STAR Loyalty</Link></li>
              <li><Link href="/about">About Matelioverse</Link></li>
              <li><Link href="/contact">Contact &amp; Hub Addresses</Link></li>
            </ul>
          </div>

          {/* Col 3: Proprietary Brands */}
          <div>
            <h4 className="footer-col-h4">PROPRIETARY PRIVATE LABELS</h4>
            <ul className="footer-links-list">
              <li><Link href="/categories#cement-ggbs">CemXtra (OPC 53 &amp; PPC Cement)</Link></li>
              <li><Link href="/categories#tmt-steel">Tuffar® (Fe550D TMT Rebars)</Link></li>
              <li><Link href="/categories#aac-panels">EzyWall (AAC Wall Panels)</Link></li>
              <li><Link href="/categories#tiles-surfaces">TileTrendz (GVT &amp; Floor Tiles)</Link></li>
              <li><Link href="/categories#plumbing-pipes">HydroLine (Piping &amp; Fittings)</Link></li>
              <li><Link href="/categories#sanitaryware">Sanivo (Sanitaryware &amp; CP)</Link></li>
              <li><Link href="/categories#adhesives-chemicals">Bondex (Tile Adhesives)</Link></li>
              <li><Link href="/categories#structural-steel">Strongfab (Structural Beams)</Link></li>
            </ul>
          </div>

          {/* Col 4: Hub Contacts */}
          <div>
            <h4 className="footer-col-h4">FULFILLMENT HUBS</h4>
            <div className="footer-contact-block">
              <div className="city-contact-group">
                <div className="city-label-bold">Head Office (Ahmedabad Hub)</div>
                <p style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.4, marginBottom: 6 }}>
                  405 Claywalls, OPP. Shanti Palace, Hebatpur Road, Thaltej, Ahmedabad, Gujarat 380054
                </p>
                <a href="tel:+919824939888" className="contact-link-row">
                  <span>📞</span> <span>+91 98249 39888</span>
                </a>
              </div>

              <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#CBD5E1', marginBottom: 4 }}>Gujarat Fulfillment Network:</div>
                <div style={{ fontSize: 11.5, color: '#94A3B8', lineHeight: 1.5 }}>
                  Ahmedabad · Gandhinagar (GIFT City) · Surat · Vadodara · Rajkot · Morbi · Bhavnagar · Jamnagar
                </div>
              </div>

              <a href="mailto:hello@matelioverse.com" className="contact-link-row" style={{ marginTop: 10 }}>
                <span>✉️</span> <span>hello@matelioverse.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Category Pills in Footer */}
        <div className="footer-categories-block">
          <h4 className="footer-col-h4" style={{ marginBottom: 0 }}>Active Categories</h4>
          <div className="footer-cat-pills-flex">
            <Link href="/categories#cement-ggbs" className="footer-cat-pill">CemXtra Cement</Link>
            <Link href="/categories#aac-panels" className="footer-cat-pill">EzyWall AAC Panels</Link>
            <Link href="/categories#tmt-steel" className="footer-cat-pill">Tuffar TMT Steel</Link>
            <Link href="/categories#tiles-surfaces" className="footer-cat-pill">TileTrendz Tiles</Link>
            <Link href="/categories#plumbing-pipes" className="footer-cat-pill">HydroLine Plumbing</Link>
            <Link href="/categories#sanitaryware" className="footer-cat-pill">Sanivo Sanitaryware</Link>
            <Link href="/categories#adhesives-chemicals" className="footer-cat-pill">Bondex Adhesives</Link>
            <Link href="/categories#structural-steel" className="footer-cat-pill">Strongfab Steel</Link>
            <Link href="/categories#architectural-glass" className="footer-cat-pill">ReflectoGlass</Link>
          </div>
        </div>

        {/* Bottom Copyright & Legal Row */}
        <div className="footer-bottom-bar">
          <p className="footer-copy-text">
            © {new Date().getFullYear()} All Rights Reserved by <span style={{ color: '#00A86B', fontWeight: 700 }}>Matelioverse</span> · Backed by BuilditIndia &amp; Buildverse Group
          </p>
          <div className="footer-legal-links">
            <Link href="/contact">Terms of Trade</Link>
            <span>·</span>
            <Link href="/contact">Privacy Policy</Link>
            <span>·</span>
            <Link href="/contact">Shipping &amp; Delivery SLA</Link>
            <span>·</span>
            <Link href="/contact">Returns &amp; Replacement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
