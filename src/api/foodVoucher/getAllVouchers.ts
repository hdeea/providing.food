import { VoucherIssuance } from '@/types/individual';

export const fetchAllFoodVouchers = async (): Promise<VoucherIssuance[]> => {
  try {
    const response = await fetch('/api/FoodBond');

    if (!response.ok) {
      throw new Error(`فشل الجلب: ${response.status}`);
    }

    const data: VoucherIssuance[] = await response.json();
    return data;
  } catch (error) {
    console.error('فشل في جلب السندات:', error);
    throw error;
  }
};
