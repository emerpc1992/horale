import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import SalesReport from './SalesReport';
import CommissionsReport from './CommissionsReport';
import InventoryReport from './InventoryReport';
import FinancialReport from './FinancialReport';

type ReportType = 'sales' | 'commissions' | 'inventory' | 'financial';

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<ReportType>('sales');

  const renderReport = () => {
    switch (selectedReport) {
      case 'sales':
        return <SalesReport />;
      case 'commissions':
        return <CommissionsReport />;
      case 'inventory':
        return <InventoryReport />;
      case 'financial':
        return <FinancialReport />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-pink-600" />
          <h1 className="text-2xl font-bold text-gray-900">Reportes</h1>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setSelectedReport('sales')}
            className={`px-4 py-2 rounded-md ${
              selectedReport === 'sales'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Ventas
          </button>
          <button
            onClick={() => setSelectedReport('commissions')}
            className={`px-4 py-2 rounded-md ${
              selectedReport === 'commissions'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Comisiones
          </button>
          <button
            onClick={() => setSelectedReport('inventory')}
            className={`px-4 py-2 rounded-md ${
              selectedReport === 'inventory'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Inventario
          </button>
          <button
            onClick={() => setSelectedReport('financial')}
            className={`px-4 py-2 rounded-md ${
              selectedReport === 'financial'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Financiero
          </button>
        </div>

        {renderReport()}
      </div>
    </div>
  );
}