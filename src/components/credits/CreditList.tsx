import React from 'react';
import { Credit } from '../../types/database';
import { Phone, Trash2, Edit, CreditCard, Calculator } from 'lucide-react';
import { formatAmount } from '../../utils/formatters';

interface CreditListProps {
  credits: Credit[];
  onEdit: (credit: Credit) => void;
  onDelete: (id: number) => void;
  onAddPayment: (credit: Credit) => void;
  onViewReport: (credit: Credit) => void;
}

export default function CreditList({ credits, onEdit, onDelete, onAddPayment, onViewReport }: CreditListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Código
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Producto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio
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
          {credits.map((credit) => (
            <tr key={credit.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {credit.code}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div>
                  {credit.clientName}
                  {credit.clientPhone && (
                    <a 
                      href={`tel:${credit.clientPhone}`}
                      className="flex items-center text-pink-600 hover:text-pink-700 mt-1"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      {credit.clientPhone}
                    </a>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {credit.productName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${formatAmount(credit.price)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  credit.status === 'paid' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {credit.status === 'paid' ? 'Pagado' : 'Pendiente'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                {credit.status === 'pending' && (
                  <>
                    <button
                      onClick={() => onEdit(credit)}
                      className="text-pink-600 hover:text-pink-700"
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onAddPayment(credit)}
                      className="text-green-600 hover:text-green-700"
                      title="Agregar Pago"
                    >
                      <CreditCard className="h-4 w-4" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => onViewReport(credit)}
                  className="text-blue-600 hover:text-blue-700"
                  title="Ver Reporte"
                >
                  <Calculator className="h-4 w-4" />
                </button>
                <button
                  onClick={() => credit.id && onDelete(credit.id)}
                  className="text-red-600 hover:text-red-700"
                  title="Eliminar"
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