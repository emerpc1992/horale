import React, { useState } from 'react';
import { Sale, SaleItem } from '../../types/database';
import { ChevronDown, ChevronUp, Ban } from 'lucide-react';

interface SaleListProps {
  sales: Sale[];
  onGetItems: (saleId: number) => Promise<SaleItem[]>;
  onCancel: (id: number) => void;
}

export default function SaleList({ sales, onGetItems, onCancel }: SaleListProps) {
  const [expandedSale, setExpandedSale] = useState<number | null>(null);
  const [items, setItems] = useState<SaleItem[]>([]);

  const handleExpand = async (saleId: number) => {
    if (expandedSale === saleId) {
      setExpandedSale(null);
      setItems([]);
    } else {
      const saleItems = await onGetItems(saleId);
      setItems(saleItems);
      setExpandedSale(saleId);
    }
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
              Cliente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Colaborador
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subtotal
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descuento
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Comisión
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sales.map((sale) => (
            <React.Fragment key={sale.id}>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(sale.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {sale.clientName}
                  {sale.clientPhone && (
                    <span className="text-gray-500 ml-2">({sale.clientPhone})</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {sale.staffName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${sale.subtotal.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                  -${sale.discount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${sale.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {sale.commission}% (${(sale.total * (sale.commission / 100)).toFixed(2)})
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    sale.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {sale.status === 'completed' ? 'Completada' : 'Cancelada'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleExpand(sale.id!)}
                    className="text-pink-600 hover:text-pink-700 mr-3"
                  >
                    {expandedSale === sale.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  {sale.status === 'completed' && (
                    <button
                      onClick={() => sale.id && onCancel(sale.id)}
                      className="text-red-600 hover:text-red-700"
                      title="Cancelar venta"
                    >
                      <Ban className="h-4 w-4" />
                    </button>
                  )}
                </td>
              </tr>
              {expandedSale === sale.id && (
                <tr>
                  <td colSpan={9} className="px-6 py-4 bg-gray-50">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Producto</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Cantidad</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Precio</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-2 text-sm text-gray-900">{item.productName}</td>
                            <td className="px-4 py-2 text-sm text-gray-500">{item.quantity}</td>
                            <td className="px-4 py-2 text-sm text-gray-500">${item.price.toFixed(2)}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">${item.subtotal.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {sale.notes && (
                      <div className="mt-2 text-sm text-gray-500">
                        <strong>Notas:</strong> {sale.notes}
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}