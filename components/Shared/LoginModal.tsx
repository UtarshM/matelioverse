'use client';

import React, { useState } from 'react';
import { useAuth, UserProfile } from '@/context/AuthContext';
import { HUBS } from '@/data/hubs';

interface LoginModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function LoginModal(props: LoginModalProps = {}) {
  const auth = useAuth();
  const isModalOpen = props.isOpen !== undefined ? props.isOpen : auth.isLoginModalOpen;
  const closeModal = () => {
    if (props.onClose) props.onClose();
    auth.closeLoginModal();
  };
  const modalMode = auth.modalMode;
  const setModalMode = auth.setModalMode;
  const login = auth.login;

  // Login form state
  const [loginPhone, setLoginPhone] = useState('');
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [otp, setOtp] = useState('');

  // Sign up form state
  const [signupName, setSignupName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupBusiness, setSignupBusiness] = useState('');
  const [signupRole, setSignupRole] = useState<'contractor' | 'dealer' | 'architect' | 'individual'>('contractor');
  const [signupCity, setSignupCity] = useState(HUBS[0]?.name || 'Ahmedabad');
  const [signupGstin, setSignupGstin] = useState('');

  // Pending user to complete login upon OTP verification
  const [pendingUser, setPendingUser] = useState<UserProfile | null>(null);

  if (!isModalOpen) return null;

