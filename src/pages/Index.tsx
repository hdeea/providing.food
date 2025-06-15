
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Utensils, Gift, UserPlus, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";


const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white font-bold text-xl px-3 py-2 rounded-lg">PF</div>
              <span className="ml-3 text-2xl font-bold text-gray-900">Providing Food</span>
            </div>
            <Link to="/login">
              <Button variant="outline">دخول الإدارة</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <Heart className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            منصة توزيع الطعام
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نربط بين المتبرعين والمطاعم والمحتاجين لضمان وصول الطعام للمستحقين بطريقة منظمة وفعالة
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Individual Donors */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <HandHeart className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle>المتبرعين الأفراد</CardTitle>
              <CardDescription>
                سجل كمتبرع فردي وساهم في مساعدة المحتاجين
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/individual/donate" className="block">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  سجل كمتبرع
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Help Seekers */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <UserPlus className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>طالبي المساعدة</CardTitle>
              <CardDescription>
                قدم طلب للحصول على مساعدة غذائية
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/individual/help-request" className="block">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  اطلب مساعدة
                </Button>
              </Link>
              <Link to="/individual/track" className="block">
                <Button variant="outline" className="w-full">
                  تتبع طلبك
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Restaurants */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Utensils className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>المطاعم الشريكة</CardTitle>
              <CardDescription>
                إدارة السندات الغذائية ومسح رموز QR
              </CardDescription>
            </CardHeader>
            <CardContent>
            
<Link to="/restaurant/login">  {/* تغيير المسار هنا */}
  <Button className="w-full bg-purple-600 hover:bg-purple-700">
    دخول المطاعم
  </Button>
</Link>
            </CardContent>
          </Card>

          {/* Admin Dashboard */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>إدارة المنصة</CardTitle>
              <CardDescription>
                إدارة الطلبات وإصدار السندات الغذائية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/login">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  دخول الإدارة
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            مميزات المنصة
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Gift className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">سندات رقمية</h3>
              <p className="text-sm text-gray-600">
                إصدار وإدارة السندات الغذائية بطريقة رقمية آمنة
              </p>
            </div>
            
            <div className="text-center">
              <HandHeart className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">تبرعات سهلة</h3>
              <p className="text-sm text-gray-600">
                نظام مبسط للتبرع النقدي أو العينى من الأفراد
              </p>
            </div>
            
            <div className="text-center">
              <Utensils className="w-10 h-10 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">شراكة مع المطاعم</h3>
              <p className="text-sm text-gray-600">
                تنسيق فعال مع المطاعم لضمان جودة الخدمة
              </p>
            </div>
            
            <div className="text-center">
              <Heart className="w-10 h-10 text-red-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">شفافية كاملة</h3>
              <p className="text-sm text-gray-600">
                تتبع شامل لجميع العمليات والتبرعات
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 text-white font-bold text-lg px-2 py-1 rounded">PF</div>
            <span className="ml-2 text-xl font-semibold">Providing Food</span>
          </div>
          <p className="text-gray-400">
            منصة توزيع الطعام - نحو مجتمع خالٍ من الجوع
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
