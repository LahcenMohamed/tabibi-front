import { JobType } from "./employee";

export interface CreateEmployeeRequest {
  fullName: {
    firstName: string;
    middelName?: string;
    lastName: string;
  }
  phoneNumber: string;
  email?: string;
  address?: string;
  salary: number;
  jobType: JobType;
  description?: string;
}
