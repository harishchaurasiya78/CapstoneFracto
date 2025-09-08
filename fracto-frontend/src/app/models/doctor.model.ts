export interface Doctor {
  doctorId: number;
  name: string;
  specializationName: string;
  city: string;
  rating: number;
  bio?: string;
  profileImagePath?: string;
  email?: string;
  phone?: string;
  isActive: boolean;
}

export interface DoctorCreate {
  name: string;
  specializationId: number;
  city: string;
  bio?: string;
  email?: string;
  phone?: string;
}

export interface DoctorUpdate {
  name?: string;
  specializationId?: number;
  city?: string;
  bio?: string;
  email?: string;
  phone?: string;
  isActive?: boolean;
}

export interface DoctorSearch {
  city?: string;
  specializationId?: number;
  appointmentDate?: Date;
  minRating?: number;
}

export interface Specialization {
  specializationId: number;
  specializationName: string;
  description?: string;
}
