// src/api/deleteRestaurant.ts
export const deleteRestaurant = async (id: number) => {
  const response = await fetch(`/api/Restaurant/delete/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('فشل حذف المطعم');
  }
};
