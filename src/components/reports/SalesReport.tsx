import React, { useState } from 'react';
import { useSales } from '../../hooks/useSales';
import { formatAmount } from '../../utils/formatters';

export default function SalesReport() {
  const { sales } = useSales();
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const filteredSales = sales.filter(sale => {
    if (!dateRange.start && !dateRange.end) return true;
    const saleDate = new Date(sale.createdAt);
    const startDate = dateRange.start ? new Date(dateRange.start) : null;
    const endDate = dateRange.end ? new Date(dateRange.end) : null;

    if (startDate && endDate) {
      return saleDate >= startDate && saleDate <= endDate;
    } else if (startDate) {
      return saleDate >= startDate;
    } else if (endDate) {
      return saleDate <= endDate;
    }
    return true;
  });

  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
  const totalCommissions = filteredSales.reduce((sum, sale) => 
    sum + (sale.total * (sale.commission / 100)), 0
  );

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
            className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha Fin</label>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
            className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total en Ventas</p>
          <p className="text-2xl font-bold text-gray-900">${formatAmount(totalSales)}</p>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg">
          <p className="text-sm text-pink-600">Total en Comisiones</p>
          <p className="text-2xl font-bold text-pink-600">${formatAmount(totalCommissions)}</p>
        </div>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fecha</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Cliente</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Colaborador</th>
              <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Total</th>
              <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Comisión</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredSales.map((sale) => (
              <tr key={sale.id}>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {new Date(sale.createdAt).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {sale.clientName}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {sale.staffName}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                  ${formatAmount(sale.total)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-medium text-pink-600">
                  ${formatAmount(sale.total * (sale.commission / 100))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}