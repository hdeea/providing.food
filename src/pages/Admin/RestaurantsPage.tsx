import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import RestaurantsTable from '../../components/Restaurants/RestaurantsTable';
import RestaurantForm from '../../components/Restaurants/RestaurantForm';
import { Restaurant } from '../../types';
import { useToast } from '@/hooks/use-toast';

const RestaurantsPage: React.FC = () => {
  // أزلنا mockRestaurants وبدأنا بقائمة فاضية
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | undefined>(undefined);
  const { toast } = useToast();

  const handleOpenForm = () => {
    setSelectedRestaurant(undefined);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedRestaurant(undefined);
  };

  const handleEdit = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsFormOpen(true);
  };

  const handleSave = (restaurantData: Partial<Restaurant>) => {
    if (selectedRestaurant) {
      // تعديل مطعم موجود
      setRestaurants(
        restaurants.map((r) =>
          r.id === selectedRestaurant.id
            ? { ...r, ...restaurantData, updatedAt: new Date().toISOString() }
            : r
        )
      );
    } else {
      // إضافة مطعم جديد
      const newRestaurant: Restaurant = {
        id: `${restaurants.length + 1}`,
        ownerName: restaurantData.ownerName || '',
        ownerPhone: restaurantData.ownerPhone || '',
        ownerEmail: restaurantData.ownerEmail || '',
        password: restaurantData.password || '',
        restaurantName: restaurantData.restaurantName || '',
        restaurantPhone: restaurantData.restaurantPhone || '',
        restaurantEmail: restaurantData.restaurantEmail || '',
        address: restaurantData.address || '',
        category: restaurantData.category || '',
        createdAt: new Date().toISOString(),
      };

      setRestaurants([...restaurants, newRestaurant]);
    }
  };

  const handleDelete = (id: string) => {
    setRestaurants(restaurants.filter((r) => r.id !== id));
  };

  return (
    <DashboardLayout title="Restaurants">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Restaurant Management</h2>
          <p className="text-gray-500">Manage restaurants that contribute surplus food</p>
        </div>
        <Button onClick={handleOpenForm} className="button-blue">
          <Plus className="mr-2 h-4 w-4" />
          Add Restaurant
        </Button>
      </div>

      <RestaurantsTable
        restaurants={restaurants}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <RestaurantForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSave={handleSave}
          initialData={selectedRestaurant}
        />
      )}
    </DashboardLayout>
  );
};

export default RestaurantsPage;
