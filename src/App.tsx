
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import RestaurantsPage from "./pages/Admin/RestaurantsPage";
import BeneficiariesPage from "./pages/Admin/BeneficiariesPage";
import AssociationDashboard from "./pages/Admin/AssociationDashboard";
import DashboardPage from "./pages/Restaurant/DashboardPage";
import DonorRegistrationPage from "./pages/Individual/DonorRegistrationPage";
import TrackDonationsPage from "./pages/Individual/TrackDonationsPage";
import HelpRequestPage from "./pages/Individual/HelpRequestPage";
import TrackRequestPage from "./pages/Individual/TrackRequestPage";
import { ReactNode } from "react";
import RestaurantLogin from './pages/Auth/RestaurantLogin';
// داخل <Routes>
const queryClient = new QueryClient();

// Protected route component with proper authentication check
const ProtectedRoute = ({
  children,
  allowedRoles = [],
}: {
  children: ReactNode;
  allowedRoles?: string[];
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // SECURITY: Block access if no user is logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // SECURITY: Block access if user role is not allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Admin route component with strict role checking
const AdminRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute allowedRoles={["admin"]}>{children}</ProtectedRoute>
);

// Restaurant route component with strict role checking
const RestaurantRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute allowedRoles={["restaurant"]}>{children}</ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/restaurant/login" element={<RestaurantLogin />} />

            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Individual Routes (Public) */}
            <Route path="/individual/donate" element={<DonorRegistrationPage />} />
            <Route path="/individual/track-donations" element={<TrackDonationsPage />} />
            <Route path="/individual/help-request" element={<HelpRequestPage />} />
            <Route path="/individual/track" element={<TrackRequestPage />} />
            
            {/* Admin Routes - PROTECTED */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AssociationDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/restaurants"
              element={
                <AdminRoute>
                  <RestaurantsPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/beneficiaries"
              element={
                <AdminRoute>
                  <BeneficiariesPage />
                </AdminRoute>
              }
            />
            
            {/* Restaurant Routes - PROTECTED */}
             
               <Route path="/restaurant/login" element={<RestaurantLogin />} />

            <Route
              path="/restaurant"
              element={
                <RestaurantRoute>
                  <DashboardPage />
                </RestaurantRoute>
              }
            />
              
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
  
            