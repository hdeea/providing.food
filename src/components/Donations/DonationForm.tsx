
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DonationRequest } from '../../types';
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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface DonationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (donation: Partial<DonationRequest>) => void;
  restaurantId: string;
}

const donationSchema = z.object({
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
  description: z.string().optional(),
  pickupDateTime: z.string().min(1, 'Donation date is required'),
  restaurantName: z.string().min(1, 'Restaurant name is required'),
  // userType: z.string().min(1, 'User type is required'),
  category: z.enum(['Dessert', 'EasterFood', 'FastFood'], {
    required_error: 'Please select a category',
  }),
});

type FormData = z.infer<typeof donationSchema>;

const DonationForm: React.FC<DonationFormProps> = ({
  isOpen,
  onClose,
  onSave,
  restaurantId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      quantity: 1,
      description: '',
      pickupDateTime: new Date().toISOString().slice(0, 16),
      restaurantName: '',
      // userType: '',
      category: 'FastFood',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      // In a real application, you would send this to an API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      
      const donation: Partial<DonationRequest> = {
        quantity: data.quantity,
        description: data.description,
        pickupDateTime: data.pickupDateTime,
        restaurantId,
        status: 'pending',
      };
      
      onSave(donation);
      
      form.reset();
      
      toast({
        title: "Donation request submitted",
        description: "Your donation request has been submitted for approval.",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your request.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>طلب تبرع</DialogTitle>
          <DialogDescription>
            Fill in the details about the food you wish to donate
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Number of meals"
                      type="number" 
                      min="1"
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
              name="pickupDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Donation Date</FormLabel>
                  <FormControl>
                    <Input 
                      type="date"
                      {...field}
                    />
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
                    <Input placeholder="Enter restaurant name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Restaurant" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Dessert">Dessert</SelectItem>
                      <SelectItem value="EasterFood">Easter Food</SelectItem>
                      <SelectItem value="FastFood">Fast Food</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the food you're donating..."
                      className="resize-none"
                      {...field}
                    />
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
                {isSubmitting ? "Sending..." : "Send"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DonationForm;
