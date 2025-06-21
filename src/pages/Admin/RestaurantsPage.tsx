import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import RestaurantsTable from '../../components/Restaurants/RestaurantsTable';
import RestaurantForm from '../../components/Restaurants/RestaurantForm';
import { Restaurant } from '../../types';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { getRestaurants } from '@/api/getRestaurant';

const RestaurantsPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | undefined>(undefined);
  const { toast } = useToast();

  // ** هنا بنضيف useEffect لجلب البيانات **
useEffect(() => {
  const fetchRestaurants = async () => {
    try {
      const data = await getRestaurants();
      setRestaurants(data);
    } catch (error) {
      toast({
        title: "خطأ في جلب البيانات",
        description: "فشل في تحميل بيانات المطاعم.",
        variant: "destructive"
      });
      console.error(error);
    }
  };

  fetchRestaurants();
}, []);

  const handleOpenForm = () => {
    setSelectedRestaurant(undefined);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedRestaurant(undefined);
  };

  const handleEdit = (RestaurantId: number) => {
    const selected = restaurants.find((r) => r.RestaurantId === RestaurantId);
    if (selected) {
      setSelectedRestaurant(selected);
      setIsFormOpen(true);
    }
  };

  const handleSave = (restaurantData: Partial<Restaurant>) => {
    if (selectedRestaurant) {
      setRestaurants(
        restaurants.map((r) =>
          r.restaurantId === selectedRestaurant.restaurantId
            ? { ...r, ...restaurantData, updatedAt: new Date().toISOString() }
            : r
        )
      );
    } else {
      const newRestaurant: Restaurant = {
        RestaurantId: restaurants.length + 1,
        CategoryId: restaurantData.CategoryId || 0,
        UserId: restaurantData.UserId || undefined,
        RestaurantName: restaurantData.RestaurantName || "",
        RestaurantEmail: restaurantData.RestaurantEmail || "",
        RestaurantPhone: restaurantData.RestaurantPhone || "",
        RestaurantAddress: restaurantData.RestaurantAddress || "",
        UserTypeName: restaurantData.UserTypeName || "",
        restaurantId: function (restaurantId: any): void {
          throw new Error('Function not implemented.');
        },
        FullName: '',
        Email: '',
        Password: '',
        PhoneNumber: ''
      };

      setRestaurants([...restaurants, newRestaurant]);
    }
  };

  const handleDelete = (RestaurantId: number) => {
    setRestaurants(restaurants.filter((r) => r.RestaurantId !== RestaurantId));
  };

  return (
    <DashboardLayout title="Restaurants">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">إدارة المطاعم</h2>
          <p className="text-gray-500">Manage restaurants that contribute surplus food</p>
        </div>
        <Button onClick={handleOpenForm} className="button-blue">
          <Plus className="mr-2 h-4 w-4" />
          إضافة مطعم
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
