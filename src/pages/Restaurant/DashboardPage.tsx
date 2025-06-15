
import React, { useState } from 'react';
import { Plus, ScanQrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import DonationForm from '../../components/Donations/DonationForm';
import DonationsList from '../../components/Donations/DonationsList';
import QRScanner from '../../components/Scanner/QRScanner';
import VoucherDetails from '../../components/Scanner/VoucherDetails';
import { DonationRequest } from '../../types';
import { VoucherIssuance } from '../../types/individual';
import { mockDonationRequests } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState<DonationRequest[]>(mockDonationRequests);
  const [isDonationFormOpen, setIsDonationFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('donations');
  const [scannedVoucher, setScannedVoucher] = useState<VoucherIssuance | null>(null);

  const handleDonationSave = (donationData: Partial<DonationRequest>) => {
    const newDonation: DonationRequest = {
      id: `${donations.length + 1}`,
      restaurantId: donationData.restaurantId || '1',
      quantity: donationData.quantity || 0,
      description: donationData.description,
      pickupDateTime: donationData.pickupDateTime || new Date().toISOString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    setDonations([newDonation, ...donations]);
  };

  const handleScan = (qrData: string) => {
    // In a real app, you would verify the QR code with the backend
    // For demo purposes, we'll just show a mock voucher
    const mockVoucher: VoucherIssuance = {
      id: qrData,
      beneficiaryId: '1',
      restaurantId: '1',
      issuedBy: 'admin',
      mealCount: Math.floor(Math.random() * 5) + 1,
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      qrCode: qrData,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    
    setScannedVoucher(mockVoucher);
  };

  const resetScanner = () => {
    setScannedVoucher(null);
  };

  const handleVoucherProcessed = () => {
    if (scannedVoucher) {
      // Update voucher status to used
      setScannedVoucher({
        ...scannedVoucher,
        status: 'used'
      });
    }
  };

  return (
    <DashboardLayout title="Restaurant Dashboard">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="scanner">QR Scanner</TabsTrigger>
        </TabsList>
        
        <TabsContent value="donations" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Food Donations</h2>
              <p className="text-gray-500">Manage food donation requests</p>
            </div>
            <Button onClick={() => setIsDonationFormOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              New Donation
            </Button>
          </div>
          
          <DonationsList donations={donations} />
          
          {isDonationFormOpen && (
            <DonationForm
              isOpen={isDonationFormOpen}
              onClose={() => setIsDonationFormOpen(false)}
              onSave={handleDonationSave}
              restaurantId="1"
            />
          )}
        </TabsContent>
        
        <TabsContent value="scanner" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">QR Voucher Scanner</h2>
              <p className="text-gray-500">Scan food vouchers for beneficiaries</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow">
            {scannedVoucher ? (
              <VoucherDetails 
                voucher={scannedVoucher} 
                onProcessed={handleVoucherProcessed}
                onCancel={resetScanner} 
              />
            ) : (
              <QRScanner onScan={handleScan} />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default DashboardPage;
