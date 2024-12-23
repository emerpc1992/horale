import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { PettyCash } from '../types/database';

export interface PettyCashInput {
  type: 'income' | 'expense';
  amount: number;
  reason: string;
}

export function usePettyCash() {
  const transactions = useLiveQuery(() => 
    db.pettyCash
      .orderBy('createdAt')
      .reverse()
      .toArray()
  );

  // Calculate balance from all transactions
  const balance = useLiveQuery(async () => {
    const all = await db.pettyCash.toArray();
    return all.reduce((acc, curr) => {
      const amount = Number(curr.amount) || 0;
      return curr.type === 'income' ? acc + amount : acc - amount;
    }, 0);
  }, []);

  const addTransaction = async (data: PettyCashInput) => {
    try {
      // Convert amount to number and validate
      const amount = Number(data.amount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error('El monto debe ser mayor a 0');
      }

      // For expenses, check if there's enough balance
      if (data.type === 'expense') {
        const currentBalance = await balance;
        if (typeof currentBalance !== 'number' || currentBalance < amount) {
          throw new Error('Saldo insuficiente en caja chica');
        }
      }

      // Add transaction with numeric amount
      await db.pettyCash.add({
        ...data,
        amount,
        createdAt: new Date()
      });

    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  };

  const clearHistory = async () => {
    return await db.transaction('rw', db.pettyCash, async () => {
      await db.pettyCash.clear();
    });
  };

  return {
    transactions: transactions || [],
    balance: typeof balance === 'number' ? balance : 0,
    addTransaction,
    clearHistory
  };
}