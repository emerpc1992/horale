import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Staff } from '../types/database';

export interface StaffInput {
  code: string;
  name: string;
  phone: string;
}

export function useStaff() {
  const staff = useLiveQuery(() => 
    db.staff
      .orderBy('name')
      .toArray()
  );

  const addStaff = async (staffData: StaffInput) => {
    const existingStaff = await db.staff.where('code').equals(staffData.code).first();
    if (existingStaff) {
      throw new Error('Ya existe un colaborador con este código');
    }

    return await db.staff.add({
      ...staffData,
      createdAt: new Date()
    });
  };

  const updateStaff = async (id: number, staffData: Partial<StaffInput>) => {
    if (staffData.code) {
      const existingStaff = await db.staff
        .where('code')
        .equals(staffData.code)
        .and(item => item.id !== id)
        .first();
        
      if (existingStaff) {
        throw new Error('Ya existe un colaborador con este código');
      }
    }

    return await db.staff.update(id, staffData);
  };

  const deleteStaff = async (id: number) => {
    return await db.staff.delete(id);
  };

  return {
    staff: staff || [],
    addStaff,
    updateStaff,
    deleteStaff
  };
}