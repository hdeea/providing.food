// User types
export interface CreateAccount {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "restaurant" | "individual"; 
}

export interface Restaurant {
  restaurantId: number;
  restaurantName: string;
  restaurantPhone: string;
  restaurantEmail: string;
  categoryName: string;
  address: string;
  userId: string;
}


export interface Beneficiary {
  beneficiaryId: number;
  fullName: string;
  phoneNumber: string;
  familySize: number;
  isActive: boolean;
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