import React, { useState, useEffect } from 'react';
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
import { updateRestaurant } from '@/api/updateRestaurant';

interface RestaurantFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (restaurant: Partial<Restaurant>) => void;
  initialData?: Restaurant;
}

const restaurantSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  restaurantName: z.string().min(1, 'Restaurant name is required'),
  restaurantEmail: z.string().email('Invalid email format'),
  restaurantPhone: z.string().min(1, 'Restaurant phone is required'),
  restaurantAddress: z.string().min(1, 'Restaurant address is required'),
  userTypeName: z.string().refine(val => ['Resturant', 'Admin', 'User'].includes(val)),
  categoryName: z.string().min(1, 'Category is required'),
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
      fullName: '',
      email: '',
      password: '',
      phoneNumber: '',
      restaurantName: '',
      restaurantEmail: '',
      restaurantPhone: '',
      restaurantAddress: '',
      userTypeName: 'Resturant',
      categoryName: '',
    },
  });
useEffect(() => {
  if (initialData) {
    form.reset({
      userId: initialData?.userId,    
      fullName: initialData.fullName ?? '',
      email: initialData.email ?? '',
      password: '', // كلمة المرور عادة لا ترجع من API فخليها فاضية
      phoneNumber: initialData.phoneNumber ?? '',
      restaurantName: initialData.restaurantName ?? '',
      restaurantEmail: initialData.restaurantEmail ?? '',
      restaurantPhone: initialData.restaurantPhone ?? '',
      restaurantAddress: initialData.address ?? '',  // لاحظ هنا نستخدم address
      userTypeName: initialData.userTypeName ?? 'Resturant',
      categoryName: initialData.categoryName ?? '',
    });
  } else {
    form.reset(); // لو ما في بيانات مبدئياً نظف الفورم
  }
}, [initialData, form]);

const onSubmit = async (data: FormData) => {
  try {
    setIsSubmitting(true);

    if (initialData) {
      const payload = {
        user: {
          userId: initialData.userId!,
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: data.password,
        },
        restaurant: {
          userId: initialData.userId!,
          restaurantName: data.restaurantName,
          restaurantEmail: data.restaurantEmail,
          restaurantPhone: data.restaurantPhone,
          restaurantAddress: data.restaurantAddress,
        },
      };

      console.log("Payload being sent to API:", payload);

      await updateRestaurant(payload);
      toast({
        title: 'تم التعديل',
        description: `${data.restaurantName} تم تعديله بنجاح.`,
      });
    } else {
      await addRestaurant({ ...data } as Restaurant);
      toast({
        title: 'تمت الإضافة',
        description: `${data.restaurantName} تمت إضافته بنجاح.`,
      });
    }

    form.reset();
    onClose();
    onSave(data);
  }
   catch (error) {
    toast({
      title: 'خطأ',
      description: 'حدث خطأ أثناء حفظ بيانات المطعم.',
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
          <DialogTitle>{initialData ? 'Edit Restaurant' : 'Add Restaurant'}</DialogTitle>
          <DialogDescription>
            {initialData
              ? 'Update restaurant information below'
              : 'Fill in restaurant details to add a new restaurant'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* الأمثلة هنا مع camelCase */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+961 71 123 456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
                name="userTypeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Type Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Resturant" {...field} />
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
                name="categoryName"
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
              name="restaurantAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restaurant Address</FormLabel>
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
                {isSubmitting ? 'Processing...' : initialData ? 'Update' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RestaurantForm;
