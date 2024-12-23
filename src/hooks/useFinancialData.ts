import { useSales } from './useSales';
import { useExpenses } from './useExpenses';

export function useFinancialData() {
  const { sales } = useSales();
  const { expenses } = useExpenses();

  // Solo ventas completadas
  const completedSales = sales.filter(sale => sale.status === 'completed');
  
  // 1. Ventas brutas (total facturado)
  const grossSales = completedSales.reduce((sum, sale) => {
    return sum + (Number(sale.total) || 0);
  }, 0);

  // 2. Costo de ventas (costo de los productos vendidos)
  const costOfSales = completedSales.reduce((sum, sale) => {
    if (!sale.items) return sum;
    return sum + sale.items.reduce((itemSum, item) => {
      const costPrice = Number(item.costPrice) || 0;
      const quantity = Number(item.quantity) || 0;
      return itemSum + (costPrice * quantity);
    }, 0);
  }, 0);

  // 3. Descuentos totales
  const totalDiscounts = completedSales.reduce((sum, sale) => {
    return sum + (Number(sale.discount) || 0);
  }, 0);

  // 4. Ventas netas (ventas brutas - descuentos)
  const netSales = grossSales - totalDiscounts;

  // 5. Ganancia bruta (ventas netas - costo de ventas)
  const grossProfit = netSales - costOfSales;

  // 6. Gastos operativos por categoría
  const expensesByCategory = expenses.reduce((acc, expense) => {
    const category = expense.category || 'Otros';
    const amount = Number(expense.amount) || 0;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {} as Record<string, number>);

  // 7. Total gastos operativos
  const operatingExpenses = expenses.reduce((sum, expense) => {
    return sum + (Number(expense.amount) || 0);
  }, 0);

  // 8. Ganancia operativa (ganancia bruta - gastos operativos)
  const operatingProfit = grossProfit - operatingExpenses;

  // 9. Comisiones totales
  const totalCommissions = completedSales.reduce((sum, sale) => {
    return sum + ((sale.total * (sale.commission / 100)) || 0);
  }, 0);

  // 10. Ganancia neta (ganancia operativa - comisiones)
  const netProfit = operatingProfit - totalCommissions;

  // 11. Análisis por método de pago
  const salesByPaymentMethod = completedSales.reduce((acc, sale) => {
    const method = sale.paymentMethod || 'other';
    acc[method] = (acc[method] || 0) + (Number(sale.total) || 0);
    return acc;
  }, {} as Record<string, number>);

  // 12. Porcentajes por método de pago
  const paymentMethodPercentages = Object.entries(salesByPaymentMethod).reduce((acc, [method, amount]) => {
    acc[method] = (amount / grossSales) * 100;
    return acc;
  }, {} as Record<string, number>);

  return {
    // Métricas de ventas
    grossSales,
    netSales,
    totalDiscounts,
    
    // Métricas de costos
    costOfSales,
    grossProfit,
    
    // Métricas de gastos
    operatingExpenses,
    expensesByCategory,
    
    // Métricas de ganancias
    operatingProfit,
    totalCommissions,
    netProfit,

    // Métricas adicionales
    totalTransactions: completedSales.length,
    averageTicket: completedSales.length > 0 ? netSales / completedSales.length : 0,
    profitMargin: netSales > 0 ? (netProfit / netSales) * 100 : 0,

    // Métricas de métodos de pago
    salesByPaymentMethod,
    paymentMethodPercentages
  };
}