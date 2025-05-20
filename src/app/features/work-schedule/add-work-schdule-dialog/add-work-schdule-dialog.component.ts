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
  selector: 'app-add-work-schdule-dialog',
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
  templateUrl: './add-work-schdule-dialog.component.html',
  styleUrl: './add-work-schdule-dialog.component.scss'
})
export class AddWorkSchduleDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddWorkSchduleDialogComponent>);
  data!: FormGroup;
  maxCount!: FormControl;

  public dayOfWeekOptions = Object.values(DayOfWeek);
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: WorkTime | null){
    this.initForm();
    if (this.dialogData) {
      this.data.patchValue(this.dialogData);
    }
  }

  initForm(): void {
    // Initialize each FormControl
    this.maxCount  = new FormControl(0, { nonNullable: false , validators: [Validators.required]});

    // Build the FormGroup
    this.data = new FormGroup({
      maxCount:   this.maxCount
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  submit(): void {
    if (this.data.valid) {
      // Construct an Employee object
      const value = this.maxCount.value as number;
      this.dialogRef.close(value);
    } else {
      this.data.markAllAsTouched();
    }
  }
}
