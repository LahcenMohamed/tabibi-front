import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { DayOfWeek, WorkTime } from '../../../models/work-times/work-time';
import { CustomSelectComponent } from '../../../shared/componenets/custom-select/custom-select.component';
import { CustomInputComponent } from '../../../shared/componenets/custom-input/custom-input.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-work-time-dialog',
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
    MatDialogActions
  ],
  templateUrl: './add-work-time-dialog.component.html',
  styleUrl: './add-work-time-dialog.component.scss'
})
export class AddWorkTimeDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddWorkTimeDialogComponent>);
  data!: FormGroup;
  startTime!: FormControl;
  endTime!: FormControl;
  day!: FormControl;

  public dayOfWeekOptions = Object.values(DayOfWeek);
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: WorkTime | null){
    this.initForm();
    if (this.dialogData) {
      this.data.patchValue(this.dialogData);
    }
  }

  initForm(): void {
    // Initialize each FormControl
    this.startTime   = new FormControl('', { nonNullable: true });
    this.endTime  = new FormControl('', { nonNullable: false , validators: [Validators.required]});
    this.day    = new FormControl('', { nonNullable: true,  validators: [Validators.required] });

    // Build the FormGroup
    this.data = new FormGroup({
      startTime:   this.startTime,
      endTime:  this.endTime,
      day:    this.day
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  submit(): void {
    if (this.data.valid) {
      // Construct an Employee object
      const value = this.data.value as WorkTime;
      this.dialogRef.close(value);
    } else {
      this.data.markAllAsTouched();
    }
  }
}
