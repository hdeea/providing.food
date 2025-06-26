export const deleteBeneficiary = async (id: number) => {
  const response = await fetch(`/api/Beneficiary/delete/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('فشل حذف المستفيد');
  }

  return await response.json();
};
