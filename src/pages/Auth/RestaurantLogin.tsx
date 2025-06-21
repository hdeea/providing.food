import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RestaurantLogin() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // مؤقتًا: نحفظ دخول المطعم كتجهيزة للربط لاحقًا
    localStorage.setItem('restaurantLoggedIn', 'true');
    navigate('/restaurant/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">دخول المطاعم</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="email" placeholder="البريد الإلكتروني" required />
          <Input type="password" placeholder="كلمة المرور" required />
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            تسجيل الدخول
          </Button>
        </form>
      </div>
    </div>
  );
}
