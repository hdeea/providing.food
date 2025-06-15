
// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'restaurant' | 'beneficiary';
  password?: string;
}

// Restaurant types
export interface Restaurant {
  id: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  password?: string;
  restaurantName: string;
  restaurantPhone: string;
  restaurantEmail: string;
  address: string;
  category: string;
  createdAt: string;
}

// Beneficiary types
export interface Beneficiary {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  registrationDate: string;
}

// Donation types
export interface DonationRequest {
  id: string;
  restaurantId: string;
  quantity: number;
  description?: string;
  pickupDateTime: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

// Food voucher types
export interface FoodVoucher {
  id: string;
  beneficiaryId: string;
  donationId?: string;
  restaurantId: string;
  mealCount: number;
  status: 'pending' | 'redeemed' | 'expired';
  qrCode: string;
  validUntil: string;
  createdAt: string;
}
