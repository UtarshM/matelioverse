'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Hub } from '@/types';
import { HUBS, DEFAULT_HUB } from '@/data/hubs';

interface LocationContextType {
  currentHub: Hub;
  pincode: string;
  isLocationModalOpen: boolean;
  openLocationModal: () => void;
  closeLocationModal: () => void;
  setCity: (hubId: string) => void;
  setPincode: (pin: string) => boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [currentHub, setCurrentHub] = useState<Hub>(DEFAULT_HUB);
  const [pincode, setPincodeState] = useState<string>(DEFAULT_HUB.pincode);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    try {
      const savedHub = localStorage.getItem('matelio_hub');
      const savedPin = localStorage.getItem('matelio_pincode');
      if (savedHub) {
        const found = HUBS.find((h) => h.id === savedHub);
        if (found) setCurrentHub(found);
      }
      if (savedPin) setPincodeState(savedPin);
    } catch {
      // ignore
    }
  }, []);

  const setCity = (hubId: string) => {
    const found = HUBS.find((h) => h.id === hubId);
    if (found) {
      setCurrentHub(found);
      setPincodeState(found.pincode);
      try {
        localStorage.setItem('matelio_hub', found.id);
        localStorage.setItem('matelio_pincode', found.pincode);
      } catch {
        // ignore
      }
    }
    setIsLocationModalOpen(false);
  };

  const setPincode = (pin: string): boolean => {
    const trimmed = pin.trim();
    if (!/^\d{6}$/.test(trimmed)) return false;
    
    // Check if matched in any hub
    const matchedHub = HUBS.find((h) => h.supportedPincodes.includes(trimmed)) || currentHub;
    setCurrentHub(matchedHub);
    setPincodeState(trimmed);
    try {
      localStorage.setItem('matelio_hub', matchedHub.id);
      localStorage.setItem('matelio_pincode', trimmed);
    } catch {
      // ignore
    }
    setIsLocationModalOpen(false);
    return true;
  };

  return (
    <LocationContext.Provider
      value={{
        currentHub,
        pincode,
        isLocationModalOpen,
        openLocationModal: () => setIsLocationModalOpen(true),
        closeLocationModal: () => setIsLocationModalOpen(false),
        setCity,
        setPincode,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}
