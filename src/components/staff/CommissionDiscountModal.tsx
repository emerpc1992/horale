import React from 'react';
import { useForm } from 'react-hook-form';

interface CommissionDiscountModalProps {
  onSubmit: (data: { amount: number; reason: string }) => void;
  onClose: () => void;
}

interface DiscountFormData {
  amount: string;
  reason: string;
}

export default function CommissionDiscountModal({ onSubmit, onClose }: CommissionDiscountModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<DiscountFormData>();

  const handleFormSubmit = (data: DiscountFormData) => {
    onSubmit({
      amount: Number(data.amount),
      reason: data.reason
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Aplicar Descuento a Comisión</h2>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Monto del Descuento</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                step="0.01"
                {...register('amount', { 
                  required: 'El monto es requerido',
                  min: { value: 0.01, message: 'El monto debe ser mayor a 0' }
                })}
                className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              />
            </div>
            {errors.amount && <span className="text-red-500 text-sm">{errors.amount.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Motivo del Descuento</label>
            <textarea
              {...register('reason', { required: 'El motivo es requerido' })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            />
            {errors.reason && <span className="text-red-500 text-sm">{errors.reason.message}</span>}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Aplicar Descuento
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