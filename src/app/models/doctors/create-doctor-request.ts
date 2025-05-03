import { Specialization } from "../../features/auth/create-clinic/create-clinic.component";
import { Gender } from "../../features/auth/services/sign-data-service/sign-up-data.service";

export interface CreateDoctorRequets{
  fullName: {
    firstName: string;
    middelName: string | null;
    lastName: string;
  };
  gender: Gender;
  dateOfBirth: Date;
  phoneNumber: string;
  emailAddress: string;
  notes: string | null;
  name: string;
  specialization: Specialization;
  clinicPhoneNumber: string;
  secondPhoneNumber: string | null;
  clinicEmail: string;
  address: {
    state: string;
    city: string;
    street: string;
    urlOnMap: string | null;
  };
  minDescription: string | null;
  userId: string;
}
