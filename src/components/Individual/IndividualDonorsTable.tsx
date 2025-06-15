
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IndividualDonor } from '../../types/individual';
import { formatDateTime } from '../../utils/helpers';
import { Heart, CheckCircle, XCircle, Clock, Mail, Phone, MapPin, Utensils, User } from 'lucide-react';

interface IndividualDonorsTableProps {
  donors: IndividualDonor[];
  onStatusChange: (donorId: string, newStatus: 'approved' | 'rejected') => void;
}

const IndividualDonorsTable: React.FC<IndividualDonorsTableProps> = ({ 
  donors, 
  onStatusChange 
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            مقبول
          </Badge>
        );
      case 'rejected':
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
                  <TableHead>رقم الطلب</TableHead>
                  <TableHead>نوع المستخدم</TableHead>
                  <TableHead>البريد الإلكتروني</TableHead>
                  <TableHead>العنوان</TableHead>
                  <TableHead>اسم الطعام</TableHead>
                  <TableHead>نباتي</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>تاريخ الطلب</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donors.map((donor) => (
                  <TableRow key={donor.id}>
                    <TableCell className="font-medium">{donor.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {donor.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {donor.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {donor.address}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4" />
                        {donor.foodDescription || '-'}
                      </div>
                    </TableCell>
                    <TableCell>
                      {donor.foodDescription?.includes('(Vegetarian)') ? (
                        <Badge className="bg-green-100 text-green-800">
                          نعم
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800">
                          لا
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(donor.status)}</TableCell>
                    <TableCell>{formatDateTime(donor.createdAt)}</TableCell>
                    <TableCell>
                      {donor.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => onStatusChange(donor.id, 'approved')}
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            قبول
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onStatusChange(donor.id, 'rejected')}
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            رفض
                          </Button>
                        </div>
                      )}
                      {donor.status !== 'pending' && (
                        <span className="text-sm text-gray-500">
                          {donor.reviewedAt && `تمت المراجعة: ${formatDateTime(donor.reviewedAt)}`}
                        </span>
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
