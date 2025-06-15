
import { Restaurant, Beneficiary, DonationRequest, FoodVoucher } from '../types';

// Mock restaurants data
export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    ownerName: 'Ahmed Hassan',
    ownerPhone: '+961 71 123 456',
    ownerEmail: 'ahmed@lebaneserestaurant.com',
    password: 'password123',
    restaurantName: 'Lebanese Cuisine',
    restaurantPhone: '+961 1 123 456',
    restaurantEmail: 'info@lebaneserestaurant.com',
    address: '123 Beirut Street, Lebanon',
    category: 'Middle Eastern',
    createdAt: '2023-01-15T10:30:00Z',
  },
  {
    id: '2',
    ownerName: 'Fatima Khalil',
    ownerPhone: '+961 71 789 012',
    ownerEmail: 'fatima@sweettreats.com',
    password: 'password456',
    restaurantName: 'Sweet Treats Bakery',
    restaurantPhone: '+961 1 789 012',
    restaurantEmail: 'info@sweettreats.com',
    address: '456 Sidon Road, Lebanon',
    category: 'Bakery',
    createdAt: '2023-02-20T14:45:00Z',
  },
];

// Mock beneficiaries data
export const mockBeneficiaries: Beneficiary[] = [
  {
    id: '1',
    name: 'Mohammad Ali',
    phone: '+961 76 123 456',
    email: 'mohammad@example.com',
    address: '789 Tripoli Avenue, Lebanon',
    registrationDate: '2023-01-10T09:15:00Z',
  },
  {
    id: '2',
    name: 'Layla Ibrahim',
    phone: '+961 76 789 012',
    email: 'layla@example.com',
    address: '987 Tyre Street, Lebanon',
    registrationDate: '2023-02-05T11:30:00Z',
  },
];

// Mock donation requests data
export const mockDonationRequests: DonationRequest[] = [
  {
    id: '1',
    restaurantId: '1',
    quantity: 10,
    description: 'Leftover kibbeh and tabbouleh from lunch service',
    pickupDateTime: '2023-04-20T18:00:00Z',
    status: 'approved',
    createdAt: '2023-04-20T14:30:00Z',
  },
  {
    id: '2',
    restaurantId: '2',
    quantity: 15,
    description: 'Assorted pastries and bread',
    pickupDateTime: '2023-04-21T19:00:00Z',
    status: 'pending',
    createdAt: '2023-04-21T10:15:00Z',
  },
];

// Mock food vouchers data
export const mockFoodVouchers: FoodVoucher[] = [
  {
    id: '1',
    beneficiaryId: '1',
    donationId: '1',
    restaurantId: '1',
    mealCount: 3,
    status: 'pending',
    qrCode: 'QR_CODE_DATA_1',
    validUntil: '2023-04-25T23:59:59Z',
    createdAt: '2023-04-20T15:00:00Z',
  },
  {
    id: '2',
    beneficiaryId: '2',
    donationId: '1',
    restaurantId: '1',
    mealCount: 2,
    status: 'redeemed',
    qrCode: 'QR_CODE_DATA_2',
    validUntil: '2023-04-25T23:59:59Z',
    createdAt: '2023-04-20T15:10:00Z',
  },
];
