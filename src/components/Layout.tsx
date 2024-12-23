import React from 'react';
import Sidebar from './Sidebar';
import { LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
  onPageChange: (page: string) => void;
}

export default function Layout({ children, onPageChange }: LayoutProps) {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onPageChange={onPageChange} />
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Bienvenido, {user?.username}!
            </h1>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Cerrar Sesión
            </button>
          </div>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}