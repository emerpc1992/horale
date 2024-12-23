import React, { useState } from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { useSales } from '../../hooks/useSales';
import SaleList from './SaleList';
import SaleForm from './SaleForm';

export default function SalesPage() {
  const [showForm, setShowForm] = useState(false);
  const { sales, getSaleItems, addSale, cancelSale } = useSales();

  const handleSubmit = async (data: any) => {
    try {
      await addSale(data);
      setShowForm(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleCancel = async (id: number) => {
    if (window.confirm('¿Está seguro de cancelar esta venta? Se restaurará el stock de los productos.')) {
      try {
        await cancelSale(id);
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6 text-pink-600" />
          <h1 className="text-2xl font-bold text-gray-900">Ventas</h1>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Venta
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Nueva Venta</h2>
            <SaleForm
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <SaleList
        sales={sales}
        onGetItems={getSaleItems}
        onCancel={handleCancel}
      />
    </div>
  );
}