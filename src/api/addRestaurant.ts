import { Restaurant } from '@/types/index';

export const addRestaurant = async (restaurant: Restaurant) => {
  // جهزي البايلود بالاسماء اللي بدها ياها الـ DTO بالباك اند
  const payload = {
    FullName: restaurant.fullName,
    Email: restaurant.email,
    Password: restaurant.password,
    PhoneNumber: restaurant.phoneNumber,
    UserTypeName: 'Resturant',  // حطيتها ثابتة مثل ما اتفقنا
    RestaurantName: restaurant.restaurantName,
    RestaurantEmail: restaurant.restaurantEmail,
    RestaurantPhone: restaurant.restaurantPhone,
    RestaurantAddress: restaurant.restaurantAddress,
    CategoryName: restaurant.categoryName ?? 'General', // كمان حطيت افتراضي لو فاضي
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


