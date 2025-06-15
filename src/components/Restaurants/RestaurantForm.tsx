
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Restaurant } from '../../types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useToast } from '@/hooks/use-toast';

interface RestaurantFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (restaurant: Partial<Restaurant>) => void;
  initialData?: Restaurant;
}

const restaurantSchema = z.object({
  ownerName: z.string().min(1, 'Owner name is required'),
  ownerPhone: z.string().min(1, 'Owner phone is required'),
  ownerEmail: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  restaurantName: z.string().min(1, 'Restaurant name is required'),
  restaurantPhone: z.string().min(1, 'Restaurant phone is required'),
  restaurantEmail: z.string().email('Invalid email format'),
  address: z.string().min(1, 'Address is required'),
  category: z.string().min(1, 'Category is required'),
   userType: z.string().min(1, 'User type is required'),
});

type FormData = z.infer<typeof restaurantSchema>;

const RestaurantForm: React.FC<RestaurantFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: initialData || {
      ownerName: '',
      ownerPhone: '',
      ownerEmail: '',
      password: '',
      restaurantName: '',
      userType: '',
      restaurantPhone: '',
      restaurantEmail: '',
      address: '',
      category: '',
      
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      // In a real application, you would send this to an API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      
      onSave(data);
      form.reset();
      
      toast({
        title: initialData ? "Restaurant updated" : "Restaurant added",
        description: `${data.restaurantName} has been ${initialData ? "updated" : "added"} successfully.`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your request.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Restaurant' : 'Add Restaurant'}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? 'Update restaurant information below'
              : 'Fill in restaurant details to add a new restaurant'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ownerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="ownerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+961 71 123 456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="ownerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="owner@restaurant.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="restaurantName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Restaurant Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Delicious Cuisine" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

                <FormField
                            control={form.control}
                            name="userType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>User Type</FormLabel>
                                <FormControl>
                                  <Input placeholder="Restaurant" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
              
              <FormField
                control={form.control}
                name="restaurantPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Restaurant Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+961 1 123 456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="restaurantEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Restaurant Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="info@restaurant.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Lebanese, Italian, etc " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="button-blue" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : initialData ? "Update" : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RestaurantForm;
