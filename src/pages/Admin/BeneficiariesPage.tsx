import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import BeneficiariesTable from '../../components/Beneficiaries/BeneficiariesTable';
import BeneficiaryForm from '../../components/Beneficiaries/BeneficiaryForm';
import { Beneficiary } from '../../types';

const BeneficiariesPage: React.FC = () => {
  // إزالة الـ mock data وبدء الحالة بمصفوفة فارغة
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | undefined>(undefined);

  const handleOpenForm = () => {
    setSelectedBeneficiary(undefined);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedBeneficiary(undefined);
  };

  const handleEdit = (beneficiary: Beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setIsFormOpen(true);
  };

  const handleSave = (beneficiaryData: Partial<Beneficiary>) => {
    if (selectedBeneficiary) {
      // Update existing beneficiary
      setBeneficiaries(
        beneficiaries.map((b) =>
          b.id === selectedBeneficiary.id
            ? { ...b, ...beneficiaryData, updatedAt: new Date().toISOString() }
            : b
        )
      );
    } else {
      // Add new beneficiary
      const newBeneficiary: Beneficiary = {
        id: `${beneficiaries.length + 1}`,
        name: beneficiaryData.name || '',
        phone: beneficiaryData.phone || '',
        email: beneficiaryData.email || '',
        address: beneficiaryData.address || '',
        registrationDate: new Date().toISOString(),
      };
      
      setBeneficiaries([...beneficiaries, newBeneficiary]);
    }
  };

  const handleDelete = (id: string) => {
    setBeneficiaries(beneficiaries.filter((b) => b.id !== id));
  };

  return (
    <DashboardLayout title="Beneficiaries">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Beneficiary Management</h2>
          <p className="text-gray-500">Manage people who receive food donations</p>
        </div>
        <Button onClick={handleOpenForm} className="button-blue">
          <Plus className="mr-2 h-4 w-4" />
          Add Beneficiary
        </Button>
      </div>
      
      <BeneficiariesTable
        beneficiaries={beneficiaries}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      {isFormOpen && (
        <BeneficiaryForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSave={handleSave}
          initialData={selectedBeneficiary}
        />
      )}
    </DashboardLayout>
  );
};

export default BeneficiariesPage;
