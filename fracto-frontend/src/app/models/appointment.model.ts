export interface Appointment {
  appointmentId: number;
  doctorName: string;
  specializationName: string;
  city: string;
  appointmentDate: Date;
  timeSlot: string;
  status: string;
  notes?: string;
  createdAt: Date;
}

export interface AppointmentCreate {
  doctorId: number;
  appointmentDate: Date;
  timeSlot: string;
  notes?: string;
}

export interface AppointmentUpdate {
  status?: string;
  notes?: string;
}

export interface AppointmentSearch {
  userId?: number;
  doctorId?: number;
  appointmentDate?: Date;
  status?: string;
}

export interface TimeSlot {
  timeSlot: string;
  isAvailable: boolean;
}
