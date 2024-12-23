import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Product } from '../types/database';

export interface ProductInput {
  code: string;
  name: string;
  categoryId: number;
  description?: string;
  costPrice: number;
  salePrice: number;
  stock: number;
  minStock: number;
  imageUrl?: string;
  notes?: string;
}

export function useProducts() {
  const products = useLiveQuery(() => 
    db.products
      .orderBy('name')
      .toArray()
  );

  const lowStockProducts = useLiveQuery(() =>
    db.products
      .filter(product => product.stock <= product.minStock)
      .toArray()
  );

  const addProduct = async (productData: ProductInput) => {
    // Validar código único
    const existingProduct = await db.products.where('code').equals(productData.code).first();
    if (existingProduct) {
      throw new Error('Ya existe un producto con este código');
    }

    return await db.products.add({
      ...productData,
      createdAt: new Date()
    });
  };

  const updateProduct = async (id: number, productData: Partial<ProductInput>) => {
    if (productData.code) {
      const existingProduct = await db.products
        .where('code')
        .equals(productData.code)
        .and(item => item.id !== id)
        .first();
        
      if (existingProduct) {
        throw new Error('Ya existe un producto con este código');
      }
    }

    return await db.products.update(id, productData);
  };

  const deleteProduct = async (id: number) => {
    // Verificar si el producto está en alguna venta
    const hasOrders = await db.saleItems.where('productId').equals(id).count();
    if (hasOrders > 0) {
      throw new Error('No se puede eliminar un producto que tiene ventas asociadas');
    }
    
    return await db.products.delete(id);
  };

  const updateStock = async (id: number, quantity: number) => {
    const product = await db.products.get(id);
    if (!product) throw new Error('Producto no encontrado');

    const newStock = product.stock + quantity;
    if (newStock < 0) throw new Error('Stock insuficiente');

    return await db.products.update(id, { stock: newStock });
  };

  return {
    products: products || [],
    lowStockProducts: lowStockProducts || [],
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock
  };
}