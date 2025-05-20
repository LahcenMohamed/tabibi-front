import { Gender } from "../../features/auth/services/sign-data-service/sign-up-data.service";

export interface Patient {
  id: string;
  fullName: string;
  gender: Gender; // You'll need to define the Gender enum
  birthDate: string; // DateOnly => use ISO date string: 'YYYY-MM-DD'
  state?: string;
  city?: string;
  phoneNumber?: string;
  email?: string;
}

export enum AppointmentStatus {
  Canceld = 0,
  Panding = 1,
  Confirmed = 2
}

