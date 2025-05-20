import { Component, Inject, inject, model } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA, MatDialogActions} from '@angular/material/dialog';
import { Employee, JobType } from '../../../models/employees/employee';
import { CustomInputComponent } from "../../../shared/componenets/custom-input/custom-input.component";
import { CustomSelectComponent } from "../../../shared/componenets/custom-select/custom-select.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-employee-dialog',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    CustomInputComponent,
    CustomSelectComponent,
    MatDialogActions],
  templateUrl: './create-employee-dialog.component.html',
  styleUrl: './create-employee-dialog.component.scss'
})
export class CreateEmployeeDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CreateEmployeeDialogComponent>);
  data!: FormGroup;
  firstName!: FormControl;
  middelName!: FormControl;
  lastName!: FormControl;
  phoneNumber!: FormControl;
  email!: FormControl;
  address!: FormControl;
  salary!: FormControl;
  jobType!: FormControl;
  description!: FormControl;

  public jobTypeOptions = Object.keys(JobType)
    .filter(key => isNaN(Number(key))) // filter out the numeric keys
    .map(key => ({
      label: key,
      value: JobType[key as keyof typeof JobType]
    }));
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: Employee | null){
    this.initForm();
    if (this.dialogData) {
      this.data.patchValue(this.dialogData);
    }
  }

  initForm(): void {
    // Initialize each FormControl
    this.firstName   = new FormControl('', { nonNullable: true,  validators: [Validators.required] });
    this.middelName  = new FormControl('', { nonNullable: false });
    this.lastName    = new FormControl('', { nonNullable: true,  validators: [Validators.required] });
    this.phoneNumber = new FormControl('', { nonNullable: true,  validators: [Validators.required] });
    this.email       = new FormControl('', { nonNullable: false, validators: [Validators.email] });
    this.address     = new FormControl('', { nonNullable: false });
    this.salary      = new FormControl(0,  { nonNullable: true,  validators: [Validators.min(0)] });
    this.jobType     = new FormControl<JobType | null>(null, { validators: [Validators.required] });
    this.description = new FormControl('', { nonNullable: false });

    // Build the FormGroup
    this.data = new FormGroup({
      firstName:   this.firstName,
      middelName:  this.middelName,
      lastName:    this.lastName,
      phoneNumber: this.phoneNumber,
      email:       this.email,
      address:     this.address,
      salary:      this.salary,
      jobType:     this.jobType,
      description: this.description
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  submit(): void {
    if (this.data.valid) {
      // Construct an Employee object
      const value = this.data.value as Employee;
      this.dialogRef.close(value);
    } else {
      this.data.markAllAsTouched();
    }
  }
}
