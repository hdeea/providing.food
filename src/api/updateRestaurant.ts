export const updateRestaurant = async (payload: any) => {
  const response = await fetch('/api/Restaurant/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    // هي بتخلي الـ try/catch يمسك الخطأ لو صار فعلاً
    throw new Error('Failed to update restaurant');
  }

  // رجّع شي حتى ما يصير undefined
  const result = await response.text(); // أو json() إذا بيرجع شي JSON
  return result;
};