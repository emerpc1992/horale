import React from 'react';
import { formatAmount } from '../../../utils/formatters';

interface IncomeStatementProps {
  grossSales: number;
  totalDiscounts: number;
  netSales: number;
  costOfSales: number;
  grossProfit: number;
  expensesByCategory: Record<string, number>;
  operatingExpenses: number;
  operatingProfit: number;
  totalCommissions: number;
  netProfit: number;
}

export default function IncomeStatement({
  grossSales,
  totalDiscounts,
  netSales,
  costOfSales,
  grossProfit,
  expensesByCategory,
  operatingExpenses,
  operatingProfit,
  totalCommissions,
  netProfit
}: IncomeStatementProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-medium">Estado de Resultados</h3>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Ventas */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Ventas</h4>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Ventas Brutas</span>
              <span className="text-green-600 font-medium">+${formatAmount(grossSales)}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-600">Descuentos</span>
              <span className="text-red-600 font-medium">-${formatAmount(totalDiscounts)}</span>
            </div>
            <div className="flex justify-between border-t pt-2 border-green-200 bg-green-50 px-2">
              <span className="font-medium text-green-700">Ventas Netas</span>
              <span className="font-medium text-green-600">
                ${formatAmount(netSales)}
              </span>
            </div>
          </div>
        </div>

        {/* Costo de Ventas */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Costo de Ventas</h4>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Costo de Productos Vendidos</span>
              <span className="text-red-600 font-medium">-${formatAmount(costOfSales)}</span>
            </div>
            <div className="flex justify-between border-t pt-2 border-green-200 bg-green-50 px-2">
              <span className="font-medium text-green-700">Ganancia Bruta</span>
              <span className={`font-medium ${grossProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${formatAmount(grossProfit)}
              </span>
            </div>
          </div>
        </div>

        {/* Gastos Operativos */}
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
              <span className="font-medium text-red-700">Total Gastos Operativos</span>
              <span className="text-red-600 font-medium">-${formatAmount(operatingExpenses)}</span>
            </div>
            <div className="flex justify-between border-t pt-2 border-green-200 bg-green-50 px-2">
              <span className="font-medium text-green-700">Ganancia Operativa</span>
              <span className={`font-medium ${operatingProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${formatAmount(operatingProfit)}
              </span>
            </div>
          </div>
        </div>

        {/* Comisiones */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Comisiones</h4>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Comisiones a Colaboradores</span>
              <span className="text-red-600 font-medium">-${formatAmount(totalCommissions)}</span>
            </div>
          </div>
        </div>

        {/* Resultado Final */}
        <div className="bg-gray-800 p-4 rounded-lg text-white">
          <div className="flex justify-between items-center">
            <span className="font-bold">Ganancia Neta</span>
            <span className={`text-xl font-bold ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${formatAmount(netProfit)}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-400">
            Margen de ganancia: {((netProfit / netSales) * 100).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
}