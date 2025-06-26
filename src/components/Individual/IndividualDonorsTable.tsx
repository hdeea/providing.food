import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DonationIndividualDto } from '../../types/individual';
import { Heart, CheckCircle, XCircle, Clock } from 'lucide-react';

interface IndividualDonorsTableProps {
  donors: DonationIndividualDto[];
  onStatusChange: (donorId: number, newStatus: 'Approved' | 'Rejected') => void;
}


const IndividualDonorsTable: React.FC<IndividualDonorsTableProps> = ({ donors, onStatusChange }) => {

  const getStatusBadge = (status: string) => {
    const capitalStatus = status.charAt(0).toUpperCase() + status.slice(1);
    switch (capitalStatus) {
      case 'Approved':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            مقبول
          </Badge>
        );
      case 'Rejected':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            مرفوض
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            قيد المراجعة
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          طلبات التبرع الفردية ({donors.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {donors.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>لا توجد طلبات تبرع فردية</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Food ID</TableHead>
                  <TableHead>اسم الطعام</TableHead>
                  <TableHead>الوصف</TableHead>
                  <TableHead>العنوان</TableHead>
                  <TableHead>نباتي</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donors.map((donor) => (
                  <TableRow key={donor.foodId}>
                    <TableCell>{donor.foodId}</TableCell>
                    <TableCell>{donor.foodName}</TableCell>
                    <TableCell>{donor.description || '-'}</TableCell>
                    <TableCell>{donor.country}</TableCell>
                    <TableCell>{donor.vegetarian ? 'نعم' : 'لا'}</TableCell>
                    <TableCell>{getStatusBadge(donor.status)}</TableCell>
                    <TableCell>
                   {donor.status === 'Pending' && (

                        <div className="flex gap-2">
                        <Button
  size="sm"
  className="bg-green-600 hover:bg-green-700 text-white"
onClick={() => onStatusChange(donor.requesId, 'Approved')}

>

                            <CheckCircle className="w-3 h-3 mr-1" />
                            قبول
                          </Button>
                        <Button
  size="sm"
  variant="destructive"
onClick={() => onStatusChange(donor.requesId, 'Rejected')}
>

                            <XCircle className="w-3 h-3 mr-1" />
                            رفض
                          </Button>
                        </div>
                      )}
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

export default IndividualDonorsTable;
