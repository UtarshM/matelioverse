'use client';

import React, { useState } from 'react';
import { useLocation } from '@/context/LocationContext';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

export default function OrderTrackingModal({
  isOpen,
  onClose,
  initialOrderId = 'MAT-849201',
}: OrderTrackingModalProps) {
  const { currentHub } = useLocation();
  const [orderQuery, setOrderQuery] = useState(initialOrderId);
  const [activeStep, setActiveStep] = useState(2); // In transit by default for demo
  const [copiedInvoice, setCopiedInvoice] = useState(false);
  const [copiedCert, setCopiedCert] = useState(false);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'Order Verified & Packed at Hub',
      subtitle: `${currentHub.name} Central Dispatch Terminal · Batch QR Verified`,
      time: '10:15 AM (Today)',
      completed: true,
      icon: '📦',
    },
    {
      title: 'In Transit via Fleet Telematics',
      subtitle: `Tata Ace Electric (GJ-01-EV-4921) · Driver: Vikram Solanki (+91 98251 44102)`,
      time: '10:42 AM (In Transit · 18 Mins to Site)',
      completed: true,
      current: true,
      icon: '🚚',
    },
    {
      title: 'Arrival at Site Gate & Offloading',
      subtitle: 'North Unloading Bay · Contacting Site Supervisor',
      time: 'ETA 11:05 AM',
      completed: false,
      icon: '🏗️',
    },
    {
      title: 'Delivered & Certified',
      subtitle: 'Digital Weighbridge Slip & BIS Conformance Report Generated',
      time: 'Pending Delivery',
      completed: false,
      icon: '✅',
    },
  ];

  return (
    <div
      className="standard-modal-overlay active"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{ zIndex: 99999 }}
    >
      <div
        className="standard-modal-card"
        style={{
          maxWidth: 580,
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: 20,
          border: '1px solid #E2E8F0',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Modal Header */}
        <div
          className="standard-modal-header"
          style={{
            background: 'linear-gradient(135deg, #0E3128 0%, #133028 100%)',
            color: '#FFFFFF',
            padding: '20px 24px',
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(249, 121, 56, 0.25)',
                color: 'var(--primary-orange)',
                padding: '2px 8px',
                borderRadius: 12,
                fontSize: 11,
                fontWeight: 800,
                textTransform: 'uppercase',
                marginBottom: 4,
              }}
            >
              <span>⚡</span> Live Fleet Telematics
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 900, margin: 0, color: '#FFFFFF' }}>
              Real-Time Site Delivery Tracking
            </h3>
            <p style={{ fontSize: 12.5, color: '#A7F3D0', margin: '3px 0 0 0' }}>
              Fulfillment via {currentHub.name} Hub · SLA: 90 Mins Site Essentials
            </p>
          </div>
          <button
            type="button"
            className="cart-drawer-close"
            onClick={onClose}
            style={{ color: '#FFFFFF', background: 'rgba(255,255,255,0.1)' }}
            aria-label="Close tracking"
          >
            ✕
          </button>
        </div>

        <div className="standard-modal-body" style={{ padding: '24px' }}>
          {/* Order Search / Input */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              marginBottom: 20,
              background: '#F8FAFC',
              padding: 10,
              borderRadius: 12,
              border: '1.5px solid #E2E8F0',
            }}
          >
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value.toUpperCase())}
              placeholder="Enter Order # (e.g. MAT-849201)"
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontWeight: 700,
                fontSize: 14,
                color: '#0F172A',
              }}
            />
            <button
              type="button"
              style={{
                background: 'var(--primary-green)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 8,
                padding: '6px 14px',
                fontSize: 12.5,
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Track ⚡
            </button>
          </div>

          {/* Live Status Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
              border: '1.5px solid #A7F3D0',
              borderRadius: 14,
              padding: '16px 20px',
              marginBottom: 24,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>🚚</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#047857', textTransform: 'uppercase' }}>
                    Current Status: Out for Delivery
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#064E3B' }}>
                    ETA: 18 Minutes to Job Site
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: 'var(--primary-orange)',
                  color: '#FFFFFF',
                  padding: '4px 10px',
                  borderRadius: 16,
                  fontSize: 11.5,
                  fontWeight: 800,
                }}
              >
                ⚡ 90-MIN SLA
              </div>
            </div>
            <div style={{ fontSize: 12, color: '#065F46', marginTop: 4, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <span>📍 Route: SG Highway → Zundal Ring Rd</span>
              <span>📞 Driver: +91 98251 44102</span>
            </div>
          </div>

          {/* 4-Stage Stepper Timeline */}
          <div style={{ position: 'relative', paddingLeft: 10, marginBottom: 24 }}>
            {steps.map((step, idx) => {
              const isPast = idx < activeStep;
              const isCurrent = idx === activeStep;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: 16,
                    position: 'relative',
                    paddingBottom: idx === steps.length - 1 ? 0 : 22,
                  }}
                >
                  {/* Vertical line connecting nodes */}
                  {idx !== steps.length - 1 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 17,
                        top: 36,
                        bottom: 0,
                        width: 2,
                        background: isPast ? '#10B981' : '#E2E8F0',
                      }}
                    />
                  )}

                  {/* Node icon circle */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: isCurrent ? 'var(--primary-orange)' : isPast ? '#059669' : '#F1F5F9',
                      color: isCurrent || isPast ? '#FFFFFF' : '#94A3B8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      fontWeight: 900,
                      zIndex: 2,
                      boxShadow: isCurrent ? '0 0 0 4px rgba(249, 121, 56, 0.25)' : 'none',
                      flexShrink: 0,
                    }}
                  >
                    {isPast ? '✓' : step.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4
                        style={{
                          fontSize: 14,
                          fontWeight: 800,
                          color: isCurrent ? 'var(--primary-orange-active)' : '#0F172A',
                          margin: 0,
                        }}
                      >
                        {step.title}
                      </h4>
                      <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>
                        {step.time}
                      </span>
                    </div>
                    <p style={{ fontSize: 12.5, color: '#64748B', margin: '3px 0 0 0', lineHeight: 1.4 }}>
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick-Commerce Trust & Order Actions */}
          <div
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: 14,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div style={{ fontSize: 12.5, fontWeight: 800, color: '#334155' }}>
              Instant Site Documents &amp; Certificates:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button
                type="button"
                onClick={() => {
                  setCopiedInvoice(true);
                  setTimeout(() => setCopiedInvoice(false), 2000);
                }}
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: 10,
                  padding: '9px 12px',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#0F172A',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                📄 {copiedInvoice ? 'Invoice Downloaded' : 'GST Tax Invoice (18%)'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setCopiedCert(true);
                  setTimeout(() => setCopiedCert(false), 2000);
                }}
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: 10,
                  padding: '9px 12px',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#0F172A',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                🔬 {copiedCert ? 'Certificate Verified' : 'BIS Mill Test Report'}
              </button>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 8,
                borderTop: '1px dashed #E2E8F0',
                fontSize: 12,
                color: '#64748B',
              }}
            >
              <span>Need help modifying delivery gate?</span>
              <a
                href="tel:+919824939888"
                style={{ color: 'var(--primary-green)', fontWeight: 800, textDecoration: 'none' }}
              >
                Call Site Dispatch: +91 98249 39888
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
