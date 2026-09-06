'use client';

import React, { useState } from 'react';
import { useLocation } from '@/context/LocationContext';
import { HUBS } from '@/data/hubs';

export default function LocationModal() {
  const { currentHub, pincode, isLocationModalOpen, closeLocationModal, setCity, setPincode } = useLocation();
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isLocationModalOpen) return null;

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pinInput)) {
      setErrorMsg('Please enter a valid 6-digit Indian PIN code');
      return;
    }
    const success = setPincode(pinInput);
    if (success) {
      setErrorMsg('');
      setPinInput('');
    }
  };

  return (
    <div
      className={`standard-modal-overlay ${isLocationModalOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeLocationModal();
      }}
    >
      <div className="standard-modal-card">
        <div className="standard-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>📍</span>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>Choose Your Delivery Location</h3>
              <p style={{ fontSize: 12, color: '#64748B', margin: '2px 0 0 0' }}>Check live inventory and real-time delivery SLA</p>
            </div>
          </div>
          <button
            type="button"
            className="cart-drawer-close"
            onClick={closeLocationModal}
            aria-label="Close location selector"
          >
            ✕
          </button>
        </div>

        <div className="standard-modal-body">
          {/* Pincode Search */}
          <form onSubmit={handlePincodeSubmit} style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
              Enter 6-Digit Delivery Pincode
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                maxLength={6}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value.replace(/\D/g, ''));
                  setErrorMsg('');
                }}
                placeholder="e.g. 382421"
                style={{ flex: 1, border: '1.5px solid #CBD5E1', borderRadius: 10, padding: '10px 14px', fontSize: 14, outline: 'none', fontWeight: 600 }}
              />
              <button
                type="submit"
                style={{ background: 'var(--primary-green)', color: '#fff', fontWeight: 700, fontSize: 13.5, borderRadius: 10, padding: '0 18px', border: 'none', cursor: 'pointer' }}
              >
                Apply
              </button>
            </div>
            {errorMsg && (
              <div style={{ color: '#DC2626', fontSize: 11.5, fontWeight: 600, marginTop: 6 }}>
                {errorMsg}
              </div>
            )}
          </form>

          {/* Current Hub Indicator */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Active Fulfillment Hub</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A' }}>{currentHub.name} ({pincode})</div>
              <div style={{ fontSize: 12, color: 'var(--primary-green)', fontWeight: 700, marginTop: 2 }}>
                ⚡ {currentHub.instantSla} · {currentHub.scheduledSla}
              </div>
            </div>
            <span style={{ fontSize: 24 }}>🚚</span>
          </div>

          {/* Quick City Selector */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 10 }}>
              Popular Delivery Hubs
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {HUBS.map((hub) => {
                const isSelected = hub.id === currentHub.id;
                return (
                  <button
                    key={hub.id}
                    type="button"
                    onClick={() => setCity(hub.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: `1.5px solid ${isSelected ? 'var(--primary-green)' : '#E2E8F0'}`,
                      background: isSelected ? '#ECFDF5' : '#FFFFFF',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 800, color: isSelected ? 'var(--primary-green)' : '#0F172A' }}>
                        {hub.name}
                      </div>
                      <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                        {hub.instantSla}
                      </div>
                    </div>
                    {isSelected && <span style={{ color: 'var(--primary-green)', fontWeight: 800, fontSize: 16 }}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
