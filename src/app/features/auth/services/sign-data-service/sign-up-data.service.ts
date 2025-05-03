import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpDataService {
  private doctorData = new BehaviorSubject<Doctor>(new Doctor());
  doctorData$ = this.doctorData.asObservable();

  private signUpData = new BehaviorSubject<AccountData>(new AccountData());
  signUpData$ = this.signUpData.asObservable();
  constructor() { }

  setDoctorData(data: Doctor) {
    this.doctorData.next(data); // update the data
  }

  getDoctorData() {
    return this.doctorData.value; // get the current data synchronously
  }

  setAccountDataData(data: AccountData) {
    this.signUpData.next(data); // update the data
  }

  getAccountDataData() {
    return this.signUpData.value; // get the current data synchronously
  }
}


export class Doctor
{
  constructor(
    public firstName: string = '',
    public middelName: string | null = null,
    public lastName: string = '',
    public gender: Gender = Gender.Male,
    public dateOfBirth: Date = new Date(),
    public phoneNumber: string = ''
  ) {}
}

export class AccountData {

  constructor(
    public email: string = '',
    public password: string = ''
  ) {}
}



export enum Gender {
  Male,
  Female
}
