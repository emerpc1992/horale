import React, { useState } from 'react';
import { Plus, UserCircle } from 'lucide-react';
import { useStaff } from '../../hooks/useStaff';
import StaffList from './StaffList';
import StaffForm from './StaffForm';
import CommissionModal from './CommissionModal';
import { Staff } from '../../types/database';

export default function StaffPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const { staff, addStaff, updateStaff, deleteStaff } = useStaff();

  const handleSubmit = async (data: any) => {
    try {
      if (editingStaff?.id) {
        await updateStaff(editingStaff.id, data);
      } else {
        await addStaff(data);
      }
      setShowForm(false);
      setEditingStaff(null);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleEdit = (member: Staff) => {
    setEditingStaff(member);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este colaborador?')) {
      try {
        await deleteStaff(id);
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  const handleViewCommission = (member: Staff) => {
    setSelectedStaff(member);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <UserCircle className="h-6 w-6 text-pink-600" />
          <h1 className="text-2xl font-bold text-gray-900">Colaboradores</h1>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Colaborador
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingStaff ? 'Editar Colaborador' : 'Nuevo Colaborador'}
            </h2>
            <StaffForm
              onSubmit={handleSubmit}
              initialData={editingStaff || undefined}
              onCancel={() => {
                setShowForm(false);
                setEditingStaff(null);
              }}
            />
          </div>
        </div>
      )}

      {selectedStaff && (
        <CommissionModal
          staff={selectedStaff}
          onClose={() => setSelectedStaff(null)}
        />
      )}

      <StaffList
        staff={staff}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewCommission={handleViewCommission}
      />
    </div>
  );
}