
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, CheckCircle, XCircle, Heart, Phone, MapPin, Mail, DollarSign, Utensils } from 'lucide-react';
import { mockIndividualDonors } from '../../data/individualMockData';
import { IndividualDonor } from '../../types/FoodBond';
import { formatDateTime } from '../../utils/helpers';

const trackSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
});

type FormData = z.infer<typeof trackSchema>;

const DonationTrackingPage: React.FC = () => {
  const [donations, setDonations] = useState<IndividualDonor[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(trackSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSearching(true);
      setHasSearched(true);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Filter mock data by email
      const userDonations = mockIndividualDonors.filter(
        donor => donor.email.toLowerCase() === data.email.toLowerCase()
      );
      
      setDonations(userDonations);
      
    } catch (error) {
      console.error('Error searching donations:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            مقبول
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            مرفوض
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            قيد المراجعة
          </Badge>
        );
    }
  };

  const getDonationTypeIcon = (type: string) => {
    switch (type) {
      case 'money':
        return <DollarSign className="w-4 h-4" />;
      case 'food':
        return <Utensils className="w-4 h-4" />;
      case 'both':
        return <Heart className="w-4 h-4" />;
      default:
        return <Heart className="w-4 h-4" />;
    }
  };

  const getDonationTypeLabel = (type: string) => {
    switch (type) {
      case 'money':
        return 'تبرع نقدي';
      case 'food':
        return 'تبرع بالطعام';
      case 'both':
        return 'تبرع نقدي وطعام';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Providing Food</h1>
          <p className="text-gray-600">تتبع طلبات التبرع</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-center">تتبع طلبات التبرع</CardTitle>
            <CardDescription className="text-center">
              أدخل بريدك الإلكتروني لعرض جميع طلبات التبرع وحالتها
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="أدخل بريدك الإلكتروني"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSearching} className="bg-blue-600 hover:bg-blue-700">
                  <Search className="w-4 h-4 mr-2" />
                  {isSearching ? "البحث..." : "بحث"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Results */}
        {hasSearched && (
          <div>
            {donations.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">لا توجد طلبات تبرع مرتبطة بهذا البريد الإلكتروني</p>
                  <p className="text-sm text-gray-400 mt-2">
                    تأكد من صحة البريد الإلكتروني أو 
                    <a href="/individual/donor-registration" className="text-blue-600 hover:underline mx-1">
                      قدم طلب تبرع جديد
                    </a>
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">
                  طلبات التبرع ({donations.length})
                </h2>
                {donations.map((donation) => (
                  <Card key={donation.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{donation.name}</h3>
                          <p className="text-sm text-gray-500">
                            رقم الطلب: {donation.id}
                          </p>
                        </div>
                        {getStatusBadge(donation.status)}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{donation.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{donation.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{donation.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getDonationTypeIcon(donation.donationType)}
                          <span className="text-sm">{getDonationTypeLabel(donation.donationType)}</span>
                        </div>
                      </div>
                      
                      {donation.amount && (
                        <div className="mb-2">
                          <span className="font-medium">المبلغ:</span>
                          <span className="ml-2">{donation.amount} ريال سعودي</span>
                        </div>
                      )}
                      
                      {donation.foodDescription && (
                        <div className="mb-4">
                          <span className="font-medium">وصف الطعام:</span>
                          <p className="mt-1 text-gray-700">{donation.foodDescription}</p>
                        </div>
                      )}
                      
                      <div className="mb-4">
                        <span className="font-medium">تاريخ الطلب:</span>
                        <span className="ml-2">{formatDateTime(donation.createdAt)}</span>
                      </div>
                      
                      {donation.reviewedAt && (
                        <div className="pt-4 border-t">
                          <span className="font-medium">تاريخ المراجعة:</span>
                          <span className="ml-2">{formatDateTime(donation.reviewedAt)}</span>
                          {donation.notes && (
                            <div className="mt-2">
                              <span className="font-medium">ملاحظات:</span>
                              <p className="mt-1 text-gray-700">{donation.notes}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {!hasSearched && (
          <div className="text-center text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>أدخل بريدك الإلكتروني للبحث عن طلبات التبرع</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationTrackingPage;
