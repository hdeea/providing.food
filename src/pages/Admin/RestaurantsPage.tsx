
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import RestaurantsTable from '../../components/Restaurants/RestaurantsTable';
import RestaurantForm from '../../components/Restaurants/RestaurantForm';
import { Restaurant } from '../../types';
import { useToast } from '@/hooks/use-toast';
import { getRestaurants } from '@/api/getRestaurant';
import { deleteRestaurant } from '@/api/deleteRestaurant';

const RestaurantsPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | undefined>(undefined);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (error) {
        toast({
          title: 'خطأ في جلب البيانات',
          description: 'فشل في تحميل بيانات المطاعم.',
          variant: 'destructive',
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
const handleEdit = (userId: number) => {
  const selected = restaurants.find(r => r.userId === userId);
  if (selected) {
    setSelectedRestaurant(selected);
    setIsFormOpen(true);
  }
};


  const handleSave = (restaurantData: Partial<Restaurant>) => {
  if (selectedRestaurant) {
    setRestaurants(
      restaurants.map(r =>
        r.userId === selectedRestaurant.userId
          ? { ...r, ...restaurantData }
          : r
      )
    );
    } else {
      const newRestaurant: Restaurant = {
        restaurantId: restaurants.length + 1,
        categoryId: restaurantData.categoryId || 0,
        userId: restaurantData.userId || 0,
        restaurantName: restaurantData.restaurantName || '',
        restaurantEmail: restaurantData.restaurantEmail || '',
        restaurantPhone: restaurantData.restaurantPhone || '',
        restaurantAddress: restaurantData.restaurantAddress || '',
        userTypeName: restaurantData.userTypeName || 'Resturant',
        fullName: restaurantData.fullName || '',
        email: restaurantData.email || '',
        password: restaurantData.password || '',
        phoneNumber: restaurantData.phoneNumber || '',
        isActive: true,
        address: ''
      };
      setRestaurants([...restaurants, newRestaurant]);
    }
  };
  const handleDelete = async (userId: number) => {
  try {
    await deleteRestaurant(userId);  // userId هنا
    setRestaurants(restaurants.filter(r => r.userId !== userId)); // حذف من القائمة بناءً على userId
    toast({
      title: 'تم الحذف',
      description: 'تم حذف المطعم بنجاح.',
    });
  } catch (error) {
    toast({
      title: 'خطأ',
      description: 'فشل حذف المطعم',
      variant: 'destructive',
    });
  }
};



  return (
    <DashboardLayout title="Restaurants">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">إدارة المطاعم</h2>
          <p className="text-gray-500">Manage restaurants that contribute surplus food</p>
        </div>
        <Button onClick={handleOpenForm} className="button-blue">
          <Plus className="mr-2 h-4 w-4" /> إضافة مطعم
        </Button>
      </div>

      <RestaurantsTable restaurants={restaurants} onEdit={handleEdit} onDelete={handleDelete} />

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
