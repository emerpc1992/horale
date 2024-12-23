import React from 'react';
import { useCredits } from '../../../hooks/useCredits';
import { formatAmount } from '../../../utils/formatters';
import { CreditCard, Wallet, BanknoteIcon, AlertCircle, TrendingUp } from 'lucide-react';

export default function CreditsReport() {
  const { credits } = useCredits();

  // Calcular totales y ganancias
  const totals = credits.reduce((acc, credit) => {
    // Pagos recibidos
    const totalPaid = credit.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
    
    // Precio y costo total del producto
    const costPrice = credit.costPrice || 0;
    const price = credit.price || 0;
    const remainingAmount = credit.remainingAmount || 0;

    // Calcular el costo proporcional basado en los pagos recibidos
    const proportionalCost = costPrice * (totalPaid / price);
    
    // La ganancia real es la diferencia entre lo pagado y el costo proporcional
    const realProfit = totalPaid - proportionalCost;

    return {
      totalPaid: acc.totalPaid + totalPaid, // Total cobrado
      totalCost: acc.totalCost + proportionalCost, // Costo proporcional
      totalProfit: acc.totalProfit + realProfit, // Ganancia real
      pendingAmount: acc.pendingAmount + remainingAmount // Monto pendiente por cobrar
    };
  }, {
    totalPaid: 0,
    totalCost: 0,
    totalProfit: 0,
    pendingAmount: 0
  });

  // Análisis de pagos por método
  const paymentsByMethod = credits.reduce((acc, credit) => {
    if (!credit.payments) return acc;
    
    credit.payments.forEach(payment => {
      acc[payment.paymentMethod] = (acc[payment.paymentMethod] || 0) + payment.amount;
    });
    return acc;
  }, {} as Record<string, number>);

  // Calcular porcentajes de métodos de pago
  const totalPayments = Object.values(paymentsByMethod).reduce((sum, amount) => sum + amount, 0);
  const paymentPercentages = Object.entries(paymentsByMethod).reduce((acc, [method, amount]) => {
    acc[method] = totalPayments > 0 ? (amount / totalPayments) * 100 : 0;
    return acc;
  }, {} as Record<string, number>);

  // Calcular margen de ganancia promedio
  const profitMargin = totals.totalPaid > 0 
    ? (totals.totalProfit / totals.totalPaid) * 100 
    : 0;

  return (
    <div className="space-y-6">
      {/* Métricas Principales */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Cobrado</p>
              <p className="text-2xl font-bold text-blue-600">
                ${formatAmount(totals.totalPaid)}
              </p>
            </div>
            <CreditCard className="h-8 w-8 text-blue-600 opacity-20" />
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600">Por Cobrar</p>
              <p className="text-2xl font-bold text-yellow-600">
                ${formatAmount(totals.pendingAmount)}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-600 opacity-20" />
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">Costo de Ventas</p>
              <p className="text-2xl font-bold text-red-600">
                ${formatAmount(totals.totalCost)}
              </p>
            </div>
            <Wallet className="h-8 w-8 text-red-600 opacity-20" />
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Ganancia Real</p>
              <p className="text-2xl font-bold text-green-600">
                ${formatAmount(totals.totalProfit)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600 opacity-20" />
          </div>
          <p className="mt-2 text-sm text-green-600">
            Margen: {profitMargin.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Análisis por Método de Pago */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium">Análisis por Método de Pago</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(paymentsByMethod).map(([method, amount]) => {
              const Icon = method === 'cash' ? Wallet : 
                         method === 'card' ? CreditCard : BanknoteIcon;
              const label = method === 'cash' ? 'Efectivo' :
                          method === 'card' ? 'Tarjeta' : 'Transferencia';
              const percentage = paymentPercentages[method];

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
    </div>
  );
}