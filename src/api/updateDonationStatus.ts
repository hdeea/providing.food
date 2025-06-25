export const updateDonationStatus = async (
  donation: {
    foodId: number;
    foodName: string;
    description: string;
    country: string;
    vegetarian: boolean;
    userEmail: string;
    status: 'Approved' | 'Rejected' | 'Pending';
    image?: string;
    userType?: string;
  }
) => {
  try {
    const response = await fetch('/api/DonationIndividal/update-status', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donation), // ← هنا الـ status ضمن الـ body
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`فشل التحديث: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('حدث خطأ أثناء تحديث حالة التبرع:', error);
    throw error;
  }
};
