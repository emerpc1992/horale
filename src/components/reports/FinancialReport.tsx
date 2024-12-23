import React from 'react';
import { useSales } from '../../hooks/useSales';
import { useExpenses } from '../../hooks/useExpenses';
import { formatAmount } from '../../utils/formatters';
import { Calculator } from 'lucide-react';

export default function FinancialReport() {
  const { sales } = useSales();
  const { expenses } = useExpenses();

  // Solo ventas completadas
  const completedSales = sales.filter(sale => sale.status === 'completed');
  
  // Ventas totales (ingresos)
  const totalSales = completedSales.reduce((sum, sale) => {
    // Asegurarse de que 'sale.total' sea un número válido
    return sum + (Number(sale.total) || 0);
  }, 0);

  // Costo de ventas (usando el costo del producto)
  const costOfSales = completedSales.reduce((sum, sale) => {
    if (!sale.items) return sum;

    return sum + sale.items.reduce((itemSum, item) => {
      // Asegurarse de que 'costPrice' y 'quantity' sean números válidos
      const costPrice = Number(item.costPrice) || 0;
      const quantity = Number(item.quantity) || 0;
      return itemSum + (costPrice * quantity);
    }, 0);
  }, 0);

  // Gastos operativos
  const totalExpenses = expenses.reduce((sum, expense) => {
    // Asegurarse de que 'expense.amount' sea un número válido
    return sum + (Number(expense.amount) || 0);
  }, 0);

  // Ganancia bruta (ventas - costo de ventas)
  const grossProfit = totalSales - costOfSales;

  // Ganancia neta (ganancia bruta - gastos)
  const netProfit = grossProfit - totalExpenses;

  // Agrupar gastos por categoría
  const expensesByCategory = expenses.reduce((acc, expense) => {
    const category = expense.category || 'Otros';
    const amount = Number(expense.amount) || 0;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-green-600">Ventas Totales</p>
            <Calculator className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">
            ${formatAmount(totalSales)}
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-yellow-600">Costo de Ventas</p>
            <Calculator className="h-5 w-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-yellow-600">
            ${formatAmount(costOfSales)}
          </p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-red-600">Gastos Operativos</p>
            <Calculator className="h-5 w-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">
            ${formatAmount(totalExpenses)}
          </p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-purple-600">Ganancia Neta</p>
            <Calculator className="h-5 w-5 text-purple-600" />
          </div>
          <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${formatAmount(netProfit)}
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium">Estado de Resultados</h3>
        </div>
        
        <div className="p-6 space-y-4">
          {/* Ventas y Costos */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Ventas y Costos</h4>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Ventas Totales</span>
                <span className="text-green-600 font-medium">+${formatAmount(totalSales)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-600">Costo de Ventas</span>
                <span className="text-yellow-600 font-medium">-${formatAmount(costOfSales)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 border-green-200 bg-green-50 px-2">
                <span className="font-medium text-green-700">Ganancia Bruta</span>
                <span className={`font-medium ${grossProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${formatAmount(grossProfit)}
                </span>
              </div>
            </div>
          </div>

          {/* Gastos */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Gastos Operativos</h4>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              {Object.entries(expensesByCategory).map(([category, amount]) => (
                <div key={category} className="flex justify-between">
                  <span className="text-gray-600">{category}</span>
                  <span className="text-red-600 font-medium">-${formatAmount(amount)}</span>
                </div>
              ))}
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium text-red-700">Total Gastos</span>
                <span className="text-red-600 font-medium">-${formatAmount(totalExpenses)}</span>
              </div>
            </div>
          </div>

          {/* Resultado Final */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900">Ganancia Neta</span>
              <span className={`text-xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${formatAmount(netProfit)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
