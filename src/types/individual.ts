export interface DonationIndividualDto {
  requesId: number;  
  foodId: number;    
  status: 'Pending' | 'Approved' | 'Rejected';  
  foodName: string;
  description: string;
  image: string;
  country: string;
  vegetarian: boolean;
  userEmail?: string;
  userType?: string;
  reviewedAt?: string;
  id?: number; // للفرونت فقط 
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
export interface VoucherRequest {
  beneficiaryName: string;
  restaurantName: string;
  numberOfMeals: number;
  expiryDate: string;
};

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
  id: number;
  beneficiaryName: string;
  restaurantName: string;
  numberOfMeals: number;
  qrCode: string;
  createdAt: string;
  expiryDate: string;
  statusName: string;
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
