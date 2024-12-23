import React from 'react';
import { PettyCash } from '../../types/database';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface TransactionListProps {
  transactions: PettyCash[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  const formatAmount = (amount: number | undefined) => {
    return typeof amount === 'number' ? amount.toFixed(2) : '0.00';
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Monto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Motivo
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(transaction.createdAt).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {transaction.type === 'income' ? (
                  <span className="flex items-center text-green-600">
                    <ArrowUpCircle className="h-4 w-4 mr-1" />
                    Entrada
                  </span>
                ) : (
                  <span className="flex items-center text-red-600">
                    <ArrowDownCircle className="h-4 w-4 mr-1" />
                    Salida
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                  ${formatAmount(transaction.amount)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {transaction.reason}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}