import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import VouchersList from '../../components/Vouchers/VouchersList';
import IndividualRequestsTable from '../../components/Individual/IndividualRequestsTable';
import IndividualDonorsTable from '../../components/Individual/IndividualDonorsTable';
import VoucherIssuanceForm from '../../components/Vouchers/VoucherIssuanceForm';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { VoucherIssuance, HelpRequest, DonationIndividualDto } from '../../types/individual';
import { Heart, Ticket, Users, UserPlus } from 'lucide-react';
import { getIndividualDonations } from '../../api/getDonationIndividuals';
import { updateDonationStatus } from '../../api/updateDonationStatus';

const AssociationDashboard: React.FC = () => {
  const [vouchers, setVouchers] = useState<VoucherIssuance[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([]);
  const [donors, setDonors] = useState<DonationIndividualDto[]>([]);
  const { toast } = useToast();


  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await getIndividualDonations();
        const dataWithId = data.map((item) => ({
          ...item,
          id: item.foodId,
        }));
        setDonors(dataWithId);
      } catch (error) {
        console.error("❌ Failed to fetch individual donations:", error);
      }
    };

    fetchDonations();
  }, []);
  
  const handleDonorStatusChange = async (
  requestId: number, // هذا لازم يكون requesId، مو foodId
  newStatus: 'Approved' | 'Rejected'
) => {
  const donor = donors.find(d => d.requesId === requestId); // صحح البحث

  if (!donor) return;

  try {
    await updateDonationStatus(donor.requesId, newStatus);

    setDonors(prev =>
      prev.map(d =>
        d.requesId === requestId ? { ...d, status: newStatus } : d
      )
    );

    toast({
      title: `تم تحديث الحالة إلى ${newStatus === 'Approved' ? 'مقبول' : 'مرفوض'}`,
    });
  } catch (error) {
    toast({ title: 'فشل في تعديل الحالة', variant: 'destructive' });
  }
};



  function handleHelpRequestStatusChange(requesId: string, newStatus: 'approved' | 'rejected'): void {
    throw new Error('Function not implemented.');
  }

  return (
    <DashboardLayout title="Association Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Ticket className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Vouchers</p>
                  <p className="text-2xl font-bold text-gray-900">{vouchers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Help Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{helpRequests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Donation Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{donors.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <UserPlus className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {[...helpRequests, ...donors].filter(r => r.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="vouchers" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vouchers" className="flex items-center gap-2">
              <Ticket className="w-4 h-4" /> Food Vouchers
            </TabsTrigger>
            <TabsTrigger value="help-requests" className="flex items-center gap-2">
              <Users className="w-4 h-4" /> Help Requests
            </TabsTrigger>
            <TabsTrigger value="donations" className="flex items-center gap-2">
              <Heart className="w-4 h-4" /> Donation Requests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="help-requests">
            <IndividualRequestsTable
              requests={helpRequests}
              onStatusChange={handleHelpRequestStatusChange}
            />
          </TabsContent>

          <TabsContent value="donations">
            <IndividualDonorsTable
              donors={donors}
              onStatusChange={handleDonorStatusChange}
            />
          </TabsContent>
<TabsContent value="vouchers" className="space-y-6">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* القائمة */}
    <div className="lg:col-span-2">
      <VouchersList vouchers={vouchers} />
    </div>

    {/* فورم إصدار سند جديد */}
    <div>
      <VoucherIssuanceForm
        onVoucherIssued={(newVoucher) => {
          setVouchers((prev) => [newVoucher, ...prev]);
        }}
      />
    </div>
  </div>
</TabsContent>

        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AssociationDashboard;
