// src/pages/VoucherPage.tsx
import React, { useState } from 'react';
import VoucherIssuanceForm from '@/components/forms/VoucherIssuanceForm';
import { createFoodBond } from '@/api/createFoodBond';

interface FoodBondResponse {
  BondId: number;
  QRCode: string;
  Message: string;
}

const VoucherPage: React.FC = () => {
  const [vouchers, setVouchers] = useState<FoodBondResponse[]>([]);

  const handleVoucherIssued = async (voucher: FoodBondResponse) => {
    try {
      setVouchers((prev) => [voucher, ...prev]); // نضيفه للقائمة مباشرة
    } catch (error) {
      console.error("❌ فشل إنشاء السند:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">إنشاء سند غذائي جديد</h2>
      <VoucherIssuanceForm onVoucherIssued={handleVoucherIssued} />

      <div className="mt-6">
        <h3 className="text-lg font-semibold">السندات المُصدرة</h3>
        <ul className="mt-2 space-y-2">
          {vouchers.map((v) => (
            <li key={v.BondId} className="p-3 border rounded bg-gray-100">
              <strong>رقم السند:</strong> {v.BondId} <br />
              <strong>رمز QR:</strong> {v.QRCode}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VoucherPage;
