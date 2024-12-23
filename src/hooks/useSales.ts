import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Sale, SaleItem } from '../types/database';

export interface SaleInput {
  clientName: string;
  clientPhone?: string;
  staffId: number;
  staffName: string;
  commission: number;
  discount: number;
  paymentMethod: 'cash' | 'card' | 'transfer';
  items: {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }[];
  notes?: string;
}

export function useSales() {
  const sales = useLiveQuery(async () => {
    // Get all sales
    const allSales = await db.sales
      .orderBy('createdAt')
      .reverse()
      .toArray();

    // Get items for each sale
    const salesWithItems = await Promise.all(
      allSales.map(async (sale) => {
        const items = await db.saleItems
          .where('saleId')
          .equals(sale.id!)
          .toArray();
        return { ...sale, items };
      })
    );

    return salesWithItems;
  });

  const getSaleItems = async (saleId: number) => {
    return await db.saleItems
      .where('saleId')
      .equals(saleId)
      .toArray();
  };

  const addSale = async (saleData: SaleInput) => {
    return await db.transaction('rw', db.sales, db.saleItems, db.products, async () => {
      // Calculate subtotal
      const subtotal = saleData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
      
      // Apply discount
      const total = subtotal - saleData.discount;

      // Create sale
      const saleId = await db.sales.add({
        clientName: saleData.clientName,
        clientPhone: saleData.clientPhone,
        staffId: saleData.staffId,
        staffName: saleData.staffName,
        commission: saleData.commission,
        discount: saleData.discount,
        subtotal,
        total,
        paymentMethod: saleData.paymentMethod,
        status: 'completed',
        notes: saleData.notes,
        createdAt: new Date().toISOString()
      });

      // Add sale items and update product stock
      for (const item of saleData.items) {
        // Get product to get its cost price
        const product = await db.products.get(item.productId);
        if (!product) {
          throw new Error(`Producto no encontrado: ${item.productName}`);
        }

        // Add sale item with cost price
        await db.saleItems.add({
          saleId,
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
          costPrice: product.costPrice, // Save the cost price
          subtotal: item.quantity * item.price
        });

        // Update product stock
        await db.products
          .where('id')
          .equals(item.productId)
          .modify(product => {
            if (product.stock < item.quantity) {
              throw new Error(`Stock insuficiente para ${item.productName}`);
            }
            product.stock -= item.quantity;
          });
      }

      return saleId;
    });
  };

  const cancelSale = async (id: number) => {
    return await db.transaction('rw', db.sales, db.saleItems, db.products, async () => {
      // Get sale items
      const items = await getSaleItems(id);

      // Restore product stock
      for (const item of items) {
        await db.products
          .where('id')
          .equals(item.productId)
          .modify(product => {
            product.stock += item.quantity;
          });
      }

      // Update sale status
      await db.sales.update(id, { status: 'cancelled' });
    });
  };

  const clearStaffCommissions = async (staffId: number) => {
    return await db.transaction('rw', db.sales, async () => {
      const staffSales = await db.sales
        .where('staffId')
        .equals(staffId)
        .toArray();

      for (const sale of staffSales) {
        await db.sales.update(sale.id!, { commission: 0 });
      }
    });
  };

  return {
    sales: sales || [],
    getSaleItems,
    addSale,
    cancelSale,
    clearStaffCommissions
  };
}