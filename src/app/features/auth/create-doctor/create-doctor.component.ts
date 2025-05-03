import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CustomInputComponent } from '../../../shared/componenets/custom-input/custom-input.component';
import { Router } from '@angular/router';
import { SignUpDataService, Doctor, Gender } from '../services/sign-data-service/sign-up-data.service';
import { CustomSelectComponent } from '../../../shared/componenets/custom-select/custom-select.component';

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
    CustomSelectComponent,
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
  gender!: FormControl; // Changed to FormControl
  dateOfBirth!: FormControl;
  phoneNumber!: FormControl;

  // create an array of the enum values for *ngFor
  public genderOptions = Object.values(Gender);

  constructor(private router: Router, private signUpDataService: SignUpDataService) {
    this.initFormControls();
    this.initFormGroup();
  }

  private initFormControls(): void {
    this.firstName   = new FormControl('', { nonNullable: true,  validators: [Validators.required, Validators.maxLength(100)] });
    this.middelName  = new FormControl('', { nonNullable: false, validators: [Validators.maxLength(100)] });
    this.lastName    = new FormControl('', { nonNullable: true,  validators: [Validators.required, Validators.maxLength(100)] });
    this.gender      = new FormControl(Gender.Male, { nonNullable: true, validators: [Validators.required] }); // Added gender FormControl
    this.dateOfBirth = new FormControl('', { nonNullable: true,  validators: [Validators.required] });
    this.phoneNumber = new FormControl('', { nonNullable: true,  validators: [Validators.required, Validators.maxLength(20)] });
  }

  initFormGroup():void {
    this.doctorForm = new FormGroup({
      firstName: this.firstName,
      middelName: this.middelName,
      lastName: this.lastName,
      gender: this.gender, // Added gender to form group
      dateOfBirth: this.dateOfBirth,
      phoneNumber: this.phoneNumber
    })
  }

  onSubmit():void {

    if(this.doctorForm.valid) {
      this.signUpDataService.setDoctorData(new Doctor(
        this.firstName.value,
        this.middelName.value,
        this.lastName.value,
        this.gender.value,  // Use gender.value
        this.dateOfBirth.value,
        this.phoneNumber.value
      ))
      console.log(this.signUpDataService.getDoctorData());
      this.router.navigate(['auth','clinic'], {
        state: { fromInternalNavigation: true }
      });
    }
  }
}
