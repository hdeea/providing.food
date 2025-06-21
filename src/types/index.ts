// User types
export interface CreateAccount {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}


// Restaurant types
export type Restaurant = {
  restaurantId(restaurantId: any): void;
  RestaurantId: number;
  CategoryId: number;         // رقم الفئة (لو تستخدمين الرقم)
  CategoryName?: string;      // اسم الفئة (لو تحتاجينه)
  UserId?: number;
  RestaurantName: string;
  RestaurantEmail: string;
  RestaurantPhone: string;
  RestaurantAddress: string;
  UserTypeName: string;
  FullName: string;
  Email: string;
  Password: string;
  PhoneNumber: string;
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