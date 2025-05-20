import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Patient } from '../../models/patients/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  // since Patient is an interface, we can't `new Patient()`
  // start with null or an empty object
  private patientSubject = new BehaviorSubject<Patient | null>(null);
  patient$ = this.patientSubject.asObservable();

  constructor() { }

  /** Update the current patient */
  setData(data: Patient): void {
    this.patientSubject.next(data);
  }

  /** Synchronously get the current patient (or null) */
  getData(): Patient | null {
    return this.patientSubject.value;
  }
}
