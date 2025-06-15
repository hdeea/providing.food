
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { VoucherIssuance } from '../../types/individual';
import { formatDateTime } from '../../utils/helpers';
import { Ticket, QrCode } from 'lucide-react';
import QRCode from "react-qr-code";

interface VouchersListProps {
  vouchers: VoucherIssuance[];
}

const VouchersList: React.FC<VouchersListProps> = ({ vouchers }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            نشط
          </Badge>
        );
      case 'used':
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            مستخدم
          </Badge>
        );
      case 'expired':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            منتهي الصلاحية
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ticket className="w-5 h-5" />
          السندات الغذائية ({vouchers.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {vouchers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Ticket className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>لا توجد سندات غذائية</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم السند</TableHead>
                  <TableHead>المستفيد</TableHead>
                  <TableHead>المطعم</TableHead>
                  <TableHead>عدد الوجبات</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>تاريخ الإصدار</TableHead>
                  <TableHead>صالح حتى</TableHead>
                  <TableHead>QR Code</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vouchers.map((voucher) => (
                  <TableRow key={voucher.id}>
                    <TableCell className="font-medium">{voucher.id}</TableCell>
                    <TableCell>{voucher.beneficiaryId}</TableCell>
                    <TableCell>{voucher.restaurantId}</TableCell>
                    <TableCell>{voucher.mealCount} وجبات</TableCell>
                    <TableCell>{getStatusBadge(voucher.status)}</TableCell>
                    <TableCell>{formatDateTime(voucher.createdAt)}</TableCell>
                    <TableCell>{formatDateTime(voucher.validUntil)}</TableCell>
                    <TableCell>
<div className="flex justify-center">
  <QRCode value={voucher.qrCode} size={256} />
</div>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VouchersList;
