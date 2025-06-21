
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Heart, User, Mail, Phone, Users, AlertCircle } from 'lucide-react';
import { HelpRequest } from '@/types/individual';

const helpRequestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  reason: z.string().min(10, 'Reason must be more detailed'),
  numberOfPeople: z.coerce.number().min(1, 'Number of people must be greater than zero'),
  urgencyLevel: z.enum(['low', 'medium', 'high'], {
    required_error: 'Please select priority level',
  }),
});

type FormData = z.infer<typeof helpRequestSchema>;

const HelpRequestPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(helpRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      reason: '',
      numberOfPeople: 1,
      urgencyLevel: 'medium',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const newRequest: HelpRequest = {
        id: `REQ_${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        reason: data.reason,
        numberOfPeople: data.numberOfPeople,
        urgencyLevel: data.urgencyLevel,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      console.log('New help request submitted:', newRequest);
      
      form.reset();
      
      toast({
        title: "Request submitted successfully",
        description: "Your request will be reviewed and we will respond within 24 hours.",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Providing Food</h1>
          <p className="text-gray-600">Food Assistance Request</p>
        </div>

        {/* Help Request Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">Food Assistance Request</CardTitle>
            <CardDescription className="text-center">
              We are here to help you. Fill out the form and we will contact you soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
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

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="+966xxxxxxxxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="numberOfPeople"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Number of People
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          placeholder="e.g., 4"
                          {...field}
                          value={field.value?.toString() || ''}
                          onChange={(e) => field.onChange(e.target.valueAsNumber || 1)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="urgencyLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Priority Level
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="low" id="low" />
                            <label htmlFor="low" className="cursor-pointer">Normal</label>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="medium" id="medium" />
                            <label htmlFor="medium" className="cursor-pointer">Medium</label>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="high" id="high" />
                            <label htmlFor="high" className="cursor-pointer">Urgent</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Assistance Request</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Explain your circumstances and the reason for needing food assistance..."
                          className="resize-none h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-orange-600 hover:bg-orange-700" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Assistance Request"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Your request will be reviewed within 24 hours and we will contact you via email or phone</p>
        </div>
      </div>
    </div>
  );
};

export default HelpRequestPage;
