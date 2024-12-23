import React from 'react';
import { formatAmount } from '../../../utils/formatters';
import { CreditCard, Wallet, BanknoteIcon } from 'lucide-react';

interface PaymentMethodsAnalysisProps {
  salesByPaymentMethod: Record<string, number>;
  paymentMethodPercentages: Record<string, number>;
}

const methodIcons = {
  cash: Wallet,
  card: CreditCard,
  transfer: BanknoteIcon
};

const methodLabels = {
  cash: 'Efectivo',
  card: 'Tarjeta',
  transfer: 'Transferencia'
};

export default function PaymentMethodsAnalysis({ 
  salesByPaymentMethod, 
  paymentMethodPercentages 
}: PaymentMethodsAnalysisProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-medium">Análisis por Método de Pago</h3>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(salesByPaymentMethod).map(([method, amount]) => {
            const Icon = methodIcons[method as keyof typeof methodIcons] || BanknoteIcon;
            const label = methodLabels[method as keyof typeof methodLabels] || method;
            const percentage = paymentMethodPercentages[method] || 0;

            return (
              <div key={method} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm text-gray-600">{label}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${formatAmount(amount)}
                    </p>
                  </div>
                  <Icon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${percentage}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {percentage.toFixed(1)}% del total
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}