'use client';

import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Verification successful! Logged in as +91 ' + phone);
    onClose();
    setStep('phone');
    setPhone('');
    setOtp('');
  };

  return (
    <div
      className={`login-modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
          setStep('phone');
        }
      }}
    >
      <div className="login-modal-card">
        <button
          type="button"
          className="modal-close-btn"
          aria-label="Close modal"
          onClick={() => {
            onClose();
            setStep('phone');
          }}
        >
          ✕
        </button>

        <div className="login-modal-content">
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <img
              src="https://api.matelioverse.com/assets/e0847d46-2489-475e-8dfc-e7b520e1df15"
              alt="Matelioverse"
              style={{ height: 28, width: 'auto', margin: '0 auto 12px auto' }}
            />
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A' }}>
              Log in or sign up
            </h3>
            <p style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>
              Access wholesale dealer rates, track site dispatches, and manage franchise tools
            </p>
          </div>

          {step === 'phone' ? (
            <form onSubmit={handleSendOtp}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Mobile Number
                </label>
                <div style={{ display: 'flex', border: '1.5px solid #CBD5E1', borderRadius: 12, overflow: 'hidden', background: '#F8FAFC' }}>
                  <div style={{ padding: '10px 14px', background: '#EDF2F7', fontSize: 14, fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: 4, borderRight: '1px solid #CBD5E1' }}>
                    <span>🇮🇳</span> <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="Enter 10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    style={{ flex: 1, border: 'none', padding: '10px 14px', fontSize: 14, outline: 'none', background: 'transparent' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  height: 46,
                  background: 'var(--primary-green)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: 14,
                  borderRadius: 12,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 168, 107, 0.3)',
                }}
              >
                SEND OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Enter 6-Digit OTP sent to +91 {phone}
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="• • • • • •"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  style={{
                    width: '100%',
                    border: '1.5px solid var(--primary-green)',
                    borderRadius: 12,
                    padding: '12px',
                    fontSize: 20,
                    letterSpacing: '8px',
                    textAlign: 'center',
                    outline: 'none',
                    fontWeight: 800,
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  height: 46,
                  background: 'var(--primary-green)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: 14,
                  borderRadius: 12,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 168, 107, 0.3)',
                }}
              >
                VERIFY &amp; LOGIN
              </button>

              <button
                type="button"
                onClick={() => setStep('phone')}
                style={{ width: '100%', marginTop: 10, fontSize: 12, color: '#64748B', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Change Mobile Number
              </button>
            </form>
          )}

          <div style={{ textAlign: 'center', fontSize: 11.5, color: '#94A3B8', marginTop: 18 }}>
            By continuing, you agree to Matelioverse&apos;s Terms of Use and Privacy Policy.
          </div>
        </div>
      </div>
    </div>
  );
}
