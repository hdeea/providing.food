import { DonationIndividualDto } from '@/types/individual';

export const getMyDonations = async (email: string): Promise<DonationIndividualDto[]> => {
  const response = await fetch(/api/DonationIndividal/my-donations?email=${email});

  if (!response.ok) {
    throw new Error('فشل في جلب بيانات التبرع');
  }

  return await response.json();
};