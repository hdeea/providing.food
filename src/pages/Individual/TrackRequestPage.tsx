import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, CheckCircle, XCircle, Heart } from 'lucide-react';
import { formatDateTime } from '../../utils/helpers';
import { HelpRequest } from '@/types/individual';

const trackSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
});

type FormData = z.infer<typeof trackSchema>;

const TrackRequestPage: React.FC = () => {
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(trackSchema),
    defaultValues: {
      email: '',
    },
  });

  const helpRequests: HelpRequest[] = []; // حذف البيانات الوهمية

  const onSubmit = async (data: FormData) => {
    try {
      setIsSearching(true);
      setHasSearched(true);
      
      // محاكاة استعلام API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // تصفية البيانات بناءً على البريد الإلكتروني
      const userRequests = helpRequests.filter(
        req => req.email.toLowerCase() === data.email.toLowerCase()
      );
      
      setRequests(userRequests);
      
    } catch (error) {
      console.error('Error searching requests:', error);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Providing Food</h1>
          <p className="text-gray-600">تتبع طلبات المساعدة الغذائية</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-center">تتبع طلباتك</CardTitle>
            <CardDescription className="text-center">
              أدخل بريدك الإلكتروني لعرض جميع طلباتك وحالتها
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

        {hasSearched && (
          <div>
            {requests.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">لا توجد طلبات مرتبطة بهذا البريد الإلكتروني</p>
                  <p className="text-sm text-gray-400 mt-2">
                    تأكد من صحة البريد الإلكتروني أو 
                    <a href="/individual/help-request" className="text-blue-600 hover:underline mx-1">
                      قدم طلباً جديداً
                    </a>
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">
                  طلباتك ({requests.length})
                </h2>
                {requests.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{request.name}</h3>
                          <p className="text-sm text-gray-500">
                            رقم الطلب: {request.id}
                          </p>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="font-medium">عدد الأفراد:</span>
                          <span className="ml-2">{request.numberOfPeople} أشخاص</span>
                        </div>
                        <div>
                          <span className="font-medium">تاريخ الطلب:</span>
                          <span className="ml-2">{formatDateTime(request.createdAt)}</span>
                        </div>
                      </div>
                    </CardContent>
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

export default TrackRequestPage;
