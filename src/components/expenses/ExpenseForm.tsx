import React from 'react';
import { useForm } from 'react-hook-form';
import { ExpenseInput } from '../../hooks/useExpenses';

interface ExpenseFormProps {
  onSubmit: (data: ExpenseInput) => Promise<void>;
  onCancel: () => void;
}

const EXPENSE_CATEGORIES = [
  'Servicios',
  'Suministros',
  'Mantenimiento',
  'Salarios',
  'Marketing',
  'Otros'
];

export default function ExpenseForm({ onSubmit, onCancel }: ExpenseFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ExpenseInput>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha</label>
        <input
          type="datetime-local"
          {...register('date', { required: 'La fecha es requerida' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
        {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <select
          {...register('category', { required: 'La categoría es requerida' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        >
          <option value="">Seleccionar categoría</option>
          {EXPENSE_CATEGORIES.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
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
              min: { value: 0.01, message: 'El monto debe ser mayor a 0' }
            })}
            className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>
        {errors.amount && <span className="text-red-500 text-sm">{errors.amount.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          {...register('description', { required: 'La descripción es requerida' })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        >
          Guardar Gasto
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