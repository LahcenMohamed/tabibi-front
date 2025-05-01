import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomInputComponent } from '../../../shared/componenets/custom-input/custom-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-clinic',
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
  public specializationOptions = Object.values(Specialization);

  constructor() {
    this.initFormControls();
    this.initFormGroup();
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
