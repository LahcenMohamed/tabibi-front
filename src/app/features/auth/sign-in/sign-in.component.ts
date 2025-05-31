import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth-services/auth.service';
import { SignInRequest } from '../../../models/auth/sign-in-request';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CustomInputComponent } from '../../../shared/componenets/custom-input/custom-input.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from '../../../shared/componenets/spinner/spinner.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomSnackbarComponent } from '../../../shared/componenets/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-sign-in',
  imports: [RouterOutlet,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    CustomInputComponent,
    RouterLink,
    MatProgressSpinnerModule,
    SpinnerComponent,
    MatSnackBarModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  siginupForm!: FormGroup;
  email!: FormControl;
  password!: FormControl;
  isLoading = false;

  constructor(
    private router: Router,
    private authService:AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
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
      const spn = this.dialog.open(SpinnerComponent);
      let signInRequest: SignInRequest =
            {
              emailOrUserName: this.email.value,
              password: this.password.value
            }
            let userId = this.authService.signIn(signInRequest).subscribe({
              next: (response) => {
                localStorage.setItem('token', response.data!);
                this.router.navigate(['']);
                spn.close();
              },
              error: (error) => {
                spn.close();
                console.error('Sign up failed:', error.message);
                this.snackBar.openFromComponent(CustomSnackbarComponent, {
                  data: {
                    message: 'Email or password is incorrect',
                    type: 'error'
                  },
                  panelClass: ['custom-snackbar-container']});

              }
            });

    }
  }
}
