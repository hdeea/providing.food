export const updateDonationStatus = async (
  requesId: number,
  status: 'Approved' | 'Rejected' | 'Pending'
) => {
  try {
    const response = await fetch(`/api/DonationIndividal/update-status?RequesId=${requesId}&status=${status}`, 

      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`فشل التحديث: ${response.status} - ${errorText}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error('❌ خطأ في تحديث الحالة:', error);
    throw error;
  }
};
