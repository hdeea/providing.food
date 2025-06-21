import { Restaurant } from '@/types/index';

export const getRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const response = await fetch('/api/Restaurant');
    
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Data received from backend:", data);  // <-- هذا السطر أضفناه
    
    return data;
  } catch (error: any) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
