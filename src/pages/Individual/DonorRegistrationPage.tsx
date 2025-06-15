
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
import { useToast } from '@/hooks/use-toast';
import { IndividualDonor } from '../../types/FoodBond';
import { Heart, User, Mail, Utensils, MapPin, Search, Camera, LogIn, UserPlus } from 'lucide-react';
import CreateAccountForm from '../../components/Individual/CreateAccountForm';

const donorSchema = z.object({
  foodName: z.string().min(1, 'Food name is required'),
  userType: z.string().min(1, 'User type is required'),
  address: z.string().min(1, 'Address is required'),
  vegetarian: z.boolean().default(false),
  email: z.string().email('Invalid email address'),
  foodImage: z.string().optional(),
});

type FormData = z.infer<typeof donorSchema>;

const DonorRegistrationPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const { toast } = useToast();

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        form.setValue('foodImage', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const newDonor: IndividualDonor = {
        id: `DONOR_${Date.now()}`,
        name: data.userType,
        email: data.email,
        phone: '',
        address: data.address,
        donationType: 'food',
        foodDescription: `${data.foodName} ${data.vegetarian ? '(Vegetarian)' : ''}`,
        status: 'pending',
        totalDonations: 0,
        createdAt: new Date().toISOString(),
      };
      
      console.log('New donor registered:', newDonor);
      
      form.reset();
      
      toast({
        title: "Donation request submitted successfully",
        description: "Your request has been sent to the association. We will contact you soon after reviewing your request.",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while sending the request. Please try again.",
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

        {/* Account Actions - Fixed login redirect */}
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
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Vegetarian Food
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Check this if the food is vegetarian
                        </p>
                      </div>
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
