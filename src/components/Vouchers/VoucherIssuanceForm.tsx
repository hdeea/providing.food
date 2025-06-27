
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { VoucherIssuance } from '../../types/individual';
import { Gift } from 'lucide-react';
import { createFoodBond } from '@/api/foodVoucher/createVoucher';
import { fetchAllFoodVouchers } from '@/api/foodVoucher/getAllVouchers';
import { VoucherRequest } from '../../types/individual';

const voucherSchema = z.object({
  beneficiaryName: z.string().min(1, 'Beneficiary name is required'),
  restaurantName: z.string().min(1, 'Restaurant name is required'),
  mealCount: z.coerce.number().min(1, 'Number of meals must be greater than 0'),
  expireDate: z.string().refine((val) => !isNaN(Date.parse(val)),{
    message: "تاريخ غير صالح",
  }),
});


type FormData = z.infer<typeof voucherSchema>;

interface VoucherIssuanceFormProps {
  onVoucherIssued: (voucher: VoucherIssuance) => void;
}

const VoucherIssuanceForm: React.FC<VoucherIssuanceFormProps> = ({ onVoucherIssued }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(voucherSchema),
    defaultValues: {
      beneficiaryName: '',
      restaurantName: '',
      mealCount: 5,
      expireDate: '',
    },
  });
const onSubmit = async (data: FormData) => {
  try {
    setIsSubmitting(true);

const newVoucher: VoucherRequest = {
  beneficiaryName: data.beneficiaryName,
  restaurantName: data.restaurantName,
  numberOfMeals: data.mealCount,
  expiryDate: data.expireDate,
};

console.log("📦 بيانات السند المرسلة:", newVoucher);

    const createdVoucher = await createFoodBond(newVoucher); 
    onVoucherIssued(createdVoucher);
    form.reset();

    toast({
      title: "Voucher issued successfully",
      description: `Food voucher issued for ${data.beneficiaryName} with
       ${data.mealCount} meals valid for ${data.expireDate} hours`,
    });

  } 
catch (error) {
  console.error("خطأ بالتفاصيل:", error); 
  toast({
    title: "Error",
    description: "An error occurred while issuing the voucher",
    variant: "destructive",
  });
}
  finally {
    setIsSubmitting(false);
  }
};

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="w-5 h-5" />
         إصدار سند غذائي جديد
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="beneficiaryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم المستفيد</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter beneficiary name" {...field} />
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
                  <FormLabel>اسم المطعم</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter restaurant name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mealCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عدد الوجبات</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1" 
                      placeholder="Number of meals"
                      {...field}
                      value={field.value.toString()}
                      onChange={(e) => field.onChange(e.target.valueAsNumber || 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

        <FormField
  control={form.control}
  name="expireDate"
  render={({ field }) => (
    <FormItem>
      <FormLabel>صالح لغاية</FormLabel>
      <FormControl>
        <Input
          type="date"
          placeholder="YYYY-MM-DD"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

            <Button 
              type="submit" 
              className="w-full button-blue" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Issuing..." : "Issue Voucher"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VoucherIssuanceForm;
