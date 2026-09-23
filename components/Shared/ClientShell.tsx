'use client';

import React, { useState } from 'react';
import TopNav from '@/components/Header/TopNav';
import SubNav from '@/components/Header/SubNav';
import LocationModal from '@/components/Header/LocationModal';
import CartDrawer from '@/components/Commerce/CartDrawer';
import CheckoutModal from '@/components/Commerce/CheckoutModal';
import LoginModal from '@/components/Shared/LoginModal';
import LoyaltyModal from '@/components/B2B/LoyaltyModal';
import OrderTrackingModal from '@/components/Commerce/OrderTrackingModal';
import MobileDrawer from '@/components/Shared/MobileDrawer';
import MobileBottomNav from '@/components/Shared/MobileBottomNav';
import Footer from '@/components/Shared/Footer';
import { useAuth } from '@/context/AuthContext';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isLoyaltyModalOpen, setIsLoyaltyModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const { isLoginModalOpen, openLoginModal, closeLoginModal } = useAuth();

  return (
    <>
      <header className="site-header" id="site-header">
        <TopNav
          onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
          onOpenLoginModal={() => openLoginModal('login')}
          onOpenLoyaltyModal={() => setIsLoyaltyModalOpen(true)}
          onOpenTrackingModal={() => setIsTrackingModalOpen(true)}
        />
        <SubNav />
      </header>

      <main>{children}</main>

      <Footer />

      {/* Persistent Quick-Commerce Modals & Drawers */}
      <LocationModal />
      <CartDrawer />
      <CheckoutModal />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <LoyaltyModal isOpen={isLoyaltyModalOpen} onClose={() => setIsLoyaltyModalOpen(false)} />
      <OrderTrackingModal isOpen={isTrackingModalOpen} onClose={() => setIsTrackingModalOpen(false)} />
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        onOpenLogin={() => openLoginModal('login')}
      />
      <MobileBottomNav />
    </>
  );
}
