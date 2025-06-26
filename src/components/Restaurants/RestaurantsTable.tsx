import React, { useState } from 'react';
import { Restaurant } from '../../types';
import { Edit, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { formatDate } from '../../utils/helpers';
import { useToast } from '@/hooks/use-toast';

interface RestaurantsTableProps {
  restaurants: Restaurant[];
  onEdit: (restaurantId: number) => void;
  onDelete: (restaurantId: number) => void;
}

const RestaurantsTable: React.FC<RestaurantsTableProps> = ({
  restaurants,
  onEdit,
  onDelete,
}) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();

  const handleDelete = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedRestaurant) {
      onDelete(selectedRestaurant.restaurantId);
      toast({
        title: 'Restaurant deleted',
        description: `${selectedRestaurant.restaurantName} has been removed.`,
      });
      setShowDeleteDialog(false);
    }
  };

  const cancelDelete = () => {
    setSelectedRestaurant(null);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RestaurantId</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant Address</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant Name</th>

              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
   <tbody className="bg-white divide-y divide-gray-200">
  {restaurants.length === 0 && (
    <tr>
      <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
        No restaurants found
      </td>
    </tr>
  )}

  {restaurants.length > 0 && restaurants.map((restaurant) => (
    <tr key={restaurant.restaurantId} className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm font-medium text-gray-900">{restaurant.restaurantId}</td>
      <td className="px-6 py-4 text-sm text-gray-500">{restaurant.restaurantPhone}</td>
      <td className="px-6 py-4 text-sm text-gray-500">{restaurant.restaurantEmail}</td>
      <td className="px-6 py-4 text-sm text-gray-500">{restaurant.categoryName}</td>
      <td className="px-6 py-4 text-sm text-gray-500">{restaurant.address}</td>
      <td className="px-6 py-4 text-sm text-gray-500">Active</td> {/* أو حط حسب بياناتك */}
      <td className="px-6 py-4 text-sm text-gray-500">{restaurant.restaurantName}</td>
      <td className="px-6 py-4 text-right text-sm font-medium">
        <div className="flex justify-end gap-2">
          <Button
           size="sm"
            variant="ghost"
    onClick={() => onEdit(restaurant.userId)}
              className="text-brand-blue hover:text-brand-blue hover:bg-blue-50"
              >
            <Edit size={16} />
          </Button>
          <Button 
          size="sm" 
          variant="ghost" 
           onClick={() => onDelete(restaurant.userId!)}  
            className="text-red-500 hover:text-red-700 hover:bg-red-50">
            <Trash2 size={16} />
          </Button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </>
  );
};

export default RestaurantsTable;
