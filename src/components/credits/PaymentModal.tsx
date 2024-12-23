import React from 'react';
import { useForm } from 'react-hook-form';
import { PaymentInput } from '../../hooks/useCredits';
import { Credit } from '../../types/database';
import { formatAmount } from '../../utils/formatters';

interface PaymentModalProps {
  credit: Credit;
  onSubmit: (data: PaymentInput) => Promise<void>;
  onClose: () => void;
}

export default function PaymentModal({ credit, onSubmit, onClose }: PaymentModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentInput>();

  const handleFormSubmit = (data: PaymentInput) => {
    if (Number(data.amount) > credit.remainingAmount) {
      alert('El monto del pago no puede ser mayor al saldo pendiente');
      return;
    }
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          Registrar Pago - {credit.clientName}
        </h2>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Monto Total</p>
            <p className="text-2xl font-bold text-gray-900">
              ${formatAmount(credit.price)}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Saldo Pendiente</p>
            <p className="text-2xl font-bold text-green-600">
              ${formatAmount(credit.remainingAmount)}
            </p>
          </div>
        </div>

        {credit.payments && credit.payments.length > 0 && (
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Pagos Anteriores</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {credit.payments.map((payment, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                  <div>
                    <span className="text-green-600 font-medium">
                      ${formatAmount(payment.amount)}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      {new Date(payment.createdAt).toLocaleString()}
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

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Monto del Pago</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                step="0.01"
                max={credit.remainingAmount}
                {...register('amount', { 
                  required: 'El monto es requerido',
                  min: { value: 0.01, message: 'El monto debe ser mayor a 0' },
                  max: { value: credit.remainingAmount, message: 'El monto no puede superar el saldo pendiente' }
                })}
                className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              />
            </div>
            {errors.amount && <span className="text-red-500 text-sm">{errors.amount.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Método de Pago</label>
            <select
              {...register('paymentMethod', { required: 'El método de pago es requerido' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            >
              <option value="cash">Efectivo</option>
              <option value="card">Tarjeta</option>
              <option value="transfer">Transferencia</option>
            </select>
            {errors.paymentMethod && <span className="text-red-500 text-sm">{errors.paymentMethod.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notas (opcional)</label>
            <textarea
              {...register('notes')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Registrar Pago
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}