import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CustomInputComponent } from '../../../shared/componenets/custom-input/custom-input.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-doctor',
  imports: [

    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    CustomInputComponent

  ],
  templateUrl: './create-doctor.component.html',
  styleUrl: './create-doctor.component.scss'
})
export class CreateDoctorComponent {
  doctorForm!: FormGroup;
  firstName!: FormControl;
  middelName!: FormControl;
  lastName!: FormControl;
  gender!: FormControl;
  dateOfBirth!: FormControl;
  phoneNumber!: FormControl;
  email!: FormControl;

  // create an array of the enum values for *ngFor
  public genderOptions = Object.values(Gender);

  constructor(private router: Router) {
    this.initFormControls();
    this.initFormGroup();
  }
  private initFormControls(): void {
    this.firstName   = new FormControl('', { nonNullable: true,  validators: [Validators.required, Validators.maxLength(100)] });
    this.middelName  = new FormControl('', { nonNullable: false, validators: [Validators.maxLength(100)] });
    this.lastName    = new FormControl('', { nonNullable: true,  validators: [Validators.required, Validators.maxLength(100)] });

    // initialize gender and dateOfBirth before using them in the group
    this.gender      = new FormControl('', { nonNullable: true,  validators: [Validators.required] });
    this.dateOfBirth = new FormControl('', { nonNullable: true,  validators: [Validators.required] });

    this.phoneNumber = new FormControl('', { nonNullable: true,  validators: [Validators.required, Validators.maxLength(20)] });
    this.email       = new FormControl('', { nonNullable: true,  validators: [Validators.required, Validators.email] });
  }


  initFormGroup():void
  {
    this.doctorForm = new FormGroup({
      firstName: this.firstName,
      middelName: this.middelName,
      lastName: this.lastName,
      gender: this.gender,
      dateOfBirth: this.dateOfBirth,
      phoneNumber: this.phoneNumber,
      email: this.email
    })
  }

  onSubmit():void
  {
    if(this.doctorForm.valid)
    {
    this.router.navigate(['auth','clinic'], {
      state: { fromInternalNavigation: true }
    });
    }
  }

}

export enum Gender {
  Male   = 'Male',
  Female = 'Female'
}
