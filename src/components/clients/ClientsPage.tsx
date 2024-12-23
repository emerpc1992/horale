import React, { useState } from 'react';
import { Plus, Users, Search } from 'lucide-react';
import { useClients } from '../../hooks/useClients';
import ClientList from './ClientList';
import ClientForm from './ClientForm';
import { Client } from '../../types/database';

export default function ClientsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { clients, addClient, updateClient, deleteClient } = useClients();

  const handleSubmit = async (data: any) => {
    try {
      if (editingClient?.id) {
        await updateClient(editingClient.id, data);
      } else {
        await addClient(data);
      }
      setShowForm(false);
      setEditingClient(null);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este cliente?')) {
      try {
        await deleteClient(id);
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  const filteredClients = clients.filter(client => {
    const searchLower = searchTerm.toLowerCase();
    return (
      client.name.toLowerCase().includes(searchLower) ||
      client.code.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-pink-600" />
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Cliente
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar por nombre o código..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}
            </h2>
            <ClientForm
              onSubmit={handleSubmit}
              initialData={editingClient || undefined}
              onCancel={() => {
                setShowForm(false);
                setEditingClient(null);
              }}
            />
          </div>
        </div>
      )}

      <ClientList
        clients={filteredClients}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}