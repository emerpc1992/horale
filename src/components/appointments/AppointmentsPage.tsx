import React, { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';
import { useAppointments } from '../../hooks/useAppointments';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';
import { Appointment } from '../../types/database';

export default function AppointmentsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const { appointments, addAppointment, updateAppointment, deleteAppointment } = useAppointments();

  const handleSubmit = async (data: any) => {
    try {
      if (editingAppointment?.id) {
        await updateAppointment(editingAppointment.id, data);
      } else {
        await addAppointment(data);
      }
      setShowForm(false);
      setEditingAppointment(null);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar esta cita?')) {
      try {
        await deleteAppointment(id);
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-pink-600" />
          <h1 className="text-2xl font-bold text-gray-900">Citas</h1>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Cita
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingAppointment ? 'Editar Cita' : 'Nueva Cita'}
            </h2>
            <AppointmentForm
              onSubmit={handleSubmit}
              initialData={editingAppointment || undefined}
              onCancel={() => {
                setShowForm(false);
                setEditingAppointment(null);
              }}
            />
          </div>
        </div>
      )}

      <AppointmentList
        appointments={appointments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}