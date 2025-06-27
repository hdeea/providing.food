
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, Utensils, LayoutDashboard } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const { user } = useAuth();

  const adminLinks = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: 'Restaurants',
      path: '/admin/restaurants',
      icon: <Utensils size={20} />,
    },
    {
      name: 'Beneficiaries',
      path: '/admin/beneficiaries',
      icon: <User size={20} />,
    },
  ];

  const restaurantLinks = [
    {
      name: 'Dashboard',
      path: '/restaurant',
      icon: <Utensils size={20} />,
    },
  ];

  const links = user?.role === 'admin' ? adminLinks : restaurantLinks;

  if (!isOpen) return null;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full fixed left-0 z-10 transition-all duration-300">
      <div className="p-4">
        <h2 className="text-lg font-medium text-brand-blue mb-6">القــائمة</h2>
        <nav className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`sidebar-item ${
                location.pathname === link.path ? 'sidebar-item-active' : ''
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
