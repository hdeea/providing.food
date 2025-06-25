import { DonationIndividualDto } from '@/types/individual';

export const getIndividualDonations = async (): Promise<DonationIndividualDto[]> => {
  try {
    const response = await fetch('/api/DonationIndividal/all');

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Individual donations received:", data);

    return data;
  } catch (error: any) {
    console.error("❌ Error fetching individual donations:", error);
    throw error;
  }
};
