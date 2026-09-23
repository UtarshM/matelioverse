'use client';

import React, { useState } from 'react';

interface LoyaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoyaltyModal({ isOpen, onClose }: LoyaltyModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'tiers' | 'referral'>('tiers');
  const referralCode = 'SITE1000';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `Use code ${referralCode} on Matelioverse for ₹1,000 off your building materials order: https://matelioverse.com?ref=${referralCode}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="standard-modal-overlay active"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{ zIndex: 99999 }}
    >
      <div className="standard-modal-card" style={{ maxWidth: 520, borderRadius: 20 }}>
        <div className="standard-modal-header" style={{ padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24 }}>💎</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--primary-orange)', textTransform: 'uppercase' }}>
                Matelio Margin+ Loyalty &amp; Rewards
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 900, color: '#0F172A', margin: 0 }}>
                Instant Cashback &amp; Volume Unlocks
              </h3>
            </div>
          </div>
          <button type="button" className="cart-drawer-close" onClick={onClose} aria-label="Close rewards">
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', padding: '0 24px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('tiers')}
            style={{
              padding: '10px 16px',
              border: 'none',
              background: 'none',
              fontWeight: 800,
              fontSize: 13,
              cursor: 'pointer',
              color: activeTab === 'tiers' ? 'var(--primary-green)' : '#64748B',
              borderBottom: activeTab === 'tiers' ? '2.5px solid var(--primary-green)' : 'none',
            }}
          >
            Margin+ Tiers &amp; Cashback
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('referral')}
            style={{
              padding: '10px 16px',
              border: 'none',
              background: 'none',
              fontWeight: 800,
              fontSize: 13,
              cursor: 'pointer',
              color: activeTab === 'referral' ? 'var(--primary-green)' : '#64748B',
              borderBottom: activeTab === 'referral' ? '2.5px solid var(--primary-green)' : 'none',
            }}
          >
            Refer &amp; Earn ₹1,000
          </button>
        </div>

        <div className="standard-modal-body" style={{ padding: '24px' }}>
          {activeTab === 'tiers' ? (
            <>
              {/* Active Balance Card */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #0E3128 0%, #1A4D3E 100%)',
                  color: '#FFFFFF',
                  borderRadius: 16,
                  padding: '20px 24px',
                  marginBottom: 20,
                  boxShadow: '0 8px 24px rgba(14, 49, 40, 0.25)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#A7F3D0' }}>
                    Active Wallet Credits
                  </div>
                  <span
                    style={{
                      background: '#F59E0B',
                      color: '#FFFFFF',
                      fontSize: 10.5,
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: 12,
                      textTransform: 'uppercase',
                    }}
                  >
                    Gold Member
                  </span>
                </div>
                <div style={{ fontSize: 32, fontWeight: 900, marginTop: 4, marginBottom: 4 }}>
                  ₹1,250 <span style={{ fontSize: 13, fontWeight: 600, color: '#D1FAE5' }}>Ready to Redeem</span>
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.4 }}>
                  ✦ 2% assured cashback on every site order + ₹2,500 on-time credit repayment bonus.
                </div>
              </div>

              {/* Tier Progress Bar */}
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 14, padding: 16, marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 800, color: '#334155', marginBottom: 8 }}>
                  <span>Tier Progress: Gold (₹14.2L / ₹25L)</span>
                  <span style={{ color: 'var(--primary-orange)' }}>₹10.8L to Platinum</span>
                </div>
                <div style={{ height: 8, background: '#E2E8F0', borderRadius: 4, overflow: 'hidden', marginBottom: 14 }}>
                  <div style={{ width: '57%', height: '100%', background: 'linear-gradient(90deg, #10B981, #F59E0B)' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, textAlign: 'center' }}>
                  <div style={{ padding: '8px 6px', background: '#FFFFFF', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B' }}>SILVER</div>
                    <div style={{ fontSize: 12, fontWeight: 900, color: '#0F172A', marginTop: 2 }}>2.0% Cash</div>
                    <div style={{ fontSize: 10, color: '#94A3B8' }}>Up to ₹5L Orders</div>
                  </div>
                  <div style={{ padding: '8px 6px', background: '#FEF3C7', borderRadius: 8, border: '1.5px solid #F59E0B' }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#B45309' }}>GOLD (Current)</div>
                    <div style={{ fontSize: 12, fontWeight: 900, color: '#B45309', marginTop: 2 }}>3.0% Cash</div>
                    <div style={{ fontSize: 10, color: '#92400E' }}>Priority Offloading</div>
                  </div>
                  <div style={{ padding: '8px 6px', background: '#FFFFFF', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B' }}>PLATINUM</div>
                    <div style={{ fontSize: 12, fontWeight: 900, color: '#0F172A', marginTop: 2 }}>4.5% Cash</div>
                    <div style={{ fontSize: 10, color: '#94A3B8' }}>₹25L 90-Day Credit</div>
                  </div>
                </div>
              </div>

              {/* Extra Perks */}
              <div style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ color: '#059669', fontWeight: 900 }}>✓</span>
                  <span><strong>Zero Minimum Order:</strong> Use Matelio Cash even on emergency 90-min orders.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#059669', fontWeight: 900 }}>✓</span>
                  <span><strong>Private Label Extra 5%:</strong> Extra savings on TileTrendz, Tuffar, and EzyWall.</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Refer and Earn */}
              <div style={{ border: '1.5px dashed #CBD5E1', borderRadius: 14, padding: 18, background: '#F8FAFC', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 22 }}>🤝</span>
                  <h4 style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Refer an Engineer, Contractor, or Dealer
                  </h4>
                </div>
                <p style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.45, marginBottom: 14 }}>
                  Share your invite link. When they place their first material order above ₹10,000, you both get ₹1,000 wallet credit!
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
                    <span style={{ fontSize: 11, color: 'var(--primary-orange)', fontWeight: 700 }}>₹1,000 CASH</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    style={{
                      background: copied ? 'var(--secondary-green)' : 'var(--primary-orange)',
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
                href={`https://wa.me/?text=Hey!%20Order%20building%20materials%20and%20hardware%20in%2090%20mins%20on%20Matelioverse.%20Use%20my%20code%20${referralCode}%20to%20get%20%E2%82%B91,000%20instant%20cashback:%20https://matelioverse.com?ref=${referralCode}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  width: '100%',
                  height: 46,
                  background: '#25D366',
                  color: '#FFFFFF',
                  borderRadius: 12,
                  fontWeight: 800,
                  fontSize: 14,
                  textDecoration: 'none',
                }}
              >
                <span>💬 Share Invite on WhatsApp</span>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
