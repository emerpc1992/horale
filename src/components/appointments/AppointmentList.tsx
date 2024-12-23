import React from 'react';
import { Appointment } from '../../types/database';
import { Phone, Trash2, Edit, Calendar } from 'lucide-react';

interface AppointmentListProps {
  appointments: Appointment[];
  onEdit: (appointment: Appointment) => void;
  onDelete: (id: number) => void;
}

export default function AppointmentList({ appointments, onEdit, onDelete }: AppointmentListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Teléfono
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha y Hora
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reserva
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notas
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {appointment.clientName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <a 
                  href={`tel:${appointment.clientPhone}`}
                  className="flex items-center text-pink-600 hover:text-pink-700"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  {appointment.clientPhone}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-pink-600" />
                  {new Date(appointment.appointmentDate).toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${appointment.reservationCost.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                {appointment.notes}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(appointment)}
                  className="text-pink-600 hover:text-pink-700 mr-3"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => appointment.id && onDelete(appointment.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}