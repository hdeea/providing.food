
// Individual donation types (for people who want to donate, not request help)
export interface IndividualDonor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  donationType: 'money' | 'food' | 'both';
  amount?: number;
  foodDescription?: string;
  status: 'pending' | 'approved' | 'rejected';
  totalDonations: number;
  createdAt: string;
  reviewedAt?: string;
  notes?: string;
}

// Individual donation transaction
export interface DonationTransaction {
  id: string;
  donorId: string;
  donorName: string;
  type: 'money' | 'food';
  amount?: number;
  foodItems?: string;
  targetGroup: 'families' | 'students' | 'elderly' | 'general';
  status: 'pending' | 'processed' | 'delivered';
  createdAt: string;
  processedAt?: string;
}

// Help request from needy individuals (renamed for clarity)
export interface HelpRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  reason: string;
  numberOfPeople: number;
  urgencyLevel: 'low' | 'medium' | 'high';
  status: 'pending' | 'approved' | 'rejected' | 'fulfilled';
  createdAt: string;
  reviewedAt?: string;
  notes?: string;
}

// Food voucher issuance type
export interface VoucherIssuance {
  id: string;
  beneficiaryId: string;
  restaurantId: string;
  issuedBy: string;
  mealCount: number;
  validUntil: string;
  qrCode: string;
  status: 'active' | 'used' | 'expired';
  createdAt: string;
}
export interface ScanResult {
  success: boolean;
  bond: VoucherIssuance;
  message?: string;
}
export interface FoodBondResponse {
  BondId: number;
  QRCode: string;
  Message: string;
}
