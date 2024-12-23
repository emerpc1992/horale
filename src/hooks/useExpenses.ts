import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Expense } from '../types/database';

export interface ExpenseInput {
  date: Date;
  category: string;
  amount: number;
  description: string;
}

export function useExpenses() {
  const expenses = useLiveQuery(() => 
    db.expenses
      .orderBy('date')
      .reverse()
      .toArray()
  );

  // Calculate total from all expenses
  const totalExpenses = useLiveQuery(async () => {
    const all = await db.expenses.toArray();
    return all.reduce((acc, curr) => {
      const amount = Number(curr.amount) || 0;
      return acc + amount;
    }, 0);
  }, []);

  const addExpense = async (data: ExpenseInput) => {
    try {
      // Convert amount to number and validate
      const amount = Number(data.amount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error('El monto debe ser mayor a 0');
      }

      // Add expense with numeric amount
      await db.expenses.add({
        ...data,
        amount,
        createdAt: new Date()
      });

    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  };

  const deleteExpense = async (id: number) => {
    return await db.expenses.delete(id);
  };

  const clearHistory = async () => {
    return await db.transaction('rw', db.expenses, async () => {
      await db.expenses.clear();
    });
  };

  return {
    expenses: expenses || [],
    totalExpenses: typeof totalExpenses === 'number' ? totalExpenses : 0,
    addExpense,
    deleteExpense,
    clearHistory
  };
}