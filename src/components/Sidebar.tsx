import React from 'react';
import { 
  Package, 
  Users, 
  UserCircle, 
  Calendar, 
  CreditCard, 
  PiggyBank,
  DollarSign,
  ShoppingCart,
  FileText,
  Info
} from 'lucide-react';

const menuItems = [
  { icon: Calendar, label: 'Citas', path: 'appointments' },
  { icon: ShoppingCart, label: 'Ventas', path: 'sales' },
  { icon: Package, label: 'Productos', path: 'products' },
  { icon: Users, label: 'Clientes', path: 'clients' },
  { icon: UserCircle, label: 'Colaboradores', path: 'staff' },
  { icon: CreditCard, label: 'Créditos', path: 'credits' },
  { icon: PiggyBank, label: 'Caja Chica', path: 'petty-cash' },
  { icon: DollarSign, label: 'Gastos', path: 'expenses' },
  { icon: FileText, label: 'Estado Financiero', path: 'financial' },
  { icon: Info, label: 'Info Crédito', path: 'credit-info' }
];

interface SidebarProps {
  onPageChange: (page: string) => void;
}

export default function Sidebar({ onPageChange }: SidebarProps) {
  return (
    <aside className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Panel de Control</h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <button 
                onClick={() => onPageChange(item.path)}
                className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}