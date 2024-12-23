import React from 'react';
import { Calculator, DollarSign, Percent, ShoppingCart } from 'lucide-react';
import { formatAmount } from '../../../utils/formatters';

interface MetricProps {
  grossSales: number;
  costOfSales: number;
  operatingExpenses: number;
  netProfit: number;
  profitMargin: number;
  averageTicket: number;
}

export default function FinancialMetrics({ 
  grossSales,
  costOfSales,
  operatingExpenses,
  netProfit,
  profitMargin,
  averageTicket
}: MetricProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-green-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-green-600">Ventas Brutas</p>
            <p className="text-2xl font-bold text-green-600">
              ${formatAmount(grossSales)}
            </p>
          </div>
          <DollarSign className="h-8 w-8 text-green-600 opacity-20" />
        </div>
        <p className="mt-2 text-sm text-green-600">
          Ticket Promedio: ${formatAmount(averageTicket)}
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-600">Costo de Ventas</p>
            <p className="text-2xl font-bold text-blue-600">
              ${formatAmount(costOfSales)}
            </p>
          </div>
          <Calculator className="h-8 w-8 text-blue-600 opacity-20" />
        </div>
        <p className="mt-2 text-sm text-blue-600">
          {((costOfSales / grossSales) * 100).toFixed(1)}% de las ventas
        </p>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-yellow-600">Gastos Operativos</p>
            <p className="text-2xl font-bold text-yellow-600">
              ${formatAmount(operatingExpenses)}
            </p>
          </div>
          <ShoppingCart className="h-8 w-8 text-yellow-600 opacity-20" />
        </div>
        <p className="mt-2 text-sm text-yellow-600">
          {((operatingExpenses / grossSales) * 100).toFixed(1)}% de las ventas
        </p>
      </div>

      <div className={`${netProfit >= 0 ? 'bg-purple-50' : 'bg-red-50'} p-4 rounded-lg col-span-2`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm ${netProfit >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
              Ganancia Neta
            </p>
            <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
              ${formatAmount(netProfit)}
            </p>
          </div>
          <Calculator className={`h-8 w-8 ${netProfit >= 0 ? 'text-purple-600' : 'text-red-600'} opacity-20`} />
        </div>
        <p className={`mt-2 text-sm ${netProfit >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
          Margen de ganancia: {profitMargin.toFixed(1)}%
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Margen de Ganancia</p>
            <p className="text-2xl font-bold text-gray-900">
              {profitMargin.toFixed(1)}%
            </p>
          </div>
          <Percent className="h-8 w-8 text-gray-600 opacity-20" />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Por cada $100 en ventas
        </p>
      </div>
    </div>
  );
}