import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Matelioverse — India’s Smartest Building Materials Platform',
  description: 'Learn about Matelioverse, our mission to modernize India’s ₹100,000 Cr construction retail market, our proprietary private labels, and backing by BuilditIndia.',
};

export default function AboutPage() {
  return (
    <div style={{ background: '#FFFFFF', minHeight: '85vh', paddingBottom: 60 }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0E3128 0%, #133028 100%)', color: '#FFFFFF', padding: '52px 0' }}>
        <div className="site-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#94A3B8', marginBottom: 12 }}>
            <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <span style={{ color: 'var(--primary-orange)', fontWeight: 700 }}>About Us</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, marginBottom: 12, lineHeight: 1.25 }}>
            Redefining Retail for the <span style={{ color: 'var(--primary-orange)' }}>Infra Economy</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', maxWidth: 720, lineHeight: 1.6 }}>
            Matelioverse is India’s first tech-enabled building materials quick-commerce ecosystem. We combine private labels, lean-capital smart stores, and regional digital fulfillment hubs to replace outdated construction retail.
          </p>
        </div>
      </section>

      {/* Vision & Origin */}
      <div className="site-container" style={{ marginTop: 48 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'center', marginBottom: 60 }} className="about-split-grid">
          <div>
            <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--primary-orange)', textTransform: 'uppercase', letterSpacing: 1 }}>
              Backed by BuilditIndia
            </span>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#0F172A', marginTop: 6, marginBottom: 16 }}>
              From Fragmented Wholesale to Transparent Click-and-Mortar Commerce
            </h2>
            <p style={{ fontSize: 14.5, color: '#475569', lineHeight: 1.65, marginBottom: 16 }}>
              India’s construction retail economy exceeds ₹100,000 Crore, yet remains burdened by middleman markups, inconsistent material grades, opaque dispatch timelines, and severe credit chokeholds for contractors.
            </p>
            <p style={{ fontSize: 14.5, color: '#475569', lineHeight: 1.65, marginBottom: 20 }}>
              Matelioverse solves this with full vertical integration. We manufacture and verify our own proprietary private labels — CemXtra, Tuffar TMT, EzyWall AAC, and TileTrendz — delivering direct plant quality with 90-min to same-day speed.
            </p>

            <div style={{ display: 'flex', gap: 24 }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--primary-orange)' }}>₹25L</div>
                <div style={{ fontSize: 12.5, color: '#64748B', fontWeight: 600 }}>Collateral-Free Credit Line</div>
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#0F172A' }}>90 Mins</div>
                <div style={{ fontSize: 12.5, color: '#64748B', fontWeight: 600 }}>Emergency Fast SLA</div>
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#2563EB' }}>100%</div>
                <div style={{ fontSize: 12.5, color: '#64748B', fontWeight: 600 }}>QR Batch Verified</div>
              </div>
            </div>
          </div>

          <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 12px 36px rgba(0,0,0,0.08)' }}>
            <img
              src="https://api.matelioverse.com/assets/86b3e000-054c-47b6-ba67-c8cb893ce26d"
              alt="Matelioverse Supply Chain Intelligence"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Leadership & Direction */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 24, padding: 40, marginBottom: 48 }}>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 32px auto' }}>
            <h3 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', marginBottom: 6 }}>
              Enterprise Leadership &amp; Board
            </h3>
            <p style={{ fontSize: 14, color: '#64748B' }}>
              Led by infrastructure veterans and digital supply chain pioneers
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="why-matelio-grid">
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: 24, textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--secondary-mint)', color: 'var(--secondary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 14px auto' }}>
                👨‍💼
              </div>
              <h4 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>Sandeep Kakkar</h4>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary-orange)', textTransform: 'uppercase', marginBottom: 8 }}>Director &amp; Retail Head</div>
              <p style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.5 }}>
                Industry veteran spearheading retail network expansion and omni-channel franchise rollouts across Gujarat&apos;s high-growth industrial and infrastructure corridors.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: 24, textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 14px auto' }}>
                🏗️
              </div>
              <h4 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>BuilditIndia Syndicate</h4>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', marginBottom: 8 }}>Parent Institutional Network</div>
              <p style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.5 }}>
                Providing tier-1 manufacturer tie-ups, pan-India logistics depots, and institutional escrow settlement pipelines.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: 24, textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 14px auto' }}>
                💻
              </div>
              <h4 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>Digital Ops Engineering</h4>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#D97706', textTransform: 'uppercase', marginBottom: 8 }}>Platform &amp; Telematics</div>
              <p style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.5 }}>
                Developing automated dispatch routing, demand prediction algorithms, and instant GST invoice compliance tools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
