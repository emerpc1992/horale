import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Appointment } from '../types/database';

export interface AppointmentInput {
  clientName: string;
  clientPhone: string;
  appointmentDate: Date;
  reservationCost: number;
  notes?: string;
}

export function useAppointments() {
  const appointments = useLiveQuery(() => 
    db.appointments
      .orderBy('appointmentDate')
      .toArray()
  );

  const addAppointment = async (appointmentData: AppointmentInput) => {
    // Validar que la fecha no esté ocupada
    const existingAppointment = await db.appointments
      .where('appointmentDate')
      .equals(appointmentData.appointmentDate)
      .first();

    if (existingAppointment) {
      throw new Error('Ya existe una cita para esta fecha y hora');
    }

    return await db.appointments.add({
      ...appointmentData,
      createdAt: new Date()
    });
  };

  const updateAppointment = async (id: number, appointmentData: Partial<AppointmentInput>) => {
    if (appointmentData.appointmentDate) {
      const existingAppointment = await db.appointments
        .where('appointmentDate')
        .equals(appointmentData.appointmentDate)
        .and(item => item.id !== id)
        .first();
        
      if (existingAppointment) {
        throw new Error('Ya existe una cita para esta fecha y hora');
      }
    }

    return await db.appointments.update(id, appointmentData);
  };

  const deleteAppointment = async (id: number) => {
    return await db.appointments.delete(id);
  };

  return {
    appointments: appointments || [],
    addAppointment,
    updateAppointment,
    deleteAppointment
  };
}