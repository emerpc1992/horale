import Dexie, { Table } from 'dexie';
import { User, Product, Category, Client, Staff, Appointment, Credit, PettyCash, Expense, Sale, SaleItem, Payment } from '../types/database';

export class SalonDatabase extends Dexie {
  users!: Table<User>;
  categories!: Table<Category>;
  products!: Table<Product>;
  clients!: Table<Client>;
  staff!: Table<Staff>;
  appointments!: Table<Appointment>;
  credits!: Table<Credit>;
  payments!: Table<Payment>;
  pettyCash!: Table<PettyCash>;
  expenses!: Table<Expense>;
  sales!: Table<Sale>;
  saleItems!: Table<SaleItem>;

  constructor() {
    super('salonDB');
    
    this.version(23).stores({
      users: '++id, username, password',
      categories: '++id, name',
      products: '++id, code, name, categoryId, stock, minStock, costPrice, salePrice',
      clients: '++id, code, name, phone',
      staff: '++id, code, name, phone',
      appointments: '++id, clientName, appointmentDate',
      credits: '++id, clientName, clientPhone, productId, productName, costPrice, price, remainingAmount, status, dueDate, createdAt',
      payments: '++id, creditId, amount, paymentMethod, createdAt',
      pettyCash: '++id, type, amount, createdAt',
      expenses: '++id, category, amount, date',
      sales: '++id, clientName, staffId, total, status, createdAt',
      saleItems: '++id, saleId, productId, productName, quantity, price, costPrice, subtotal'
    });
  }
}