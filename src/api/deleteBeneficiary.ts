// src/api/deleteBeneficiary.ts
export const deleteBeneficiary = async (id: number) => {
  const response = await fetch(`/api/Beneficiary/delete/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete beneficiary');
  }

  return response.json();
};
