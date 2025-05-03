import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CustomInputComponent } from "../../../shared/componenets/custom-input/custom-input.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AccountData, SignUpDataService } from '../services/sign-data-service/sign-up-data.service';

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    CustomInputComponent
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  siginupForm!: FormGroup;
  email!: FormControl;
  password!: FormControl;

  constructor(private router: Router, private signUpDataService : SignUpDataService) {
    this.initFormControls();
    this.initFormGrpup();
  }
  initFormControls(): void
  {
    this.email = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] });
    this.password = new FormControl('', { nonNullable: true, validators: [Validators.required,Validators.minLength(8)] });
  }

  initFormGrpup():void
  {
    this.siginupForm = new FormGroup({
      email: this.email,
      password: this.password
    })
  }


  onSubmit():void
  {
    if(this.siginupForm.valid)
    {
      let accountData = new AccountData(this.email.value,this.password.value);
      this.signUpDataService.setAccountDataData(accountData);
      this.router.navigate(['auth','doctor'], {
        state: { fromInternalNavigation: true }
      });
    }
  }
}
