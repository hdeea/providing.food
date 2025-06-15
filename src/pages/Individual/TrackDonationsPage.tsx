import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { IndividualDonor } from '../../types/FoodBond';
import { Search, Heart, User, Mail, Phone, MapPin, Calendar, FileText } from 'lucide-react';

const trackSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type FormData = z.infer<typeof trackSchema>;

const TrackDonationsPage: React.FC = () => {
  const [donations, setDonations] = useState<IndividualDonor[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(trackSchema),
    defaultValues: {
      email: '',
    },
  });

  const individualDonors: IndividualDonor[] = []; // حذف البيانات الوهمية

  const onSubmit = async (data: FormData) => {
    try {
      setIsSearching(true);
      setHasSearched(true);
      
      // محاكاة استعلام API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // تصفية البيانات بناءً على البريد الإلكتروني
      const userDonations = individualDonors.filter(
        donor => donor.email.toLowerCase() === data.email.toLowerCase()
      );
      
      setDonations(userDonations);
      
      if (userDonations.length === 0) {
        toast({
          title: "No donations found",
          description: "No donation requests found for this email address.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Donations found",
          description: `Found ${userDonations.length} donation request(s) for this email.`,
        });
      }
      
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while searching. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Donations</h1>
          <p className="text-gray-600">Enter your email to view all your donation requests</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-center">Find Your Donation Requests</CardTitle>
            <CardDescription className="text-center">
              Enter the email address you used when submitting donation requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        <Input 
                          type="email" 
                          placeholder="example@email.com" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  disabled={isSearching}
                >
                  <Search className="w-4 h-4 mr-2" />
                  {isSearching ? "Searching..." : "Search Donations"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {hasSearched && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Donation Requests {donations.length > 0 && `(${donations.length})`}
            </h2>

            {donations.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No donations found</h3>
                  <p className="text-gray-500">
                    No donation requests found for this email address. Make sure you entered the correct email.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {donations.map((donation) => (
                  <Card key={donation.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Heart className="w-5 h-5" />
                            Request #{donation.id}
                          </CardTitle>
                          <CardDescription>
                            Submitted on {new Date(donation.createdAt).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        {getStatusBadge(donation.status)}
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackDonationsPage;
