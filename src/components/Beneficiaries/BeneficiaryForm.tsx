import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Beneficiary } from '../../types';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { postBeneficiary } from '@/api/postBeneficiary';
import { updateBeneficiary } from '@/api/updateBeneficiary';

interface BeneficiaryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (beneficiary: Partial<Beneficiary>) => void;
  initialData?: Beneficiary;
}

const beneficiarySchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  familySize: z.coerce.number().min(1, 'Family size must be at least 1'),
  isActive: z.boolean(),
});

type FormData = z.infer<typeof beneficiarySchema>;

const BeneficiaryForm: React.FC<BeneficiaryFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(beneficiarySchema),
defaultValues: {
  fullName: initialData?.fullName || '',
  phoneNumber: initialData?.phoneNumber || '',
  familySize: initialData?.familySize || 1,
  isActive: initialData?.isActive ?? true,
},

  });
const onSubmit = async (data: FormData) => {
  try {
    setIsSubmitting(true);

    if (initialData) {
      // تعديل
      await updateBeneficiary({ ...data, beneficiaryId: initialData.beneficiaryId });
      toast({
        title: 'Beneficiary updated',
        description: `${data.fullName} has been updated successfully.`,
      });
    } else {
      // إضافة
      await postBeneficiary(data as Beneficiary);
      toast({
        title: 'Beneficiary added',
        description: `${data.fullName} has been added successfully.`,
      });
    }

    form.reset();
    onClose();
  } catch (error) {
    toast({
      title: 'Error',
      description: 'An error occurred while saving the beneficiary.',
      variant: 'destructive',
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Beneficiary' : 'Add Beneficiary'}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? 'Update beneficiary information below'
              : 'Fill in beneficiary details to add a new beneficiary'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <Input placeholder="+966 76 123 456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="familySize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family Size</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder="Number of family members"
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
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is Active</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === 'true')}
                    defaultValue={field.value ? 'true' : 'false'}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">True</SelectItem>
                      <SelectItem value="false">False</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : initialData ? 'Update' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BeneficiaryForm;
