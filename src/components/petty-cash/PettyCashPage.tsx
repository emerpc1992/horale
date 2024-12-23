import React, { useState } from 'react';
import { Plus, PiggyBank, Trash2 } from 'lucide-react';
import { usePettyCash } from '../../hooks/usePettyCash';
import TransactionList from './TransactionList';
import PettyCashForm from './PettyCashForm';

export default function PettyCashPage() {
  const [showForm, setShowForm] = useState(false);
  const { transactions, balance, addTransaction, clearHistory } = usePettyCash();

  const handleSubmit = async (data: any) => {
    try {
      await addTransaction(data);
      setShowForm(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleClearHistory = async () => {
    if (window.confirm('¿Está seguro de borrar todo el historial de caja chica? Esta acción no se puede deshacer.')) {
      try {
        await clearHistory();
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  // Ensure balance is a number and format it
  const formattedBalance = typeof balance === 'number' ? balance.toFixed(2) : '0.00';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <PiggyBank className="h-6 w-6 text-pink-600" />
          <h1 className="text-2xl font-bold text-gray-900">Caja Chica</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Saldo Actual</p>
            <p className="text-2xl font-bold text-gray-900">${formattedBalance}</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Movimiento
          </button>
          <button
            onClick={handleClearHistory}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Borrar Historial
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Nuevo Movimiento</h2>
            <PettyCashForm
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
              currentBalance={balance}
            />
          </div>
        </div>
      )}

      <TransactionList transactions={transactions} />
    </div>
  );
}