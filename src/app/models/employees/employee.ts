export interface Employee {
  id: string;
  firstName: string;
  middelName?: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  salary: number;
  jobType: JobType;
  description?: string;
}



export enum JobType
{
    Doctor,
    Nurse,
    NursingAssistant,
    Receptionist,
    Janitor,
    Other
}
