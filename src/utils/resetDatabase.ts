import Dexie from 'dexie';
import { db } from '../db';

export async function resetDatabase() {
  try {
    // Only initialize database if it doesn't exist
    const dbExists = await Dexie.exists('salonDB');
    if (!dbExists) {
      await db.open();
      
      // Add default user
      await db.users.add({
        username: 'admin',
        password: 'admin',
        role: 'admin',
        createdAt: new Date().toISOString()
      });

      // Add default categories
      const categories = await db.categories.bulkAdd([
        { name: 'Maquillaje', createdAt: new Date().toISOString() },
        { name: 'Cuidado del Cabello', createdAt: new Date().toISOString() },
        { name: 'Cuidado de la Piel', createdAt: new Date().toISOString() }
      ], { allKeys: true });

      // Add default products
      if (categories && categories.length > 0) {
        await db.products.bulkAdd([
          {
            code: 'MQ001',
            name: 'Base de Maquillaje',
            categoryId: categories[0],
            description: 'Base de maquillaje de larga duración',
            costPrice: 150,
            salePrice: 300,
            stock: 10,
            minStock: 3,
            createdAt: new Date().toISOString()
          },
          {
            code: 'CC001',
            name: 'Shampoo Profesional',
            categoryId: categories[1],
            description: 'Shampoo para cabello tratado',
            costPrice: 200,
            salePrice: 400,
            stock: 15,
            minStock: 5,
            createdAt: new Date().toISOString()
          },
          {
            code: 'CP001',
            name: 'Crema Hidratante',
            categoryId: categories[2],
            description: 'Crema hidratante facial',
            costPrice: 100,
            salePrice: 250,
            stock: 20,
            minStock: 5,
            createdAt: new Date().toISOString()
          }
        ]);
      }

      // Add default staff member
      await db.staff.add({
        code: 'STAFF001',
        name: 'Administrador',
        phone: '123456789',
        createdAt: new Date().toISOString()
      });

      console.log('Database initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}