import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import BeneficiariesTable from '../../components/Beneficiaries/BeneficiariesTable';
import BeneficiaryForm from '../../components/Beneficiaries/BeneficiaryForm';
import { Beneficiary } from '../../types';
import { useToast } from '@/hooks/use-toast';
import { postBeneficiary } from '@/api/postBeneficiary';
import { getBeneficiaries } from '@/api/getBeneficiary'; // لازم تعمل دالة جلب بيانات منفصلة

const BeneficiariesPage: React.FC = () => {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getBeneficiaries();
        setBeneficiaries(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch beneficiaries.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const handleSave = async (beneficiaryData: Partial<Beneficiary>) => {
    try {
      const newBeneficiary = {
        fullName: beneficiaryData.fullName || '',
        phoneNumber: beneficiaryData.phoneNumber || '',
        familySize: beneficiaryData.familySize || 1,
        isActive: beneficiaryData.isActive ?? true,
      };

      const response = await postBeneficiary(newBeneficiary as Beneficiary);
      console.log('Beneficiary saved successfully:', response);

      // تحديث القائمة مباشرة بإضافة المستفيد الجديد أو تحديث الموجود
      if (selectedBeneficiary) {
        // حالة تعديل
        setBeneficiaries((prev) =>
          prev.map((b) => (b.beneficiaryId === selectedBeneficiary.beneficiaryId ? response : b))
        );
      } else {
        // حالة إضافة جديد
        setBeneficiaries((prev) => [...prev, response]);
      }

      toast({
        title: 'Success',
        description: `Beneficiary ${newBeneficiary.fullName} saved successfully.`,
      });

      handleCloseForm();
    } catch (error) {
      console.error('Error saving beneficiary:', error);
      toast({
        title: 'Error',
        description: 'Failed to save beneficiary.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = (id: number) => {
    // إضافة طلب حذف للسيرفر هنا لو موجود API للحذف

    setBeneficiaries(beneficiaries.filter((b) => b.beneficiaryId !== id));
    toast({
      title: 'Deleted',
      description: 'Beneficiary deleted successfully.',
    });
  };

  if (loading) return <p>Loading beneficiaries...</p>;

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

      <BeneficiariesTable beneficiaries={beneficiaries} onEdit={handleEdit} onDelete={handleDelete} />

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
