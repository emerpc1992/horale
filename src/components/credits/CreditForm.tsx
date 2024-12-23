import React from 'react';
import { useForm } from 'react-hook-form';
import { CreditInput } from '../../hooks/useCredits';
import ProductSearch from './ProductSearch';

interface CreditFormProps {
  onSubmit: (data: CreditInput) => Promise<void>;
  onCancel: () => void;
}

export default function CreditForm({ onSubmit, onCancel }: CreditFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CreditInput>();
  const selectedProduct = watch('productId');

  const handleProductSelect = (product: { id: number; name: string; price: number }) => {
    setValue('productId', product.id);
    setValue('productName', product.name);
    setValue('price', product.price);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre del Cliente</label>
        <input
          type="text"
          {...register('clientName', { required: 'El nombre es requerido' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
        {errors.clientName && <span className="text-red-500 text-sm">{errors.clientName.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
        <input
          type="tel"
          {...register('clientPhone', { required: 'El teléfono es requerido' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
        {errors.clientPhone && <span className="text-red-500 text-sm">{errors.clientPhone.message}</span>}
      </div>

      <ProductSearch onSelectProduct={handleProductSelect} />

      <input type="hidden" {...register('productId', { required: 'Debe seleccionar un producto' })} />
      <input type="hidden" {...register('productName')} />
      <input type="hidden" {...register('price')} />

      {errors.productId && <span className="text-red-500 text-sm block">Debe seleccionar un producto</span>}

      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha de Pago</label>
        <input
          type="datetime-local"
          {...register('dueDate', { required: 'La fecha de pago es requerida' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
        {errors.dueDate && <span className="text-red-500 text-sm">{errors.dueDate.message}</span>}
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
          Guardar Crédito
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