import React, { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { Trash2 } from 'lucide-react';

interface CategoryManagerProps {
  onClose: () => void;
}

export default function CategoryManager({ onClose }: CategoryManagerProps) {
  const [newCategory, setNewCategory] = useState('');
  const { categories, addCategory, deleteCategory } = useCategories();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      await addCategory(newCategory);
      setNewCategory('');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Gestionar Categorías</h2>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nueva categoría"
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
        >
          Agregar
        </button>
      </form>

      <ul className="divide-y divide-gray-200">
        {categories.map((category) => (
          <li key={category.id} className="py-3 flex justify-between items-center">
            <span>{category.name}</span>
            <button
              onClick={() => category.id && handleDelete(category.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={onClose}
        className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
      >
        Cerrar
      </button>
    </div>
  );
}