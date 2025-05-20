import { Gender } from "../../features/auth/services/sign-data-service/sign-up-data.service";
import { AppointmentStatus, Patient } from "../patients/patient";

export interface Appointment {
  id: string;
  number: number;
  status: AppointmentStatus;
  patientId: string;
  patient: Patient;
}
