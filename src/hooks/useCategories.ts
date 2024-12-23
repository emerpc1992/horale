import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Category } from '../types/database';

export function useCategories() {
  const categories = useLiveQuery(() => db.categories.toArray());

  const addCategory = async (name: string, description?: string) => {
    return await db.categories.add({
      name,
      description,
      createdAt: new Date()
    });
  };

  const deleteCategory = async (id: number) => {
    const hasProducts = await db.products.where('categoryId').equals(id).count();
    if (hasProducts > 0) {
      throw new Error('No se puede eliminar una categoría que tiene productos asociados');
    }
    return await db.categories.delete(id);
  };

  return {
    categories: categories || [],
    addCategory,
    deleteCategory
  };
}