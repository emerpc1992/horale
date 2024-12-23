import React from 'react';
import { useForm } from 'react-hook-form';
import { ProductInput } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';

interface ProductFormProps {
  onSubmit: (data: ProductInput) => Promise<void>;
  initialData?: Partial<ProductInput>;
}

export default function ProductForm({ onSubmit, initialData }: ProductFormProps) {
  const { categories } = useCategories();
  const { register, handleSubmit, formState: { errors } } = useForm<ProductInput>({
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
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <select
          {...register('categoryId', { required: 'La categoría es requerida' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        >
          <option value="">Seleccionar categoría</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <span className="text-red-500 text-sm">{errors.categoryId.message}</span>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Precio de Costo</label>
          <input
            type="number"
            step="0.01"
            {...register('costPrice', { 
              required: 'El precio de costo es requerido',
              min: { value: 0, message: 'El precio debe ser mayor a 0' }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
          {errors.costPrice && <span className="text-red-500 text-sm">{errors.costPrice.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Precio de Venta</label>
          <input
            type="number"
            step="0.01"
            {...register('salePrice', { 
              required: 'El precio de venta es requerido',
              min: { value: 0, message: 'El precio debe ser mayor a 0' }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
          {errors.salePrice && <span className="text-red-500 text-sm">{errors.salePrice.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            {...register('stock', { 
              required: 'El stock es requerido',
              min: { value: 0, message: 'El stock no puede ser negativo' }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
          {errors.stock && <span className="text-red-500 text-sm">{errors.stock.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Stock Mínimo</label>
          <input
            type="number"
            {...register('minStock', { 
              required: 'El stock mínimo es requerido',
              min: { value: 0, message: 'El stock mínimo no puede ser negativo' }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
          {errors.minStock && <span className="text-red-500 text-sm">{errors.minStock.message}</span>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">URL de Imagen (opcional)</label>
        <input
          type="url"
          {...register('imageUrl')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notas (opcional)</label>
        <textarea
          {...register('notes')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
      >
        Guardar Producto
      </button>
    </form>
  );
}