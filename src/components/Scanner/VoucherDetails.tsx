
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VoucherIssuance } from '../../types/individual';
import { formatDateTime } from '../../utils/helpers';
import { Ticket, User, Utensils, Calendar, QrCode, CheckCircle, XCircle } from 'lucide-react';

interface VoucherDetailsProps {
  voucher: VoucherIssuance;
  onProcessed: () => void;
  onCancel: () => void;
}

const VoucherDetails: React.FC<VoucherDetailsProps> = ({ voucher, onProcessed, onCancel }) => {
  const isExpired = new Date(voucher.validUntil) < new Date();
  const isUsed = voucher.status === 'used';
  const canProcess = !isExpired && !isUsed;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ticket className="w-6 h-6" />
          Food Voucher Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-green-600" />
            <span className="font-medium">Beneficiary Name:</span>
            <span>{voucher.beneficiaryId}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-orange-600" />
            <span className="font-medium">Restaurant Name:</span>
            <span>{voucher.restaurantId}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-medium">Number of Meals:</span>
            <Badge variant="outline">{voucher.mealCount} meals</Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span className="font-medium">Issue Date:</span>
            <span>{formatDateTime(voucher.createdAt)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-600" />
            <span className="font-medium">Valid Until:</span>
            <span>{new Date(voucher.validUntil).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center gap-2 mb-2">
            <QrCode className="w-5 h-5" />
            <span className="font-medium">QR Code:</span>
          </div>
          <code className="text-sm bg-white p-2 rounded border block">{voucher.qrCode}</code>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">Status:</span>
          {voucher.status === 'active' && (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              <CheckCircle className="w-3 h-3 mr-1" />
              Active
            </Badge>
          )}
          {voucher.status === 'used' && (
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
              Used
            </Badge>
          )}
          {isExpired && (
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
              <XCircle className="w-3 h-3 mr-1" />
              Expired
            </Badge>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          {canProcess ? (
            <Button onClick={onProcessed} className="flex-1 bg-green-600 hover:bg-green-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm Usage
            </Button>
          ) : (
            <div className="flex-1 text-center py-2 text-gray-500">
              {isUsed ? "This voucher has been used" : "Voucher has expired"}
            </div>
          )}
          
          <Button variant="outline" onClick={onCancel} className="flex-1">
            <XCircle className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoucherDetails;
