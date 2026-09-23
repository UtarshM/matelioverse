'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocation } from '@/context/LocationContext';

export default function RFQPage() {
  const { currentHub } = useLocation();

  // Wizard Step State
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isAiCalculating, setIsAiCalculating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteId, setQuoteId] = useState('');
  const [creditApplied, setCreditApplied] = useState(false);

  // Form State
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [projectType, setProjectType] = useState<string>('G+4 Residential Building');
  const [targetPourDate, setTargetPourDate] = useState<string>('Within 7 Days');
  const [craneAccess, setCraneAccess] = useState<boolean>(true);
  const [deliveryCity, setDeliveryCity] = useState<string>(currentHub.name);
  const [pincode, setPincode] = useState<string>(currentHub.pincode);
  const [companyName, setCompanyName] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [gstin, setGstin] = useState<string>('');

  // Sample BOQ items
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'TMT Steel (Fe550D)',
    'OPC 53 Cement',
    'AAC Wall Panels',
  ]);

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleCalculateAiQuote = () => {
    setIsAiCalculating(true);
    setTimeout(() => {
      setIsAiCalculating(false);
      setCurrentStep(4);
    }, 1200);
  };

  const handleFinalSubmit = () => {
    const id = `BOQ-${Math.floor(10000 + Math.random() * 90000)}`;
    setQuoteId(id);
    setIsSubmitted(true);
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '90vh', paddingBottom: 80 }}>
      {/* Top Banner */}
      <section style={{ background: 'linear-gradient(135deg, #0E3128 0%, #133028 100%)', color: '#FFFFFF', padding: '44px 0' }}>
        <div className="site-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#94A3B8', marginBottom: 12 }}>
            <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <span style={{ color: 'var(--primary-orange)', fontWeight: 700 }}>Instant BOQ &amp; Magic AI Quote</span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(249, 121, 56, 0.25)', color: 'var(--primary-orange)', padding: '4px 12px', borderRadius: 20, fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', marginBottom: 12 }}>
            <span>⚡</span> Magic AI Quote in 60 Seconds · Direct Plant Commercial Rates
          </div>

          <h1 style={{ fontSize: 34, fontWeight: 900, marginBottom: 8, lineHeight: 1.25 }}>
            Instant BOQ Pricing Engine &amp; Plant-Direct Freight
          </h1>
          <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.85)', maxWidth: 740, lineHeight: 1.55 }}>
            Upload your Bill of Quantities or blueprint. Our regional AI demand engine calculates spot mill rates, optimizes margins with certified private labels, and schedules consignment offloading with up to ₹25L revolving credit.
          </p>
        </div>
      </section>

      {/* Stepper Progress Bar */}
      <div className="site-container" style={{ marginTop: 28, marginBottom: 28 }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '16px 24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          {[
            { step: 1, label: '1. Upload BOQ' },
            { step: 2, label: '2. Project Scope' },
            { step: 3, label: '3. Site Logistics' },
            { step: 4, label: '4. AI Quote & Credit' },
          ].map((item) => {
            const isActive = currentStep === item.step;
            const isDone = currentStep > item.step;
            return (
              <div
                key={item.step}
                onClick={() => {
                  if (isDone || item.step < currentStep) setCurrentStep(item.step);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: isDone ? 'pointer' : 'default',
                  opacity: isActive || isDone ? 1 : 0.45,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: isDone ? '#10B981' : isActive ? 'var(--primary-orange)' : '#E2E8F0',
                    color: isDone || isActive ? '#FFFFFF' : '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  {isDone ? '✓' : item.step}
                </div>
                <span style={{ fontSize: 13, fontWeight: isActive ? 800 : 600, color: isActive ? '#0F172A' : '#64748B' }}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <div className="site-container">
        {isSubmitted ? (
          /* Confirmation Screen */
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 20,
              padding: '48px 32px',
              textAlign: 'center',
              border: '1.5px solid #A7F3D0',
              boxShadow: '0 8px 30px rgba(16, 185, 129, 0.08)',
              maxWidth: 720,
              margin: '0 auto',
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: '#ECFDF5',
                color: 'var(--primary-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 36,
                margin: '0 auto 20px',
                fontWeight: 900,
              }}
            >
              ✓
            </div>
            <div style={{ display: 'inline-block', background: '#FEF3C7', color: '#B45309', padding: '4px 12px', borderRadius: 16, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', marginBottom: 12 }}>
              Spot Mill Rate Locked · Reference #{quoteId}
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', marginBottom: 10 }}>
              AI Commercial BOQ Quotation Generated!
            </h2>
            <p style={{ fontSize: 14.5, color: '#64748B', lineHeight: 1.6, maxWidth: 580, margin: '0 auto 24px' }}>
              We have locked in plant spot prices for <strong>{deliveryCity}</strong>. Your itemized quote PDF and batch BIS mill test certificates have been dispatched to <strong>{mobileNumber || '+91 98249 39888'}</strong>.
            </p>

            {creditApplied && (
              <div
                style={{
                  background: '#FFFBEB',
                  border: '1.5px solid #FCD34D',
                  borderRadius: 14,
                  padding: '16px 20px',
                  marginBottom: 24,
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#92400E', fontWeight: 800, fontSize: 14, marginBottom: 4 }}>
                  <span>💎</span> Matelio Revolving Credit Line Pre-Approved
                </div>
                <div style={{ fontSize: 13, color: '#78350F', lineHeight: 1.5 }}>
                  This BOQ utilizes <strong>₹15,40,000</strong> of your pre-approved <strong>₹20,00,000</strong> GST credit limit. 0% collateral, 90-day repayment cycle locked in.
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/919824939888?text=Hello%20Matelioverse,%20I%20have%20locked%20BOQ%20${quoteId}%20for%20plant%20dispatch.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#25D366',
                  color: '#FFFFFF',
                  padding: '12px 24px',
                  borderRadius: 12,
                  fontWeight: 800,
                  fontSize: 14,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span>💬 Discuss Dispatch with Key Account Mgr</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                }}
                style={{
                  background: '#F1F5F9',
                  color: '#0F172A',
                  padding: '12px 24px',
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 14,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Create Another BOQ
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 32 }} className="contact-layout-2col">
            {/* Left: Step Form Content */}
            <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 32, border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
              {/* STEP 1: Upload BOQ */}
              {currentStep === 1 && (
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', marginBottom: 6 }}>
                    Step 1: Upload BOQ / Requisition Sheet
                  </h3>
                  <p style={{ fontSize: 13.5, color: '#64748B', marginBottom: 20 }}>
                    Upload handwritten notes, PDF blueprints, or Excel BOQ sheets for instant AI extraction.
                  </p>

                  {/* Drag and Drop Zone */}
                  <label
                    style={{
                      border: '2px dashed #CBD5E1',
                      borderRadius: 16,
                      padding: '36px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#F8FAFC',
                      cursor: 'pointer',
                      marginBottom: 20,
                      transition: 'border-color 0.2s ease',
                    }}
                  >
                    <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} accept=".pdf,.xlsx,.xls,.dwg,.png,.jpg,.jpeg" />
                    <div style={{ width: 54, height: 54, borderRadius: '50%', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 12 }}>
                      📄
                    </div>
                    <div style={{ fontSize: 14.5, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>
                      {uploadedFileName ? `Selected: ${uploadedFileName}` : 'Click to Upload or Drag & Drop BOQ'}
                    </div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>
                      Supports PDF, Excel (.xlsx), CAD/DWG, or Site Photos (Up to 25 MB)
                    </div>
                  </label>

                  {/* Category Fast Selection */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: '#334155', marginBottom: 10 }}>
                      Or select core material categories to auto-populate estimates:
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {[
                        'TMT Steel (Fe550D)',
                        'OPC 53 Cement',
                        'AAC Wall Panels',
                        'Vitrified Tiles',
                        'Plumbing CPVC',
                        'Tile Adhesives & Chemicals',
                      ].map((cat) => {
                        const isSelected = selectedCategories.includes(cat);
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => toggleCategory(cat)}
                            style={{
                              padding: '8px 14px',
                              borderRadius: 20,
                              fontSize: 12.5,
                              fontWeight: 700,
                              border: `1.5px solid ${isSelected ? 'var(--primary-orange)' : '#CBD5E1'}`,
                              background: isSelected ? 'var(--primary-orange-light)' : '#FFFFFF',
                              color: isSelected ? 'var(--primary-orange-active)' : '#334155',
                              cursor: 'pointer',
                            }}
                          >
                            {isSelected ? '✓ ' : '+ '}
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    style={{
                      width: '100%',
                      height: 48,
                      background: 'var(--primary-green)',
                      color: '#FFFFFF',
                      borderRadius: 12,
                      fontWeight: 800,
                      fontSize: 14,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Proceed to Project Scope →
                  </button>
                </div>
              )}

              {/* STEP 2: Project Scope */}
              {currentStep === 2 && (
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', marginBottom: 6 }}>
                    Step 2: Project Specifications &amp; Pour Schedule
                  </h3>
                  <p style={{ fontSize: 13.5, color: '#64748B', marginBottom: 20 }}>
                    Align your consignment schedule with foundation, slab, or finishing stages.
                  </p>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      Project Type / Classification *
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5, background: '#fff' }}
                    >
                      <option>G+4 Residential Building / Bunglow</option>
                      <option>High-Rise Commercial Complex</option>
                      <option>Industrial Factory / GIDC Shed</option>
                      <option>Roads, Bridges &amp; Public Infra</option>
                      <option>Interior Renovation / Turnkey</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                        Target First Delivery / Pour Date *
                      </label>
                      <select
                        value={targetPourDate}
                        onChange={(e) => setTargetPourDate(e.target.value)}
                        style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5, background: '#fff' }}
                      >
                        <option>Immediate (Within 24–48 Hours)</option>
                        <option>Within 3–5 Days</option>
                        <option>Within 7 Days</option>
                        <option>Scheduled Monthly Consignment</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                        Site Crane / Unloading Equipment
                      </label>
                      <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                        <button
                          type="button"
                          onClick={() => setCraneAccess(true)}
                          style={{
                            flex: 1,
                            padding: '8px 10px',
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            border: `1.5px solid ${craneAccess ? 'var(--primary-orange)' : '#CBD5E1'}`,
                            background: craneAccess ? 'var(--primary-orange-light)' : '#fff',
                            color: craneAccess ? 'var(--primary-orange-active)' : '#334155',
                            cursor: 'pointer',
                          }}
                        >
                          🏗️ Crane Available
                        </button>
                        <button
                          type="button"
                          onClick={() => setCraneAccess(false)}
                          style={{
                            flex: 1,
                            padding: '8px 10px',
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            border: `1.5px solid ${!craneAccess ? 'var(--primary-orange)' : '#CBD5E1'}`,
                            background: !craneAccess ? 'var(--primary-orange-light)' : '#fff',
                            color: !craneAccess ? 'var(--primary-orange-active)' : '#334155',
                            cursor: 'pointer',
                          }}
                        >
                          Manual Labor
                        </button>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      style={{ padding: '0 20px', height: 48, background: '#F1F5F9', color: '#0F172A', borderRadius: 12, fontWeight: 700, border: 'none', cursor: 'pointer' }}
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      style={{ flex: 1, height: 48, background: 'var(--primary-green)', color: '#FFFFFF', borderRadius: 12, fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer' }}
                    >
                      Proceed to Logistics →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Site Logistics */}
              {currentStep === 3 && (
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', marginBottom: 6 }}>
                    Step 3: Delivery Hub &amp; Site Entity
                  </h3>
                  <p style={{ fontSize: 13.5, color: '#64748B', marginBottom: 20 }}>
                    Enter destination coordinates for regional mill freight calculation.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 12, marginBottom: 14 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                        Site City / Industrial Area *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryCity}
                        onChange={(e) => setDeliveryCity(e.target.value)}
                        placeholder="e.g. Ahmedabad, Sanand GIDC"
                        style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5 }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                        Site Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="382421"
                        style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5 }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      Company / Contracting Entity *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Infra Projects LLP"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5 }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Lead Engineer / Purchase Mgr"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
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
                        placeholder="10-digit mobile"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        style={{ width: '100%', border: '1.5px solid #CBD5E1', padding: '10px 14px', borderRadius: 10, fontSize: 13.5 }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      style={{ padding: '0 20px', height: 48, background: '#F1F5F9', color: '#0F172A', borderRadius: 12, fontWeight: 700, border: 'none', cursor: 'pointer' }}
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleCalculateAiQuote}
                      style={{
                        flex: 1,
                        height: 48,
                        background: 'var(--primary-orange)',
                        color: '#FFFFFF',
                        borderRadius: 12,
                        fontWeight: 800,
                        fontSize: 14,
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 16px rgba(249, 121, 56, 0.35)',
                      }}
                    >
                      {isAiCalculating ? 'Optimizing AI Mill Rates...' : '⚡ Generate Magic AI Quote (60s) →'}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: AI Quote Breakdown & Credit Line */}
              {currentStep === 4 && (
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#ECFDF5', color: '#059669', padding: '4px 12px', borderRadius: 20, fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', marginBottom: 10 }}>
                    <span>✨</span> AI Demand Prediction &amp; Mill Sourcing Live
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 6 }}>
                    Provisional BOQ Quote &amp; Margin Optimizer
                  </h3>
                  <p style={{ fontSize: 13.5, color: '#64748B', marginBottom: 18, lineHeight: 1.5 }}>
                    Your BOQ quote is optimized using regional demand intelligence and live mill prices for <strong>{deliveryCity}</strong>.
                  </p>

                  {/* Itemized Table */}
                  <div style={{ border: '1px solid #E2E8F0', borderRadius: 14, overflow: 'hidden', marginBottom: 18 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
                      <thead>
                        <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#64748B' }}>
                          <th style={{ padding: '10px 12px' }}>Material Line Item</th>
                          <th style={{ padding: '10px 12px' }}>Spec / Brand</th>
                          <th style={{ padding: '10px 12px' }}>Est. Rate</th>
                          <th style={{ padding: '10px 12px', textAlign: 'right' }}>Own Brand Saving</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0F172A' }}>TMT Steel 12mm &amp; 16mm (20 MT)</td>
                          <td style={{ padding: '10px 12px', color: '#B45309' }}>Tuffar Fe550D (BIS 1786)</td>
                          <td style={{ padding: '10px 12px' }}>₹52,400 / MT</td>
                          <td style={{ padding: '10px 12px', textAlign: 'right', color: '#059669', fontWeight: 800 }}>-₹56,000</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0F172A' }}>OPC 53 Grade Cement (400 Bags)</td>
                          <td style={{ padding: '10px 12px', color: '#B45309' }}>CemXtra Plant Direct</td>
                          <td style={{ padding: '10px 12px' }}>₹348 / Bag</td>
                          <td style={{ padding: '10px 12px', textAlign: 'right', color: '#059669', fontWeight: 800 }}>-₹11,200</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0F172A' }}>AAC Wall Panels 100mm (250 Panels)</td>
                          <td style={{ padding: '10px 12px', color: '#B45309' }}>EzyWall Acoustic Interlock</td>
                          <td style={{ padding: '10px 12px' }}>₹680 / Panel</td>
                          <td style={{ padding: '10px 12px', textAlign: 'right', color: '#059669', fontWeight: 800 }}>-₹32,000</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0F172A' }}>Tile Adhesives &amp; Fasteners (Bulk)</td>
                          <td style={{ padding: '10px 12px', color: '#B45309' }}>Bondex C2TE High-Grab</td>
                          <td style={{ padding: '10px 12px' }}>Consolidated</td>
                          <td style={{ padding: '10px 12px', textAlign: 'right', color: '#059669', fontWeight: 800 }}>-₹14,500</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Summary Totals */}
                  <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 14, marginBottom: 18 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ color: '#64748B', fontSize: 13 }}>Standard Market Estimate:</span>
                      <span style={{ textDecoration: 'line-through', color: '#94A3B8', fontSize: 13 }}>₹17,05,000</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontWeight: 800, color: '#0F172A', fontSize: 15 }}>Matelio Optimized BOQ Value:</span>
                      <span style={{ fontWeight: 900, color: '#0F172A', fontSize: 18 }}>₹15,40,000</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', fontWeight: 800, fontSize: 13 }}>
                      <span>Total Manufacturer Savings:</span>
                      <span>₹1,65,000 (10.7% Saved)</span>
                    </div>
                  </div>

                  {/* Matelio Credit Line Card */}
                  <div
                    style={{
                      background: creditApplied ? '#FEF3C7' : '#FFFFFF',
                      border: `1.5px solid ${creditApplied ? '#F59E0B' : '#E2E8F0'}`,
                      borderRadius: 14,
                      padding: 16,
                      marginBottom: 20,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 20 }}>💎</span>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 800, color: '#78350F' }}>
                            Matelio Revolving Credit Line (₹25L Limit)
                          </div>
                          <div style={{ fontSize: 11.5, color: '#92400E' }}>
                            0% Collateral · 90-Day Repayment Cycle · Instant GST Approval
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCreditApplied(!creditApplied)}
                        style={{
                          background: creditApplied ? '#D97706' : '#FFFFFF',
                          color: creditApplied ? '#FFFFFF' : '#D97706',
                          border: '1.5px solid #D97706',
                          borderRadius: 8,
                          padding: '6px 14px',
                          fontSize: 12,
                          fontWeight: 800,
                          cursor: 'pointer',
                        }}
                      >
                        {creditApplied ? 'Credit Applied ✓' : 'Apply Credit'}
                      </button>
                    </div>

                    {creditApplied && (
                      <div style={{ fontSize: 12, color: '#92400E', paddingTop: 8, borderTop: '1px dashed #FCD34D' }}>
                        Your GSTIN qualifies for ₹20,00,000 credit. This BOQ uses <strong>₹15,40,000</strong> (Remaining: ₹4,60,000). Repay in 90 days.
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      style={{ padding: '0 20px', height: 48, background: '#F1F5F9', color: '#0F172A', borderRadius: 12, fontWeight: 700, border: 'none', cursor: 'pointer' }}
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleFinalSubmit}
                      style={{
                        flex: 1,
                        height: 48,
                        background: 'var(--primary-orange)',
                        color: '#FFFFFF',
                        borderRadius: 12,
                        fontWeight: 800,
                        fontSize: 14.5,
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 16px rgba(249, 121, 56, 0.35)',
                      }}
                    >
                      LOCK SPOT RATE &amp; SCHEDULE DISPATCH →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Trust & Speed Pillars */}
            <div>
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 20, padding: 24, boxShadow: '0 2px 10px rgba(0,0,0,0.03)', marginBottom: 20 }}>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 14 }}>
                  Why Procure via Matelio Instant BOQ?
                </h4>

                <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    ⚡
                  </div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 800, color: '#0F172A' }}>Magic AI Quote in 60 Secs</div>
                    <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.4, marginTop: 2 }}>
                      No waiting 3 days for distributor callbacks. Regional mill algorithms calculate freight and commercial rates instantly.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    🔬
                  </div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 800, color: '#0F172A' }}>Batch Mill Test Certificates</div>
                    <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.4, marginTop: 2 }}>
                      Every truck consignment arrives with computerized BIS conformance test sheets and certified weighbridge slips.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    💳
                  </div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 800, color: '#0F172A' }}>₹25L Revolving Credit Line</div>
                    <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.4, marginTop: 2 }}>
                      0% collateral, 90-day repayment cycle. Keep concrete casting and foundation schedules on track without cash delays.
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div style={{ background: 'linear-gradient(135deg, #0E3128, #133028)', borderRadius: 20, padding: 24, color: '#FFFFFF' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--primary-orange)', textTransform: 'uppercase', marginBottom: 4 }}>
                  Instant Site Help
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Prefer sending BOQ on WhatsApp?</h4>
                <p style={{ fontSize: 12.5, color: '#A7F3D0', lineHeight: 1.45, marginBottom: 14 }}>
                  Send photos of handwritten requisitions or spreadsheets directly to our senior site desk.
                </p>
                <a
                  href="https://wa.me/919824939888?text=Hello%20Matelioverse,%20I%20have%20an%20urgent%20BOQ%20requirement%20for%20site%20delivery."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#25D366',
                    color: '#FFFFFF',
                    padding: '10px 18px',
                    borderRadius: 10,
                    fontWeight: 800,
                    fontSize: 13,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span>💬 WhatsApp BOQ (+91 98249 39888)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
