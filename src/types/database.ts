export interface Payment {
  id?: number;
  creditId: number;
  amount: number;
  paymentMethod: 'cash' | 'card' | 'transfer';
  notes?: string;
  createdAt: string;
}

export interface Credit {
  id?: number;
  code: string;
  clientName: string;
  clientPhone: string;
  productId: number;
  productName: string;
  costPrice: number;
  price: number;
  remainingAmount: number;
  status: 'pending' | 'paid';
  dueDate: string;
  notes?: string;
  payments: Payment[];
  createdAt: string;
}

// Keep other interfaces unchanged...