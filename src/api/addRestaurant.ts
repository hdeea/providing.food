import { Restaurant } from '@/types/index';

export const addRestaurant = async (restaurant: Restaurant) => {
  // جهزي البايلود بالاسماء اللي بدها ياها الـ DTO بالباك اند
  const payload = {
    FullName: restaurant.FullName,
    Email: restaurant.Email,
    Password: restaurant.Password,
    PhoneNumber: restaurant.PhoneNumber,
    UserTypeName: 'Resturant',  // حطيتها ثابتة مثل ما اتفقنا
    RestaurantName: restaurant.RestaurantName,
    RestaurantEmail: restaurant.RestaurantEmail,
    RestaurantPhone: restaurant.RestaurantPhone,
    RestaurantAddress: restaurant.RestaurantAddress,
    CategoryName: restaurant.CategoryName ?? 'General', // كمان حطيت افتراضي لو فاضي
  };

  try {
    console.log("Payload being sent:", payload);

    const response = await fetch('/api/Restaurant/restaurant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // إذا في خطأ من السيرفر
      const errorText = await response.text(); // خليها text لانه ممكن السيرفر يرجع نص مش json
      console.error('Server responded with error:', errorText);
      throw new Error(`Request failed: ${response.status}`);
    }

    // إذا نجح الطلب
    const data = await response.text();
    console.log('Restaurant added successfully:', data);
    return data;
  } catch (error: any) {
    console.error('Error adding restaurant:', error.message || error);
    throw error;
  }
};


