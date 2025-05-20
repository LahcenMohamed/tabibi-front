export interface WorkSchedule {
  id: string;
  date: Date;
  maxAppointmentsCount: number;
}

export interface CreateWorkSchedule {
  date: string;
  maxAppointmentsCount: number;
}
