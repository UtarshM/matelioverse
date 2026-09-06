'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  savings: number;
  gstAmount: number;
  deliveryFee: number;
  totalAmount: number;
  freeDeliveryThreshold: number;
  amountNeededForFreeDelivery: number;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
}

const FREE_DELIVERY_THRESHOLD = 2500;
const STANDARD_DELIVERY_FEE = 150;

function calculateTierUnitPrice(product: Product, quantity: number): number {
  if (!product.bulkPricing || product.bulkPricing.length === 0) {
    return product.sellingPrice;
  }
  // Sort descending by minQty
  const sortedTiers = [...product.bulkPricing].sort((a, b) => b.minQty - a.minQty);
  for (const tier of sortedTiers) {
    if (quantity >= tier.minQty) {
      return tier.pricePerUnit;
    }
  }
  return product.sellingPrice;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('matelio_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('matelio_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      const newQty = existing ? existing.quantity + quantity : quantity;
      const unitPrice = calculateTierUnitPrice(product, newQty);

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: newQty, unitPrice }
            : item
        );
      }
      return [...prev, { product, quantity: newQty, unitPrice }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const unitPrice = calculateTierUnitPrice(item.product, quantity);
          return { ...item, quantity, unitPrice };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemQuantity = (productId: string): number => {
    const item = items.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const totalMrp = items.reduce(
    (sum, item) => sum + item.product.mrp * item.quantity,
    0
  );

  const savings = Math.max(0, totalMrp - subtotal);
  const gstAmount = Math.round(subtotal * 0.18); // 18% standard GST
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : STANDARD_DELIVERY_FEE;
  const totalAmount = subtotal + gstAmount + deliveryFee;
  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        subtotal,
        savings,
        gstAmount,
        deliveryFee,
        totalAmount,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        amountNeededForFreeDelivery,
        isCartOpen,
        isCheckoutOpen,
        setIsCartOpen,
        setIsCheckoutOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
