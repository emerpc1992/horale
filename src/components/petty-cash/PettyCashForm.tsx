import React from 'react';
import { useForm } from 'react-hook-form';
import { PettyCashInput } from '../../hooks/usePettyCash';

interface PettyCashFormProps {
  onSubmit: (data: PettyCashInput) => Promise<void>;
  onCancel: () => void;
  currentBalance: number;
}

export default function PettyCashForm({ onSubmit, onCancel, currentBalance }: PettyCashFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<PettyCashInput>({
    defaultValues: {
      type: 'income',
      amount: 0
    }
  });

  const type = watch('type');

  const handleFormSubmit = async (data: PettyCashInput) => {
    try {
      await onSubmit({
        ...data,
        amount: Number(data.amount)
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo de Movimiento</label>
        <select
          {...register('type', { required: 'El tipo es requerido' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        >
          <option value="income">Entrada</option>
          <option value="expense">Salida</option>
        </select>
        {errors.type && <span className="text-red-500 text-sm">{errors.type.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Monto</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            step="0.01"
            {...register('amount', { 
              required: 'El monto es requerido',
              min: { value: 0.01, message: 'El monto debe ser mayor a 0' },
              max: type === 'expense' ? 
                { value: currentBalance, message: 'Monto mayor al saldo disponible' } : 
                undefined,
              valueAsNumber: true
            })}
            className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>
        {errors.amount && <span className="text-red-500 text-sm">{errors.amount.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Motivo</label>
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
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}