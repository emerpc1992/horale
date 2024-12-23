import React from 'react';
import { X, DollarSign, Calculator, CreditCard } from 'lucide-react';
import { Credit } from '../../types/database';
import { formatAmount } from '../../utils/formatters';

interface CreditReportModalProps {
  credit: Credit;
  onClose: () => void;
}

export default function CreditReportModal({ credit, onClose }: CreditReportModalProps) {
  // Cálculos básicos
  const totalCost = credit.costPrice || 0;
  const totalPrice = credit.price || 0;
  const paidAmount = credit.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  const remainingAmount = totalPrice - paidAmount;

  // Cálculo de ganancias
  const currentProfit = paidAmount - totalCost; // Ganancia actual: lo que ya se ha pagado menos el costo del producto
  const potentialProfit = totalPrice - totalCost; // Ganancia potencial: lo que podrías ganar si se paga el precio total

  // Porcentaje de avance
  const progressPercentage = (paidAmount / totalPrice) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Análisis de Crédito</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Información del Crédito */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Información General</h3>
            <div className="space-y-2">
              <p><span className="text-gray-600">Cliente:</span> {credit.clientName}</p>
              <p><span className="text-gray-600">Producto:</span> {credit.productName}</p>
              <p><span className="text-gray-600">Estado:</span> 
                <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  credit.status === 'paid' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {credit.status === 'paid' ? 'Pagado' : 'Pendiente'}
                </span>
              </p>
            </div>
          </div>

          {/* Métricas Principales */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-blue-600">Precio Total</p>
                <DollarSign className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">
                ${formatAmount(totalPrice)}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-green-600">Pagado</p>
                <CreditCard className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">
                ${formatAmount(paidAmount)}
              </p>
            </div>
          </div>

          {/* Barra de Progreso */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progreso del Pago</span>
              <span>{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Análisis de Ganancias */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="font-medium text-gray-900 flex items-center">
              <Calculator className="h-5 w-5 mr-2" />
              Análisis de Ganancias
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Costo del Producto</span>
                <span className="font-medium">${formatAmount(totalCost)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Ganancia Actual</span>
                <span className={`font-medium ${currentProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${formatAmount(currentProfit)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Ganancia Potencial</span>
                <span className={`font-medium ${potentialProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${formatAmount(potentialProfit)}
                </span>
              </div>

              <div className="pt-3 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monto Pendiente</span>
                  <span className="font-medium text-yellow-600">${formatAmount(remainingAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Historial de Pagos */}
          {credit.payments && credit.payments.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Historial de Pagos</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {credit.payments.map((payment, index) => (
                  <div key={index} className="flex justify-between items-center bg-white p-2 rounded-md">
                    <div>
                      <span className="text-green-600 font-medium">
                        ${formatAmount(payment.amount)}
                      </span>
                      <span className="text-gray-500 text-sm ml-2">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {payment.paymentMethod === 'cash' ? 'Efectivo' : 
                       payment.paymentMethod === 'card' ? 'Tarjeta' : 'Transferencia'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
