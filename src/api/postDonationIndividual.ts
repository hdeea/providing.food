import { DonationIndividualDto } from '@/types/individual';  // حسب مكان الملف تبعك

export const postDonationIndividual = async (donation: DonationIndividualDto) => {
  const payload = {
    foodName: donation.foodName,
    userType: donation.userType,
    description: donation.description,
    image: donation.image,
    country: donation.country,
    vegetarian: donation.vegetarian,
    userEmail: donation.userEmail,
  };

  try {
    console.log("Payload being sent:", payload);

 const response = await fetch('/api/DonationIndividal/add', {
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
    console.log('Donation added successfully:', data);
    return data;
  } catch (error: any) {
    console.error('Error adding donation:', error.message || error);
    throw error;
  }
};
