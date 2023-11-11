import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { User } from 'firebase/auth';
import { ConfirmationDialogData } from 'src/app/core/models/confirmation-types';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  signUpForm: UntypedFormGroup = new UntypedFormGroup({});
  isLoading: boolean = false;
  currentUser: User | null = null;

  get email() {
    return this.signUpForm.get('email') as FormControl;
  }
  get password() {
    return this.signUpForm.get('password') as FormControl;
  }
  constructor(
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.currentUser = this._authService.currentUser;
    this.signUpForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }
  firabaseResponses: { [key: string]: string } = {
    'auth/invalid-email': 'Por favor, ingrese un correo válido.',
    'auth/email-already-in-use':
      'El correo electrónico ya se encuentra en uso.',
  };
  /**
   * Signs up the user with the provided email and password.
   * If the sign up is successful and the user's email is verified,
   * navigates to the '/digimon' route. Otherwise, displays a dialog
   * prompting the user to verify their email.
   * @returns A Promise that resolves when the sign up is successful and the user's email is verified.
   */
  signUp() {
    this.isLoading = true;
    this._authService
      .signUp(this.email.value, this.password.value)
      .then((res) => {
        this.isLoading = false;
        this._authService.sendEmailVerification();
        if (res.user.emailVerified) {
          this._router.navigate(['/digimon']);
        } else {
          this._authService.signOut();
          this._dialog.open(ConfirmationDialogComponent, {
            width: '400px',
            data: {
              title: 'Verifica tu cuenta',
              message:
                'Por favor, verifica tu cuenta. Te hemos enviado un correo de verificación.',
              type: 'info',
              showIcon: true,
              actions: {
                confirm: {
                  text: 'Aceptar',
                  show: true,
                },
              },
            } as ConfirmationDialogData,
          });
        }
      })
      .catch((err: FirebaseError) => {
        this.isLoading = false;
        const errorMessage =
          this.firabaseResponses[err.code] ||
          'Ha ocurrido un error inesperado: ' + err.message;
        this._dialog.open(ConfirmationDialogComponent, {
          width: '400px',
          data: {
            title: 'Error',
            message: errorMessage,
            type: 'error',
            showIcon: true,
          } as ConfirmationDialogData,
        });
      });
  }
}
