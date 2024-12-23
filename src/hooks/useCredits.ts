import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Credit, Payment } from '../types/database';
import { formatDate } from '../utils/formatters';

export interface CreditInput {
  clientName: string;
  clientPhone: string;
  productId: number;
  productName: string;
  price: number;
  dueDate: Date;
  notes?: string;
}

export interface PaymentInput {
  amount: number;
  paymentMethod: 'cash' | 'card' | 'transfer';
  notes?: string;
}

export function useCredits() {
  const credits = useLiveQuery(async () => {
    const allCredits = await db.credits.toArray();
    
    // Get payments for each credit
    const creditsWithPayments = await Promise.all(
      allCredits.map(async (credit) => {
        const payments = await db.payments
          .where('creditId')
          .equals(credit.id!)
          .toArray();
        
        return {
          ...credit,
          payments
        };
      })
    );

    return creditsWithPayments;
  });

  const addCredit = async (data: CreditInput) => {
    // Get product to get its cost price
    const product = await db.products.get(data.productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    // Format the date as ISO string
    const formattedDueDate = formatDate(data.dueDate);

    return await db.credits.add({
      clientName: data.clientName,
      clientPhone: data.clientPhone,
      productId: data.productId,
      productName: data.productName,
      costPrice: product.costPrice,
      price: data.price,
      remainingAmount: data.price,
      status: 'pending',
      dueDate: formattedDueDate,
      notes: data.notes,
      createdAt: new Date().toISOString()
    });
  };

  const addPayment = async (creditId: number, paymentData: PaymentInput) => {
    return await db.transaction('rw', db.credits, db.payments, async () => {
      const credit = await db.credits.get(creditId);
      if (!credit) throw new Error('Crédito no encontrado');

      if (paymentData.amount > credit.remainingAmount) {
        throw new Error('El monto del pago excede el saldo pendiente');
      }

      // Add payment
      await db.payments.add({
        creditId,
        amount: paymentData.amount,
        paymentMethod: paymentData.paymentMethod,
        notes: paymentData.notes,
        createdAt: new Date().toISOString()
      });

      // Update credit
      const newRemainingAmount = credit.remainingAmount - paymentData.amount;
      await db.credits.update(creditId, {
        remainingAmount: newRemainingAmount,
        status: newRemainingAmount <= 0 ? 'paid' : 'pending'
      });
    });
  };

  const deleteCredit = async (id: number) => {
    return await db.transaction('rw', db.credits, db.payments, async () => {
      // Delete all payments for this credit
      await db.payments.where('creditId').equals(id).delete();
      // Delete the credit
      await db.credits.delete(id);
    });
  };

  return {
    credits: credits || [],
    addCredit,
    addPayment,
    deleteCredit
  };
}