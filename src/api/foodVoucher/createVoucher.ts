// ✅ بعد:
import { VoucherRequest } from '@/types/individual';

export const createFoodBond = async (voucher: VoucherRequest) => {

  try {
    const response = await fetch("/api/FoodBond", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(voucher),
    });

    if (!response.ok) {
      throw new Error(`فشل إنشاء السند: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ فشل إنشاء السند:", error);
    throw error;
  }
};
