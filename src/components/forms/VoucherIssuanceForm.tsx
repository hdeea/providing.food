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

interface FoodBondResponse {
  BondId: number;
  QRCode: string;
  Message: string;
}

const voucherSchema = z.object({
  beneficiaryName: z.string().min(1, "اسم المستفيد مطلوب"),
  restaurantName: z.string().min(1, "اسم المطعم مطلوب"),
  numberOfMeals: z.number().min(1, "يجب أن تكون عدد الوجبات أكبر من صفر"),
  expiryDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "التاريخ غير صالح"
  }),
});

type FormData = z.infer<typeof voucherSchema>;

interface VoucherIssuanceFormProps {
  onVoucherIssued: (voucher: FoodBondResponse) => void;
}


const VoucherIssuanceForm: React.FC<VoucherIssuanceFormProps> = ({ onVoucherIssued }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(voucherSchema),
    defaultValues: {
      beneficiaryName: '',
      restaurantName: '',
      numberOfMeals: 5,
      expiryDate: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      const payload = {
        BeneficiaryName: data.beneficiaryName,
        RestaurantName: data.restaurantName,
        NumberOfMeals: data.numberOfMeals,
        ExpiryDate: new Date(data.expiryDate).toISOString(),
      };

      const response = await fetch('', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.Error || 'خطأ في إصدار السند');
      }

const result: FoodBondResponse = await response.json();

      toast({
        title: "تم إصدار السند بنجاح",
        description: `تم إنشاء السند برقم ${result.BondId} ورمز QR ${result.QRCode}`,
      });

      form.reset();

      if (onVoucherIssued) {
        onVoucherIssued(result);
      }
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء إصدار السند",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="w-5 h-5" />
          إصدار سند طعام جديد
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
                    <Input placeholder="أدخل اسم المستفيد" {...field} />
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
                    <Input placeholder="أدخل اسم المطعم" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfMeals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عدد الوجبات</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="عدد الوجبات"
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
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تاريخ انتهاء الصلاحية</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="اختر تاريخ انتهاء الصلاحية"
                      {...field}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
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
              {isSubmitting ? "جاري الإصدار..." : "إصدار السند"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VoucherIssuanceForm;
