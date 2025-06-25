import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { Heart, User, Mail, Utensils, MapPin, Search, Camera, LogIn, UserPlus } from 'lucide-react';
import CreateAccountForm from '../../components/Individual/CreateAccountForm';
import { postDonationIndividual } from '@/api/postDonationIndividual';
import { DonationIndividualDto } from '@/types/individual';


const donorSchema = z.object({
  foodName: z.string().min(1, 'Food name is required'),
  userType: z.string().min(1, 'User type is required'),
  address: z.string().min(1, 'Address is required'),
  vegetarian: z.boolean(),
  email: z.string().email('Invalid email address'),
description: z.string().min(1, 'Description is required'),  // أضفنا هذا
 foodImage: z.string().min(1, 'Food image is required'),
});

type FormData = z.infer<typeof donorSchema>;


const DonorRegistrationPage: React.FC = () => {
  // الحالة لإظهار/إخفاء صفحة إنشاء الحساب
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  // حالة إرسال النموذج
  const [isSubmitting, setIsSubmitting] = useState(false);

  // حالة فورم الريأكت هوك فورم
  const form = useForm<FormData>({
    resolver: zodResolver(donorSchema),
    defaultValues: {
      foodName: '',
      userType: '',
      address: '',
      vegetarian: false,
      email: '',
      foodImage: '',
    },
  });

  // دالة رفع الصورة وتحويلها إلى Base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
   reader.onloadend = () => {
  form.setValue('foodImage', reader.result as string, { shouldValidate: true });
};

    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      const payload: DonationIndividualDto = {
        foodName: data.foodName,
        userType: data.userType,
        description: data.description,
        image: data.foodImage || "",
        country: data.address,
        vegetarian: data.vegetarian,
        userEmail: data.email,
        status: 'Pending',

        requesId: 0,
        foodId: 0
      };

      await postDonationIndividual(payload);

      form.reset();  // هنا تستخدم reset من useForm

      toast({
        title: "تم إرسال طلب التبرع بنجاح",
        description: "تم إرسال طلبك إلى الجمعية.",
      });
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "حدث خطأ أثناء إرسال الطلب.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showCreateAccount) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Food Donation</h1>
            <p className="text-gray-600">Create Your Account</p>
          </div>
          <CreateAccountForm onClose={() => setShowCreateAccount(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Food Donation</h1>
          <p className="text-gray-600">Create Donation Request</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 text-center">
          <a 
            href="/individual/track-donations" 
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Search className="w-4 h-4" />
            Track Your Request
          </a>
        </div>

        {/* Account Actions */}
        <div className="mb-8 flex gap-4 justify-center">
          <Button 
            onClick={() => setShowCreateAccount(true)} 
            className="bg-green-600 hover:bg-green-700"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Create Account
          </Button>
          <Link to="/login">
            <Button variant="outline">
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          </Link>
        </div>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">New Donation Request</CardTitle>
            <CardDescription className="text-center">
              Fill in the following information to send a donation request to the association
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="foodName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Utensils className="w-4 h-4" />
                        Food Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Rice with Chicken, Pasta, Sandwiches" {...field} />
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
                      <FormLabel className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        User Type
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Individual" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Address
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="City, Area, Street" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

               <FormField
  control={form.control}
  name="vegetarian"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Is the food vegetarian?</FormLabel>
      <FormControl>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="true"
              checked={field.value === true}
              onChange={() => field.onChange(true)}
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="false"
              checked={field.value === false}
              onChange={() => field.onChange(false)}
            />
            No
          </label>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
<FormField
  control={form.control}
  name="description"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="flex items-center gap-2">
        <Utensils className="w-4 h-4" />
        Description
      </FormLabel>
      <FormControl>
        <Input placeholder="Write details about the food..." {...field} />
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
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="example@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Camera className="w-4 h-4" />
                    Food Image
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label 
                      htmlFor="food-image" 
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> food image
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG</p>
                      </div>
                      <input 
                        id="food-image" 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  {form.watch('foodImage') && (
                    <div className="mt-2">
                      <img 
                        src={form.watch('foodImage')} 
                        alt="Food preview" 
                        className="max-w-32 h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Donation Request"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            We will contact you within 24 hours after reviewing and accepting your request
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonorRegistrationPage;
