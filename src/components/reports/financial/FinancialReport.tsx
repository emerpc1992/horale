import React from 'react';
import { useFinancialData } from '../../../hooks/useFinancialData';
import FinancialMetrics from './FinancialMetrics';
import IncomeStatement from './IncomeStatement';
import PaymentMethodsAnalysis from './PaymentMethodsAnalysis';

export default function FinancialReport() {
  const {
    grossSales,
    netSales,
    totalDiscounts,
    costOfSales,
    grossProfit,
    operatingExpenses,
    expensesByCategory,
    operatingProfit,
    totalCommissions,
    netProfit,
    profitMargin,
    averageTicket,
    salesByPaymentMethod,
    paymentMethodPercentages
  } = useFinancialData();

  return (
    <div className="space-y-6">
      <FinancialMetrics
        grossSales={grossSales}
        costOfSales={costOfSales}
        operatingExpenses={operatingExpenses}
        netProfit={netProfit}
        profitMargin={profitMargin}
        averageTicket={averageTicket}
      />

      <PaymentMethodsAnalysis
        salesByPaymentMethod={salesByPaymentMethod}
        paymentMethodPercentages={paymentMethodPercentages}
      />

      <IncomeStatement
        grossSales={grossSales}
        totalDiscounts={totalDiscounts}
        netSales={netSales}
        costOfSales={costOfSales}
        grossProfit={grossProfit}
        expensesByCategory={expensesByCategory}
        operatingExpenses={operatingExpenses}
        operatingProfit={operatingProfit}
        totalCommissions={totalCommissions}
        netProfit={netProfit}
      />
    </div>
  );
}