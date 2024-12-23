import React from 'react';
import { useStaff } from '../../hooks/useStaff';
import { useSales } from '../../hooks/useSales';
import { formatAmount } from '../../utils/formatters';

export default function CommissionsReport() {
  const { staff } = useStaff();
  const { sales } = useSales();

  const staffCommissions = staff.map(member => {
    const staffSales = sales.filter(sale => 
      sale.staffId === member.id && 
      sale.status === 'completed'
    );

    const totalSales = staffSales.reduce((sum, sale) => sum + sale.total, 0);
    const totalCommission = staffSales.reduce((sum, sale) => 
      sum + (sale.total * (sale.commission / 100)), 0
    );

    return {
      ...member,
      totalSales,
      totalCommission,
      salesCount: staffSales.length
    };
  });

  return (
    <div className="space-y-6">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Colaborador</th>
              <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Ventas Totales</th>
              <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"># Ventas</th>
              <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Comisiones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {staffCommissions.map((member) => (
              <tr key={member.id}>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {member.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                  ${formatAmount(member.totalSales)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                  {member.salesCount}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-medium text-pink-600">
                  ${formatAmount(member.totalCommission)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}