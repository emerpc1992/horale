import React from 'react';
import { useForm } from 'react-hook-form';
import { AppointmentInput } from '../../hooks/useAppointments';

interface AppointmentFormProps {
  onSubmit: (data: AppointmentInput) => Promise<void>;
  initialData?: Partial<AppointmentInput>;
  onCancel: () => void;
}

export default function AppointmentForm({ onSubmit, initialData, onCancel }: AppointmentFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<AppointmentInput>({
    defaultValues: {
      ...initialData,
      appointmentDate: initialData?.appointmentDate 
        ? new Date(initialData.appointmentDate).toISOString().slice(0, 16)
        : undefined
    }
  });

  const handleFormSubmit = (data: any) => {
    onSubmit({
      ...data,
      appointmentDate: new Date(data.appointmentDate),
      reservationCost: Number(data.reservationCost)
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre del Cliente</label>
        <input
          type="text"
          {...register('clientName', { required: 'El nombre es requerido' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
        {errors.clientName && <span className="text-red-500 text-sm">{errors.clientName.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
        <input
          type="tel"
          {...register('clientPhone', { required: 'El teléfono es requerido' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
        {errors.clientPhone && <span className="text-red-500 text-sm">{errors.clientPhone.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha y Hora</label>
        <input
          type="datetime-local"
          {...register('appointmentDate', { required: 'La fecha y hora son requeridas' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
        {errors.appointmentDate && <span className="text-red-500 text-sm">{errors.appointmentDate.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Costo de Reserva</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            step="0.01"
            {...register('reservationCost', { 
              required: 'El costo es requerido',
              min: { value: 0, message: 'El costo debe ser mayor o igual a 0' }
            })}
            className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>
        {errors.reservationCost && <span className="text-red-500 text-sm">{errors.reservationCost.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notas (opcional)</label>
        <textarea
          {...register('notes')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        >
          Guardar Cita
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}