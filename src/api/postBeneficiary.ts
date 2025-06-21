import { Beneficiary } from '../types/index';

export const postBeneficiary = async (beneficiary: Beneficiary) => {
  // تجهيز البايلود حسب DTO تبع الباك إند
  const payload = {
    fullName: beneficiary.fullName,
    phoneNumber: beneficiary.phoneNumber,
    familySize: beneficiary.familySize,
    isActive: beneficiary.isActive
  };

  try {
    console.log("Payload being sent:", payload);

    const response = await fetch('/api/Beneficiary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server responded with error:', errorText);
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Beneficiary added successfully:', data);
    return data;
  } catch (error: any) {
    console.error('Error adding beneficiary:', error.message || error);
    throw error;
  }
};
