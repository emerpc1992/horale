import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Client } from '../types/database';

export interface ClientInput {
  code: string;
  name: string;
  phone: string;
  notes?: string;
}

export function useClients() {
  const clients = useLiveQuery(() => 
    db.clients
      .orderBy('name')
      .toArray()
  );

  const addClient = async (clientData: ClientInput) => {
    const existingClient = await db.clients.where('code').equals(clientData.code).first();
    if (existingClient) {
      throw new Error('Ya existe un cliente con este código');
    }

    return await db.clients.add({
      ...clientData,
      createdAt: new Date()
    });
  };

  const updateClient = async (id: number, clientData: Partial<ClientInput>) => {
    if (clientData.code) {
      const existingClient = await db.clients
        .where('code')
        .equals(clientData.code)
        .and(item => item.id !== id)
        .first();
        
      if (existingClient) {
        throw new Error('Ya existe un cliente con este código');
      }
    }

    return await db.clients.update(id, clientData);
  };

  const deleteClient = async (id: number) => {
    return await db.clients.delete(id);
  };

  return {
    clients: clients || [],
    addClient,
    updateClient,
    deleteClient
  };
}