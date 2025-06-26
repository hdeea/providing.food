import { ReactNode } from "react";

// User types
export interface CreateAccount {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface User {
  id: number;
  fullName: string;
  role: "admin" | "restaurant" | "individual";
  token: string;
}



export type Restaurant = {
  address: ReactNode;
  restaurantId: number;
  restaurantName: string;
  restaurantEmail: string;
  restaurantPhone: string;
  restaurantAddress: string;
  userTypeName: string;
  categoryId: number;
  categoryName?: string;
  userId?: number;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  isActive?: boolean;
};


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