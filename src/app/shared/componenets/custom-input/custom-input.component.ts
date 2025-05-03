// custom-input.component.ts
import { NgClass, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-custom-input',
  standalone: true, // Add standalone: true if you're using Angular standalone components
  imports: [
    NgIf,
    MatIconModule,
    MatFormFieldModule,
    NgClass],
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;
  @Input() inputClass: string = '';
  @Input() control!: FormControl;
  @Output() inputChange = new EventEmitter<string>();

  value: string = '';
  isDisabled: boolean = false;
  touched: boolean = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.inputChange.emit(value);
  }

  onBlur(): void {
    this.touched = true;
    this.onTouched();
  }

  onSelectChange(value: any): void {
    // Update the internal value
    this.value = value;

    // Notify Angular forms that the value has changed
    this.onChange(value);

    // Emit the change event if any parent wants to listen
    this.inputChange.emit(value);
  }
  getErrorMessage(): string {
    if (!this.control.errors) return '';

    if (this.control.errors['required']) {
      return 'This field is required';
    }

    if (this.control.errors['email']) {
      return 'Please enter a valid email address';
    }

    if (this.control.errors['minlength']) {
      return `Minimum length is ${this.control.errors['minlength'].requiredLength} characters`;
    }

    // Return the first error key as a default
    const firstErrorKey = Object.keys(this.control.errors)[0];
    return firstErrorKey ? `Invalid: ${firstErrorKey}` : 'Invalid input';
  }
}
