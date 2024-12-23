import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { formatAmount } from '../../utils/formatters';

export default function InventoryReport() {
  const { products, lowStockProducts } = useProducts();
  const { categories } = useCategories();

  const totalValue = products.reduce((sum, product) => 
    sum + (product.costPrice * product.stock), 0
  );

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Sin categoría';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Productos</p>
          <p className="text-2xl font-bold text-gray-900">{products.length}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-600">Stock Bajo</p>
          <p className="text-2xl font-bold text-yellow-600">{lowStockProducts.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600">Valor del Inventario</p>
          <p className="text-2xl font-bold text-green-600">${formatAmount(totalValue)}</p>
        </div>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Código</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Producto</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Categoría</th>
              <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Stock</th>
              <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Costo</th>
              <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {products.map((product) => (
              <tr key={product.id} className={product.stock <= product.minStock ? 'bg-yellow-50' : ''}>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {product.code}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {product.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {getCategoryName(product.categoryId)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                  {product.stock}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                  ${formatAmount(product.costPrice)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-medium text-green-600">
                  ${formatAmount(product.costPrice * product.stock)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}