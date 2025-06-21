import { Beneficiary } from '../types/index';

export const getBeneficiaries = async (): Promise<Beneficiary[]> => {
  try {
    const response = await fetch('/api/Beneficiary', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server responded with error:', errorText);
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Beneficiaries fetched successfully:', data);
    return data as Beneficiary[];
  } catch (error: any) {
    console.error('Error fetching beneficiaries:', error.message || error);
    throw error;
  }
};
