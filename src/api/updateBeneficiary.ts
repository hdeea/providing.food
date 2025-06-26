import { Beneficiary } from "@/types";

export const updateBeneficiary = async (beneficiary: Beneficiary) => {
  const response = await fetch(`/api/Beneficiary/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(beneficiary),
  });

  if (!response.ok) {
    throw new Error('فشل التعديل');
  }

  return await response.json();
};
