import React from 'react';
import { Staff } from '../../types/database';
import { Phone, Trash2, Edit, DollarSign } from 'lucide-react';

interface StaffListProps {
  staff: Staff[];
  onEdit: (staff: Staff) => void;
  onDelete: (id: number) => void;
  onViewCommission: (staff: Staff) => void;
}

export default function StaffList({ staff, onEdit, onDelete, onViewCommission }: StaffListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Código
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Teléfono
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {staff.map((member) => (
            <tr key={member.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {member.code}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {member.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <a 
                  href={`tel:${member.phone}`}
                  className="flex items-center text-pink-600 hover:text-pink-700"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  {member.phone}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onViewCommission(member)}
                  className="text-green-600 hover:text-green-700 mr-3"
                  title="Ver comisiones"
                >
                  <DollarSign className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onEdit(member)}
                  className="text-pink-600 hover:text-pink-700 mr-3"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => member.id && onDelete(member.id)}
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