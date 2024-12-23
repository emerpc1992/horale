import React from 'react';
import { Trash2 } from 'lucide-react';

interface SaleItemListProps {
  items: Array<{
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }>;
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onUpdatePrice: (productId: number, price: number) => void;
}

export default function SaleItemList({ 
  items, 
  onRemove, 
  onUpdateQuantity,
  onUpdatePrice 
}: SaleItemListProps) {
  if (items.length === 0) {
    return null;
  }

  const formatPrice = (price: number) => {
    return typeof price === 'number' ? price.toFixed(2) : '0.00';
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Producto</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Cantidad</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Precio</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Subtotal</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.productId}>
              <td className="px-4 py-2 text-sm">{item.productName}</td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.productId, Number(e.target.value))}
                  className="w-20 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => onUpdatePrice(item.productId, Number(e.target.value))}
                  className="w-24 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </td>
              <td className="px-4 py-2 text-sm">
                ${formatPrice(item.quantity * item.price)}
              </td>
              <td className="px-4 py-2">
                <button
                  type="button"
                  onClick={() => onRemove(item.productId)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}