import React, { useState } from 'react';
import { Plus, Package } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import CategoryManager from './CategoryManager';
import { Product } from '../../types/database';

export default function ProductsPage() {
  const [showForm, setShowForm] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  const handleAddProduct = async (data: any) => {
    try {
      if (editingProduct?.id) {
        await updateProduct(editingProduct.id, data);
      } else {
        await addProduct(data);
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este producto?')) {
      try {
        await deleteProduct(id);
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Package className="h-6 w-6 text-pink-600" />
          <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => setShowCategories(true)}
            className="px-4 py-2 text-sm font-medium text-pink-600 bg-pink-50 rounded-md hover:bg-pink-100"
          >
            Gestionar Categorías
          </button>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Producto
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <ProductForm 
              onSubmit={handleAddProduct} 
              initialData={editingProduct || undefined}
            />
            <button
              onClick={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
              className="mt-4 w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {showCategories && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <CategoryManager onClose={() => setShowCategories(false)} />
          </div>
        </div>
      )}

      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}