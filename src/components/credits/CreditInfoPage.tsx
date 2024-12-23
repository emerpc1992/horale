import React from 'react';
import { useCredits } from '../../hooks/useCredits';
import { formatAmount } from '../../utils/formatters';
import { Calculator, DollarSign, CreditCard, AlertCircle } from 'lucide-react';

export default function CreditInfoPage() {
  const { credits } = useCredits();

  // Calculate metrics
  const metrics = credits.reduce((acc, credit) => {
    // Total cost of products in credit
    const costPrice = credit.costPrice || 0;
    acc.totalCost += costPrice;

    // Income from received payments
    const paidAmount = credit.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
    acc.totalPaid += paidAmount;

    // Total number of credits
    acc.totalCredits += 1;

    // Pending payments
    const remainingAmount = credit.remainingAmount || 0;
    acc.pendingPayments += remainingAmount;

    // Net profit (only from paid credits)
    if (credit.status === 'paid') {
      acc.netProfit += (credit.price - credit.costPrice);
    }

    return acc;
  }, {
    totalCost: 0,
    totalPaid: 0,
    totalCredits: 0,
    pendingPayments: 0,
    netProfit: 0
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="h-6 w-6 text-pink-600" />
        <h1 className="text-2xl font-bold text-gray-900">Información de Créditos</h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Credit Cost */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm text-blue-600">Costo de Crédito</p>
              <p className="text-3xl font-bold text-blue-600">
                ${formatAmount(metrics.totalCost)}
              </p>
            </div>
            <DollarSign className="h-10 w-10 text-blue-600 opacity-20" />
          </div>
          <p className="text-sm text-blue-600">
            Costo total de productos en crédito
          </p>
        </div>

        {/* Credit Income */}
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm text-green-600">Ingresos en Créditos</p>
              <p className="text-3xl font-bold text-green-600">
                ${formatAmount(metrics.totalPaid)}
              </p>
            </div>
            <CreditCard className="h-10 w-10 text-green-600 opacity-20" />
          </div>
          <p className="text-sm text-green-600">
            Total de pagos recibidos
          </p>
        </div>

        {/* Total Credits */}
        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm text-purple-600">Total de Créditos</p>
              <p className="text-3xl font-bold text-purple-600">
                {metrics.totalCredits}
              </p>
            </div>
            <Calculator className="h-10 w-10 text-purple-600 opacity-20" />
          </div>
          <p className="text-sm text-purple-600">
            Número total de créditos registrados
          </p>
        </div>

        {/* Pending Credits */}
        <div className="bg-yellow-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm text-yellow-600">Créditos Pendientes</p>
              <p className="text-3xl font-bold text-yellow-600">
                ${formatAmount(metrics.pendingPayments)}
              </p>
            </div>
            <AlertCircle className="h-10 w-10 text-yellow-600 opacity-20" />
          </div>
          <p className="text-sm text-yellow-600">
            Total de pagos pendientes por cobrar
          </p>
        </div>

        {/* Net Profit */}
        <div className="col-span-2 bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm text-gray-400">Ganancia Neta</p>
              <p className="text-3xl font-bold text-white">
                ${formatAmount(metrics.netProfit)}
              </p>
            </div>
            <Calculator className="h-10 w-10 text-white opacity-20" />
          </div>
          <p className="text-sm text-gray-400">
            Ganancia total de créditos pagados (Precio de venta - Costo)
          </p>
        </div>
      </div>
    </div>
  );
}