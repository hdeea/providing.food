// src/api/createFoodBond.ts
import { VoucherIssuance } from '@/types/individual';

export const createFoodBond = async (voucher: VoucherIssuance): Promise<VoucherIssuance> => {
  const response = await fetch('', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(voucher),
    
  });

  if (!response.ok) {
    throw new Error('Failed to create food bond');
  }

  const createdBond = await response.json();
  return createdBond;
};
