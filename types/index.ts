export type SlaType = 'instant' | 'scheduled';

export interface BulkPricingTier {
  minQty: number;
  maxQty?: number;
  pricePerUnit: number;
  discountNote?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  isPrivateLabel?: boolean;
  category: string;
  categorySlug: string;
  subCategory: string;
  description: string;
  unit: string;
  mrp: number;
  sellingPrice: number;
  discountPercent: number;
  bulkPricing: BulkPricingTier[];
  deliverySla: string; // e.g. "90 Mins" or "Same-Day" or "24-48 Hrs"
  slaType: SlaType;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  qrBatchVerified: boolean;
  bisCertified: boolean;
  image: string;
  gallery?: string[];
  specs: Record<string, string>;
  datasheetUrl?: string;
  tags?: string[];
  minOrderQty?: number;
  brandLogo?: string;
  featuredPromo?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  brandName?: string;
  isPrivateLabel?: boolean;
  image: string;
  description: string;
  tag?: string;
  itemCount?: number;
  associatedBrands?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  unitPrice: number;
}

export interface Hub {
  id: string;
  name: string;
  state: string;
  pincode: string;
  supportedPincodes: string[];
  instantSla: string;
  scheduledSla: string;
  address: string;
  phone: string;
  active: boolean;
}

export interface CheckoutData {
  fullName: string;
  phone: string;
  email?: string;
  deliveryAddress: string;
  city: string;
  pincode: string;
  landmark?: string;
  isB2B: boolean;
  companyName?: string;
  gstin?: string;
  paymentMethod: 'pod' | 'online' | 'credit_line';
  orderNotes?: string;
}
