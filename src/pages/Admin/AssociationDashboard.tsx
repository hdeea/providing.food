import React, { useState } from 'react';
 import DashboardLayout from '../../components/Layout/DashboardLayout'; 
import VoucherIssuanceForm from '../../components/forms/VoucherIssuanceForm';
  import VouchersList from '../../components/Vouchers/VouchersList';
   import QRScanner from '../../components/Scanner/QRScanner';
    import VoucherDetails from '../../components/Scanner/VoucherDetails';
 import IndividualRequestsTable from '../../components/Individual/IndividualRequestsTable';
 import IndividualDonorsTable from '../../components/Individual/IndividualDonorsTable'; 
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; 
 import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
  import { useToast } from '@/hooks/use-toast';
   import { VoucherIssuance, HelpRequest, IndividualDonor } from '../../types/individual';
    import { Heart, Ticket, Users, ScanQrCode, UserPlus } from 'lucide-react';
import { createFoodBond } from '@/api/createFoodBond';



const AssociationDashboard: React.FC = () => {

const [vouchers, setVouchers] = useState<VoucherIssuance[]>([]);
const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([]);
const [donors, setDonors] = useState<IndividualDonor[]>([]); 
const [scannedVoucher, setScannedVoucher] = useState<VoucherIssuance | null>(null);
const { toast } = useToast(); 

const handleVoucherIssued = async (voucher) => {
    try {
        const createdVoucher = await createFoodBond(voucher);
        setVouchers((prev) => [createdVoucher, ...prev]);
    } catch (error) {
        console.error("❌ فشل إنشاء السند:", error);
    }
};

const handleHelpRequestStatusChange = 
(requestId: string, newStatus: 'approved' | 'rejected') =>
   { setHelpRequests(prev => prev.map(request => request.id === requestId ? { ...request, status: newStatus, reviewedAt: new Date().toISOString(), notes: newStatus === 'approved' ? 'Request approved' : 'Request rejected' } : request ) ); toast({ title: newStatus === 'approved' ? "Help request approved" : "Help request rejected", description: `Request ${requestId} status updated`, });
 };
  const handleDonorStatusChange = (donorId: string, newStatus: 'approved' | 'rejected') => { setDonors(prev => prev.map(donor => donor.id === donorId ? { ...donor, status: newStatus, reviewedAt: new Date().toISOString(), notes: newStatus === 'approved' ? 'Donation request approved' : 'Donation request rejected' } : donor ) ); toast({ title: newStatus === 'approved' ? "Donation request approved" : "Donation request rejected", description: `Donation request ${donorId} status updated`, }); 
  };
   return (
     <DashboardLayout title="Association Dashboard">
       <div className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6"> 
          <Card>
             <CardContent className="p-6">
               <div className="flex items-center">
                 <Ticket className="h-8 w-8 text-blue-600" /> 
                 <div className="ml-4"> 
                  <p className="text-sm font-medium text-gray-600">
                    Total Vouchers
                    </p>
                     <p className="text-2xl font-bold text-gray-900">
                      {vouchers.length}
                      </p>
                       </div>
                        </div>
                         </CardContent>
                          </Card>
                           <Card> 
                            <CardContent className="p-6">
                               <div className="flex items-center">
                                 <Users className="h-8 w-8 text-green-600" />
                                  <div className="ml-4">
                                     <p className="text-sm font-medium text-gray-600">
                                      Help Requests
                                      </p>
                                       <p className="text-2xl font-bold text-gray-900">
                                        {helpRequests.length}
                                        </p> 
                                        </div>
                                         </div>
                                          </CardContent>
                                           </Card>
                                            <Card>
                                               <CardContent className="p-6">
                                                 <div className="flex items-center"> 
                                                  <Heart className="h-8 w-8 text-red-600" />
                                                   <div className="ml-4"> 
                                                    <p className="text-sm font-medium text-gray-600">
                                                      Donation Requests
                                                      </p>
                                                       <p className="text-2xl font-bold text-gray-900">
                                                        {donors.length}
                                                        </p>
                                                         </div>
                                                          </div>
                                                           </CardContent>
                                                            </Card>
                                                             <Card>
                    <CardContent className="p-6">
            <div className="flex items-center">
    <UserPlus className="h-8 w-8 text-purple-600" />
     <div className="ml-4">
       <p className="text-sm font-medium text-gray-600">Pending Reviews</p> <p className="text-2xl font-bold text-gray-900"> {[...helpRequests, ...donors].filter(r => r.status === 'pending').length} </p> 
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
                         <Heart className="w-4 h-4" />
                          Donation Requests
                           </TabsTrigger>
                           </TabsList> 
                         <TabsContent value="help-requests">
                           <IndividualRequestsTable requests={helpRequests} onStatusChange={handleHelpRequestStatusChange} /> 
                           </TabsContent> 
                           <TabsContent value="donations">
                             <IndividualDonorsTable donors={donors} onStatusChange={handleDonorStatusChange} />
                              </TabsContent>
                               <TabsContent value="vouchers" className="space-y-6">
                                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-1"> 

<VoucherIssuanceForm onVoucherIssued={handleVoucherIssued} /> 
</div>
 <div className="lg:col-span-2">
   <VouchersList vouchers={vouchers} /> 
 </div>
  </div>
   </TabsContent>
   </Tabs>
    </div>
     </DashboardLayout> 
    ); 
  };
     export default AssociationDashboard;