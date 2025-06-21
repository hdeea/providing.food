
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
import { addRestaurant } from '@/api/addRestaurant';

interface RestaurantFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (restaurant: Partial<Restaurant>) => void;
  initialData?: Restaurant;
}

const restaurantSchema = z.object({
  FullName: z.string().min(1, 'Full name is required'),
  Email: z.string().email('Invalid email format'),
  Password: z.string().min(6, 'Password must be at least 6 characters'),
  PhoneNumber: z.string().min(1, 'Phone number is required'),
  RestaurantName: z.string().min(1, 'Restaurant name is required'),
  RestaurantEmail: z.string().email('Invalid email format'),
RestaurantPhone: z.string().min(1, 'Restaurant phone is required'),
RestaurantAddress: z.string().min(1, 'Restaurant address is required'),
UserTypeName: z.string().refine(val => ['Resturant', 'Admin', 'User'].includes(val)),   
CategoryName: z.string().min(1, 'Category is required'),

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
  defaultValues: {
  FullName: '',
  Email: '',
  Password: '',
  PhoneNumber: '',
  RestaurantName: '',
  RestaurantEmail: '',
  RestaurantPhone: '',
  RestaurantAddress: '',
  UserTypeName: 'Resturant',
  }

  });
  
const onSubmit = async (data: FormData) => { 
   console.log("Inside onSubmit", data);
  try {
    setIsSubmitting(true);
    const result = await addRestaurant(data as Restaurant);

    toast({
      title: 'Restaurant added',
      description: `${data.RestaurantName} has been added successfully.`,
    });

    form.reset();
    onClose();
  } catch (error) {
    toast({
      title: 'Error',
      description: 'There was an error adding the restaurant.',
      variant: 'destructive',
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
                name="FullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> fullName</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="PhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>phoneNumber</FormLabel>
                    <FormControl>
                      <Input placeholder="+961 71 123 456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="owner@restaurant.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="Password"
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
                name="RestaurantName"
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
                            name="UserTypeName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel> userTypeName</FormLabel>
                                <FormControl>
                                  <Input placeholder="Resturant" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
              
              <FormField
                control={form.control}
                name="RestaurantPhone"
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
                name="RestaurantEmail"
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
  name="CategoryName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Category</FormLabel>
      <FormControl>
        <Input placeholder="Fast food" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>    
            </div>
            
            <FormField
              control={form.control}
              name="RestaurantAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> restaurantAddress</FormLabel>
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
