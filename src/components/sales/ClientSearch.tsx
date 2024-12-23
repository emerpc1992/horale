import React, { useState, useEffect } from 'react';
import { useClients } from '../../hooks/useClients';
import { Search, UserPlus } from 'lucide-react';
import { Client } from '../../types/database';

interface ClientSearchProps {
  onSelectClient: (client: Client) => void;
  onAddNewClient: () => void;
}

export default function ClientSearch({ onSelectClient, onAddNewClient }: ClientSearchProps) {
  const { clients } = useClients();
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredClients = clients.filter(client => {
    const search = searchTerm.toLowerCase();
    return (
      client.name.toLowerCase().includes(search) ||
      client.code.toLowerCase().includes(search)
    );
  });

  useEffect(() => {
    const handleClickOutside = () => setShowResults(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative" onClick={e => e.stopPropagation()}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar cliente por nombre o código..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
        <button
          type="button"
          onClick={onAddNewClient}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Nuevo Cliente
        </button>
      </div>

      {showResults && searchTerm && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
          {filteredClients.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <li
                  key={client.id}
                  onClick={() => {
                    onSelectClient(client);
                    setSearchTerm('');
                    setShowResults(false);
                  }}
                  className="cursor-pointer hover:bg-gray-50 px-4 py-2"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{client.name}</p>
                      <p className="text-sm text-gray-500">Código: {client.code}</p>
                    </div>
                    {client.phone && (
                      <p className="text-sm text-gray-500">{client.phone}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No se encontraron clientes
            </div>
          )}
        </div>
      )}
    </div>
  );
}