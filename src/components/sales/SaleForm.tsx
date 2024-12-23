import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Client } from '../../types/database';
import ProductSelector from './ProductSelector';
import StaffSelector from './StaffSelector';
import SaleItemList from './SaleItemList';
import ClientSearch from './ClientSearch';
import ClientFormModal from './ClientFormModal';

interface SaleFormProps {
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export default function SaleForm({ onSubmit, onCancel }: SaleFormProps) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [selectedItems, setSelectedItems] = useState<Array<{
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }>>([]);
  const [selectedStaff, setSelectedStaff] = useState<{ id: number; name: string } | null>(null);
  const [showNewClientForm, setShowNewClientForm] = useState(false);

  const subtotal = selectedItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  const handleClientSelect = (client: Client) => {
    setValue('clientName', client.name);
    setValue('clientPhone', client.phone);
  };

  const handleAddItem = (item: { productId: number; productName: string; quantity: number; price: number }) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handleRemoveItem = (productId: number) => {
    setSelectedItems(selectedItems.filter(item => item.productId !== productId));
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setSelectedItems(selectedItems.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    ));
  };

  const handleUpdatePrice = (productId: number, price: number) => {
    setSelectedItems(selectedItems.map(item =>
      item.productId === productId ? { ...item, price } : item
    ));
  };

  const handleFormSubmit = handleSubmit((data) => {
    if (!selectedStaff) {
      alert('Por favor seleccione un colaborador');
      return;
    }

    if (selectedItems.length === 0) {
      alert('Por favor agregue al menos un producto');
      return;
    }

    const formData = {
      ...data,
      items: selectedItems,
      staffId: selectedStaff.id,
      staffName: selectedStaff.name,
      subtotal,
      total: subtotal - Number(data.discount || 0),
      discount: Number(data.discount || 0),
      commission: Number(data.commission || 0)
    };

    onSubmit(formData);
  });

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <ClientSearch
        onSelectClient={handleClientSelect}
        onAddNewClient={() => setShowNewClientForm(true)}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Cliente</label>
          <input
            type="text"
            {...register('clientName', { required: 'El nombre del cliente es requerido' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
          {errors.clientName && <span className="text-red-500 text-sm">{errors.clientName.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono (opcional)</label>
          <input
            type="tel"
            {...register('clientPhone')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>
      </div>

      <StaffSelector
        selectedStaff={selectedStaff}
        onSelect={setSelectedStaff}
      />

      <ProductSelector
        selectedItems={selectedItems}
        onAddItem={handleAddItem}
      />

      <SaleItemList
        items={selectedItems}
        onRemove={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdatePrice={handleUpdatePrice}
      />

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Método de Pago</label>
          <select
            {...register('paymentMethod', { required: 'El método de pago es requerido' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          >
            <option value="cash">Efectivo</option>
            <option value="card">Tarjeta</option>
            <option value="transfer">Transferencia</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descuento</label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register('discount')}
            defaultValue="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Comisión (%)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="100"
            {...register('commission')}
            defaultValue="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notas (opcional)</label>
        <textarea
          {...register('notes')}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div className="text-right">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold text-gray-900">${subtotal.toFixed(2)}</p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={selectedItems.length === 0}
            className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Completar Venta
          </button>
        </div>
      </div>

      {showNewClientForm && (
        <ClientFormModal
          onSubmit={async (data) => {
            try {
              setShowNewClientForm(false);
              handleClientSelect(data as Client);
            } catch (error: any) {
              alert(error.message);
            }
          }}
          onClose={() => setShowNewClientForm(false)}
        />
      )}
    </form>
  );
}