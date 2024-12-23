import React from 'react';
import { useForm } from 'react-hook-form';
import { ClientInput } from '../../hooks/useClients';

interface ClientFormProps {
  onSubmit: (data: ClientInput) => Promise<void>;
  initialData?: Partial<ClientInput>;
  onCancel: () => void;
}

export default function ClientForm({ onSubmit, initialData, onCancel }: ClientFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ClientInput>({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Código</label>
        <input
          type="text"
          {...register('code', { required: 'El código es requerido' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
        {errors.code && <span className="text-red-500 text-sm">{errors.code.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          {...register('name', { required: 'El nombre es requerido' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
        <input
          type="tel"
          {...register('phone', { required: 'El teléfono es requerido' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
        {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
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
          Guardar Cliente
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