'use client';

import React, { useState } from 'react';

interface LoyaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoyaltyModal({ isOpen, onClose }: LoyaltyModalProps) {
  const [copied, setCopied] = useState(false);
  const referralCode = 'BUILD1000';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Use code ${referralCode} on Matelioverse for ₹1,000 off your building materials order: https://matelioverse.com?ref=${referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`standard-modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="standard-modal-card" style={{ maxWidth: 480 }}>
        <div className="standard-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>🎁</span>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Matelio Cash &amp; Referral Rewards
              </h3>
              <p style={{ fontSize: 12, color: '#64748B', margin: '2px 0 0 0' }}>
                Earn ₹ back on every single building materials order
              </p>
            </div>
          </div>
          <button type="button" className="cart-drawer-close" onClick={onClose} aria-label="Close rewards">
            ✕
          </button>
        </div>

        <div className="standard-modal-body">
          {/* Active Balance Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, #065F46 0%, #047857 100%)',
              color: '#FFFFFF',
              borderRadius: 16,
              padding: '20px 24px',
              marginBottom: 20,
              boxShadow: '0 8px 24px rgba(4, 120, 87, 0.25)',
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#A7F3D0', letterSpacing: '0.5px' }}>
              Your Matelio Cash Balance
            </div>
            <div style={{ fontSize: 32, fontWeight: 900, marginTop: 4, marginBottom: 6 }}>
              ₹500 <span style={{ fontSize: 14, fontWeight: 600, color: '#D1FAE5' }}>Active Credit</span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.85)' }}>
              ✦ 2% Cashback automatically accumulates on all online &amp; POD orders
            </div>
          </div>

          {/* Refer and Earn */}
          <div style={{ border: '1.5px dashed #CBD5E1', borderRadius: 14, padding: 18, background: '#F8FAFC', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>🤝</span>
              <h4 style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Refer an Infra Colleague, Both get ₹1,000
              </h4>
            </div>
            <p style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.45, marginBottom: 14 }}>
              Share your invite link with contractors, engineers, or real estate developers. When they place their first material order above ₹10,000, you both get ₹1,000 wallet credit!
            </p>

            <div style={{ display: 'flex', gap: 8 }}>
              <div
                style={{
                  flex: 1,
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: 10,
                  padding: '10px 14px',
                  fontWeight: 800,
                  fontSize: 14,
                  letterSpacing: '1px',
                  color: '#0F172A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>{referralCode}</span>
                <span style={{ fontSize: 11, color: 'var(--primary-green)', fontWeight: 700 }}>20% EXTRA</span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  background: copied ? '#059669' : 'var(--primary-green)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: 13,
                  padding: '0 16px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {copied ? 'Copied! ✓' : 'Copy Code'}
              </button>
            </div>
          </div>

          {/* WhatsApp Share Button */}
          <a
            href={`https://wa.me/?text=Hey!%20Check%20out%20Matelioverse%20for%20direct%20manufacturer%20prices%20on%20TMT,%20Cement%20and%20Tiles.%20Use%20code%20${referralCode}%20for%20%E2%82%B91,000%20credit:%20https://matelioverse.com`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
              height: 44,
              background: '#25D366',
              color: '#FFFFFF',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 13.5,
              textDecoration: 'none',
            }}
          >
            <span>💬 Share Invite on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
