import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomInputComponent } from '../../../shared/componenets/custom-input/custom-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { SignUpDataService } from '../services/sign-data-service/sign-up-data.service';
import { CustomSelectComponent } from '../../../shared/componenets/custom-select/custom-select.component';
import { AuthService } from '../../../services/auth-services/auth.service';
import { DoctorService } from '../../../services/doctor-service/doctor.service';
import { SignUpRequest } from '../../../models/auth/sign-up-request';
import { CreateDoctorRequets } from '../../../models/doctors/create-doctor-request';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerComponent } from '../../../shared/componenets/spinner/spinner.component';
import { CustomSnackbarComponent } from '../../../shared/componenets/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-create-clinic',
  imports: [
    HttpClientModule,
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
  templateUrl: './create-clinic.component.html',
  styleUrl: './create-clinic.component.scss'
})
export class CreateClinicComponent {
  clinicForm!: FormGroup;
  name!: FormControl;
  specialization!: FormControl;
  clinicPhoneNumber!: FormControl;
  secondPhoneNumber!: FormControl;
  clinicEmail!: FormControl;
  state!: FormControl;
  city!: FormControl;
  street!: FormControl;
  urlOnMap!: FormControl;
  minDescription!: FormControl;

  // create an array of the enum values for *ngFor
  public specializationOptions = Object.values(Specialization)
  .filter(key => isNaN(Number(key))) // filter out the numeric keys
      .map(key => ({
        label: key,
        value: Specialization[key as keyof typeof Specialization]
      }));

  constructor(private signUpDataService: SignUpDataService,
    private _authService: AuthService,
    private _doctorService: DoctorService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
    this.initFormControls();
    this.initFormGroup();
    console.log(signUpDataService.getAccountDataData());
    console.log(signUpDataService.getDoctorData());
  }
  private initFormControls(): void {
    this.name = new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)]
    });

    this.specialization = new FormControl<Specialization | null>(null, {
      validators: [Validators.required]
    });

    this.clinicPhoneNumber = new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.maxLength(20)
      ]
    });

    this.secondPhoneNumber = new FormControl('', {
      nonNullable: false,
      validators: [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.maxLength(20)
      ]
    });

    this.clinicEmail = new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    });

    this.state = new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)]
    });

    this.city = new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)]
    });

    this.street = new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)]
    });

    this.urlOnMap = new FormControl('', {
      nonNullable: false,
      validators: [Validators.maxLength(150)]
    });

    this.minDescription = new FormControl('', {
      nonNullable: false,
      validators: [Validators.maxLength(500)]
    });
  }

  private initFormGroup(): void {
    this.clinicForm = new FormGroup({
      name:               this.name,
      specialization:     this.specialization,
      clinicPhoneNumber:  this.clinicPhoneNumber,
      secondPhoneNumber:  this.secondPhoneNumber,
      clinicEmail:        this.clinicEmail,
      state:              this.state,
      city:               this.city,
      street:             this.street,
      urlOnMap:           this.urlOnMap,
      minDescription:     this.minDescription
    });
  }

  onSubmit():void
  {
    if(this.clinicForm.valid)
    {
      const spinner = this.dialog.open(SpinnerComponent);
      let accountData = this.signUpDataService.getAccountDataData();
      let doctorData = this.signUpDataService.getDoctorData();
      let signUpRequest: SignUpRequest =
      {
        username: `${doctorData.firstName} ${doctorData.middelName} ${doctorData.lastName} ${this.name.value}`,
        email: accountData.email,
        password: accountData.password
      }
      let userId = this._authService.signUp(signUpRequest).subscribe({
        next: (response) => {
          console.log('User ID:', response.data!);
          let doctorRequest: CreateDoctorRequets = {
            fullName: {
              firstName: doctorData.firstName,
              middelName: doctorData.middelName,
              lastName: doctorData.lastName
            },
            gender: doctorData.gender,
            dateOfBirth: doctorData.dateOfBirth,
            phoneNumber: doctorData.phoneNumber,
            emailAddress: accountData.email,
            notes: null,
            name: this.name.value,
            specialization: this.specialization.value,
            clinicEmail: this.clinicEmail.value,
            clinicPhoneNumber: this.clinicPhoneNumber.value,
            secondPhoneNumber: this.secondPhoneNumber.value,
            address: {
              state: this.state.value,
              city: this.city.value,
              street: this.street.value,
              urlOnMap: this.urlOnMap.value
            },
            minDescription: this.minDescription.value,
            userId: response.data!
          }
          this._doctorService.createDoctor(doctorRequest).subscribe({
            next: (result) => {
              spinner.close();
              this.router.navigate(['auth','sign-in']);
            },
            error: (error) => {
              console.error('Sign up failed:', error);
              spinner.close();
              this.snackBar.openFromComponent(CustomSnackbarComponent, {
                  data: {
                    message: 'Email or password is incorrect',
                    type: 'error'
                  },
                  panelClass: ['custom-snackbar-container']});
              }
          });
        },
        error: (error) => {
          console.error('Sign up failed:', error.message);
          spinner.close();
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              message: 'there is an error in the sign up process',
              type: 'error'
            },
            panelClass: ['custom-snackbar-container']});
        }

      });

    }
  }
}

export enum Specialization {
  GeneralPractitioner            = 1,
  Cardiologist                   = 2,
  Dermatologist                  = 3,
  Neurologist                    = 4,
  Pediatrician                   = 5,
  OrthopedicSurgeon              = 6,
  Obstetrician                   = 7,
  Gynecologist                   = 8,
  Psychiatrist                   = 9,
  Radiologist                    = 10,
  Anesthesiologist               = 11,
  Oncologist                     = 12,
  Endocrinologist                = 13,
  Nephrologist                   = 14,
  Gastroenterologist             = 15,
  Ophthalmologist                = 16,
  Pathologist                    = 17,
  PlasticSurgeon                 = 18,
  Rheumatologist                 = 19,
  Urologist                      = 20,
  Pulmonologist                  = 21,
  EmergencyMedicine              = 22,
  Otolaryngologist               = 23, // ENT specialist
  InfectiousDiseaseSpecialist    = 24,
  Allergist                      = 25,
  Hematologist                   = 26,
  Immunologist                   = 27,
  Geriatrician                   = 28,
  PainManagementSpecialist       = 29,
  SportsMedicine                 = 30,
  Dentist                        = 31
}
