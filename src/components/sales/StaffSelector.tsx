import React from 'react';
import { useStaff } from '../../hooks/useStaff';

interface StaffSelectorProps {
  selectedStaff: { id: number; name: string } | null;
  onSelect: (staff: { id: number; name: string } | null) => void;
}

export default function StaffSelector({ selectedStaff, onSelect }: StaffSelectorProps) {
  const { staff } = useStaff();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Colaborador</label>
      <select
        value={selectedStaff?.id || ''}
        onChange={(e) => {
          const selected = staff.find(s => s.id === Number(e.target.value));
          onSelect(selected ? { id: selected.id!, name: selected.name } : null);
        }}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
      >
        <option value="">Seleccionar colaborador</option>
        {staff.map(member => (
          <option key={member.id} value={member.id}>
            {member.name}
          </option>
        ))}
      </select>
    </div>
  );
}