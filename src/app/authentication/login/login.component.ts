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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signInForm: UntypedFormGroup = new UntypedFormGroup({});
  isLoading: boolean = false;
  currentUser: User | null = null;

  get email() {
    return this.signInForm.get('email') as FormControl;
  }
  get password() {
    return this.signInForm.get('password') as FormControl;
  }
  constructor(
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.currentUser = this._authService.currentUser;
    this.signInForm = this._formBuilder.group({
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

  /**
   * Signs in the user with the provided email and password.
   * If the sign in is successful and the user's email is verified, navigates to the '/digimon' route.
   * If the user's email is not verified, shows a dialog to resend the verification email.
   * If the sign in fails due to invalid credentials, shows an error dialog.
   * If the sign in fails due to any other reason, shows a generic error dialog.
   */
  signIn() {
    this.isLoading = true;

    this._authService
      .signIn(this.email.value, this.password.value)
      .then((res) => {
        this.isLoading = false;
        if (res.user.emailVerified) {
          this._router.navigate(['/digimon']);
        } else {
          let confirmationData: ConfirmationDialogData = {
            title: 'Atención',
            message: 'Verifica tu correo electrónico para continuar.',
            type: 'info',
            showIcon: true,
            actions: {
              confirm: {
                text: 'Reenviar correo',
                show: true,
              },
            },
          };
          this.showDialog(confirmationData)
            .afterClosed()
            .subscribe((res) => {
              if (res) {
                console.log('Reenviar correo');
                this._authService.sendEmailVerification();
              }
              this._authService.signOut();
            });
        }
      })
      .catch((err: FirebaseError) => {
        this.isLoading = false;
        if (err.code === 'auth/invalid-login-credentials') {
          let confirmationData: ConfirmationDialogData = {
            title: 'Error!',
            message: 'Correo o contraseña incorrectos.',
            type: 'error',
            showIcon: true,
            actions: {
              confirm: {
                text: 'Aceptar',
                show: true,
              },
            },
          };
          this.showDialog(confirmationData);

          return;
        }
      })
      .catch((err: any) => {
        let confirmationData: ConfirmationDialogData = {
          title: 'Error!',
          message: 'Ocurrió un error al iniciar sesión.',
          type: 'error',
          showIcon: true,
          actions: {
            confirm: {
              text: 'Aceptar',
              show: true,
            },
          },
        };
        this.isLoading = false;

        this.showDialog(confirmationData);

        console.log(err);
      });
  }

  /**
   * Opens a confirmation dialog with the specified data.
   * @param data The data to be displayed in the confirmation dialog.
   * @returns A reference to the opened dialog.
   */
  showDialog(data: ConfirmationDialogData) {
    return this._dialog.open(ConfirmationDialogComponent, {
      data: data,
    });
  }
}
