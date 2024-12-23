import React, { useState } from 'react';
import Layout from './Layout';
import { useAuth } from '../hooks/useAuth';
import AppointmentsPage from './appointments/AppointmentsPage';
import ProductsPage from './products/ProductsPage';
import ClientsPage from './clients/ClientsPage';
import StaffPage from './staff/StaffPage';
import CreditsPage from './credits/CreditsPage';
import CreditInfoPage from './credits/CreditInfoPage';
import PettyCashPage from './petty-cash/PettyCashPage';
import ExpensesPage from './expenses/ExpensesPage';
import SalesPage from './sales/SalesPage';
import FinancialReport from './reports/financial/FinancialReport';

type PageType = 'appointments' | 'products' | 'clients' | 'staff' | 'credits' | 'petty-cash' | 'expenses' | 'sales' | 'financial' | 'credit-info';

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState<PageType>('appointments');
  const { user } = useAuth();
  
  const renderPage = () => {
    switch (currentPage) {
      case 'products':
        return <ProductsPage />;
      case 'clients':
        return <ClientsPage />;
      case 'staff':
        return <StaffPage />;
      case 'credits':
        return <CreditsPage />;
      case 'credit-info':
        return <CreditInfoPage />;
      case 'petty-cash':
        return <PettyCashPage />;
      case 'expenses':
        return <ExpensesPage />;
      case 'sales':
        return <SalesPage />;
      case 'financial':
        return <FinancialReport />;
      default:
        return <AppointmentsPage />;
    }
  };

  return (
    <Layout onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}