  const handleSendLoginOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPhone.length === 10) {
      setPendingUser({
        name: `User +91 ${loginPhone.slice(-4)}`,
        phone: loginPhone,
        businessName: 'Matelioverse Pro Member',
        role: 'contractor',
        city: 'Ahmedabad',
      });
      setStep('otp');
    }
  };

  const handleSendSignupOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPhone.length === 10 && signupName.trim()) {
      setPendingUser({
        name: signupName.trim(),
        phone: signupPhone,
        businessName: signupBusiness.trim() || undefined,
        role: signupRole,
        city: signupCity,
        gstin: signupGstin.trim().toUpperCase() || undefined,
      });
      setStep('otp');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (pendingUser) {
      login(pendingUser);
      // Reset
      setStep('form');
      setOtp('');
      setLoginPhone('');
    }
  };

  // Demo 1-click accounts for fast testing
  const handleQuickDemoLogin = (role: 'contractor' | 'dealer') => {
    const demoUser: UserProfile = role === 'contractor'
      ? {
          name: 'Utkarsh Makwana',
          phone: '9824939888',
          businessName: 'Makwana Infra Projects LLP',
          role: 'contractor',
          city: 'Ahmedabad',
          gstin: '24AAAAA0000A1Z5',
        }
      : {
          name: 'Sandeep Kakkar',
          phone: '9825001234',
          businessName: 'Buildit Smart Franchise Store',
          role: 'dealer',
          city: 'Ahmedabad',
          gstin: '24BBBBB1111B2Z6',
        };
    login(demoUser);
  };

  const currentPhone = modalMode === 'login' ? loginPhone : signupPhone;

  return (
    <div
      className={`login-modal-overlay active`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
          setStep('form');
        }
      }}
    >
      <div className="login-modal-card" style={{ maxWidth: 460, borderRadius: 20, overflow: 'hidden', padding: 0 }}>
        <button
          type="button"
          className="modal-close-btn"
          aria-label="Close modal"
          onClick={() => {
            closeModal();
            setStep('form');
          }}
          style={{ top: 14, right: 14, zIndex: 10 }}
        >
          ✕
        </button>

        {/* Header Branding */}
        <div style={{ background: 'linear-gradient(135deg, #0E3128 0%, #174237 100%)', padding: '24px 24px 18px 24px', textAlign: 'center', color: '#FFFFFF' }}>
          <img
            src="https://api.matelioverse.com/assets/e0847d46-2489-475e-8dfc-e7b520e1df15"
            alt="Matelioverse"
            style={{ height: 26, width: 'auto', margin: '0 auto 8px auto', filter: 'brightness(0) invert(1)' }}
          />
          <h3 style={{ fontSize: 18, fontWeight: 900, margin: '4px 0 2px 0', color: '#FFFFFF' }}>
            {step === 'otp'
              ? 'Security Verification'
              : modalMode === 'login'
              ? 'Log In to Matelioverse'
              : 'Create Business Account'}
          </h3>
          <p style={{ fontSize: 12, color: '#C2ECCA', margin: 0 }}>
            {step === 'otp'
              ? `Enter the 6-digit OTP sent to +91 ${currentPhone}`
              : 'Wholesale plant pricing, 20-35% own-brand margins & instant dispatch'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="login-modal-content" style={{ padding: '20px 24px 24px 24px' }}>
          {step === 'form' ? (
            <>
              {/* Tab Selector: Login vs Sign Up */}
              <div
                style={{
                  display: 'flex',
                  background: '#F1F5F9',
                  borderRadius: 12,
                  padding: 4,
                  marginBottom: 18,
                }}
              >
                <button
                  type="button"
                  onClick={() => setModalMode('login')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 9,
                    fontSize: 13,
                    fontWeight: modalMode === 'login' ? 800 : 600,
                    border: 'none',
                    background: modalMode === 'login' ? '#FFFFFF' : 'transparent',
                    color: modalMode === 'login' ? '#0F172A' : '#64748B',
                    boxShadow: modalMode === 'login' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  🔑 Log In
                </button>
                <button
                  type="button"
                  onClick={() => setModalMode('signup')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 9,
                    fontSize: 13,
                    fontWeight: modalMode === 'signup' ? 800 : 600,
                    border: 'none',
                    background: modalMode === 'signup' ? '#FFFFFF' : 'transparent',
                    color: modalMode === 'signup' ? 'var(--primary-orange)' : '#64748B',
                    boxShadow: modalMode === 'signup' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  📝 Sign Up / Register
                </button>
              </div>

              {/* MODE 1: LOG IN FORM */}
              {modalMode === 'login' ? (
                <form onSubmit={handleSendLoginOtp}>
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
                        placeholder="Enter 10-digit mobile number"
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        style={{ flex: 1, border: 'none', padding: '10px 14px', fontSize: 14, outline: 'none', background: 'transparent' }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      height: 46,
                      background: 'var(--primary-orange)',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: 14,
                      borderRadius: 12,
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(249, 121, 56, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                    }}
                  >
                    <span>Continue with OTP</span>
                    <span>→</span>
                  </button>

                  {/* 1-Click Fast Demo Login */}
                  <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px dashed #E2E8F0', textAlign: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Quick 1-Click Test Login:
                    </span>
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                      <button
                        type="button"
                        onClick={() => handleQuickDemoLogin('contractor')}
                        style={{
                          flex: 1,
                          padding: '7px 10px',
                          borderRadius: 8,
                          fontSize: 11.5,
                          fontWeight: 700,
                          border: '1px solid #CBD5E1',
                          background: '#F8FAFC',
                          color: '#334155',
                          cursor: 'pointer',
                        }}
                      >
                        🏗️ Contractor Demo
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickDemoLogin('dealer')}
                        style={{
                          flex: 1,
                          padding: '7px 10px',
                          borderRadius: 8,
                          fontSize: 11.5,
                          fontWeight: 700,
                          border: '1px solid #CBD5E1',
                          background: '#F8FAFC',
                          color: '#334155',
                          cursor: 'pointer',
                        }}
                      >
                        🏪 Franchise Dealer Demo
                      </button>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12.5, color: '#64748B' }}>
                    Don&apos;t have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setModalMode('signup')}
                      style={{ color: 'var(--primary-orange)', fontWeight: 800, border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      Sign Up here
                    </button>
                  </div>
                </form>
              ) : (
                /* MODE 2: SIGN UP / REGISTRATION FORM */
                <form onSubmit={handleSendSignupOtp}>
                  {/* Role Selector */}
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      I am registering as:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                      {[
                        { id: 'contractor', label: '🏗️ Contractor / Infra Builder' },
                        { id: 'dealer', label: '🏪 Retail Dealer / Franchisee' },
                        { id: 'architect', label: '📐 Architect / Engineer' },
                        { id: 'individual', label: '🏠 Home Owner' },
                      ].map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setSignupRole(r.id as any)}
                          style={{
                            padding: '6px 8px',
                            borderRadius: 8,
                            fontSize: 11,
                            fontWeight: signupRole === r.id ? 800 : 500,
                            border: `1.5px solid ${signupRole === r.id ? 'var(--primary-orange)' : '#E2E8F0'}`,
                            background: signupRole === r.id ? 'var(--primary-orange-light)' : '#FFFFFF',
                            color: signupRole === r.id ? 'var(--primary-orange-active)' : '#475569',
                            cursor: 'pointer',
                            textAlign: 'left',
                          }}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Full Name */}
                  <div style={{ marginBottom: 10 }}>
                    <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Utkarsh Makwana"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      style={{
                        width: '100%',
                        border: '1.5px solid #CBD5E1',
                        borderRadius: 10,
                        padding: '8px 12px',
                        fontSize: 13,
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Mobile Number */}
                  <div style={{ marginBottom: 10 }}>
                    <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Mobile Number (OTP Verification) *
                    </label>
                    <div style={{ display: 'flex', border: '1.5px solid #CBD5E1', borderRadius: 10, overflow: 'hidden', background: '#F8FAFC' }}>
                      <div style={{ padding: '8px 12px', background: '#EDF2F7', fontSize: 13, fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: 4, borderRight: '1px solid #CBD5E1' }}>
                        <span>🇮🇳</span> <span>+91</span>
                      </div>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="10-digit mobile number"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        style={{ flex: 1, border: 'none', padding: '8px 12px', fontSize: 13, outline: 'none', background: 'transparent' }}
                      />
                    </div>
                  </div>

                  {/* Business Name */}
                  <div style={{ marginBottom: 10 }}>
                    <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Business / Firm Name {signupRole !== 'individual' ? '*' : '(Optional)'}
                    </label>
                    <input
                      type="text"
                      required={signupRole !== 'individual'}
                      placeholder="e.g. Makwana Infra Projects LLP"
                      value={signupBusiness}
                      onChange={(e) => setSignupBusiness(e.target.value)}
                      style={{
                        width: '100%',
                        border: '1.5px solid #CBD5E1',
                        borderRadius: 10,
                        padding: '8px 12px',
                        fontSize: 13,
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* City Hub & GSTIN in 2 Cols */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                        Primary City Hub
                      </label>
                      <select
                        value={signupCity}
                        onChange={(e) => setSignupCity(e.target.value)}
                        style={{
                          width: '100%',
                          border: '1.5px solid #CBD5E1',
                          borderRadius: 10,
                          padding: '8px 10px',
                          fontSize: 12.5,
                          outline: 'none',
                          background: '#FFFFFF',
                        }}
                      >
                        {HUBS.map((h) => (
                          <option key={h.id} value={h.name}>
                            {h.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                        GSTIN (Optional)
                      </label>
                      <input
                        type="text"
                        maxLength={15}
                        placeholder="24AAAAA0000A1Z5"
                        value={signupGstin}
                        onChange={(e) => setSignupGstin(e.target.value.toUpperCase())}
                        style={{
                          width: '100%',
                          border: '1.5px solid #CBD5E1',
                          borderRadius: 10,
                          padding: '8px 10px',
                          fontSize: 12.5,
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      height: 44,
                      background: 'var(--primary-orange)',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: 14,
                      borderRadius: 12,
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(249, 121, 56, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                    }}
                  >
                    <span>Create Account &amp; Continue</span>
                    <span>→</span>
                  </button>

                  <div style={{ textAlign: 'center', marginTop: 12, fontSize: 12.5, color: '#64748B' }}>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setModalMode('login')}
                      style={{ color: 'var(--primary-orange)', fontWeight: 800, border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      Log In here
                    </button>
                  </div>
                </form>
              )}
            </>
          ) : (
            /* STEP 2: OTP VERIFICATION */
            <form onSubmit={handleVerifyOtp}>
              <div style={{ marginBottom: 18, textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: '#475569', marginBottom: 10 }}>
                  Enter the 6-digit OTP sent to <strong>+91 {currentPhone}</strong>
                </div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="• • • • • •"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  autoFocus
                  style={{
                    width: '100%',
                    maxWidth: 240,
                    margin: '0 auto',
                    display: 'block',
                    border: '2px solid var(--primary-orange)',
                    borderRadius: 12,
                    padding: '12px',
                    fontSize: 22,
                    letterSpacing: '8px',
                    textAlign: 'center',
                    outline: 'none',
                    fontWeight: 800,
                    background: '#FFF7ED',
                  }}
                />
                <div style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 8 }}>
                  💡 Test Code: Enter any 6 digits (e.g. 123456)
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  height: 46,
                  background: 'var(--primary-orange)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: 14,
                  borderRadius: 12,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(249, 121, 56, 0.3)',
                }}
              >
                VERIFY &amp; CONTINUE
              </button>

              <button
                type="button"
                onClick={() => setStep('form')}
                style={{
                  width: '100%',
                  marginTop: 10,
                  fontSize: 12,
                  color: '#64748B',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                ← Change Phone Number / Details
              </button>
            </form>
          )}

          <div style={{ textAlign: 'center', fontSize: 11, color: '#94A3B8', marginTop: 16 }}>
            By continuing, you agree to Matelioverse&apos;s Terms of Trade and Privacy Policy.
          </div>
        </div>
      </div>
    </div>
  );
}
