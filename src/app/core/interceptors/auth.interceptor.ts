import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Si la URL es una petición de autenticación, deja pasar la petición sin modificar.
    if (request.url.includes('auth')) {
      return next.handle(request);
    }

    // Obtén el token de forma reactiva.
    return from(
      this.authService.currentUser?.getIdToken() ?? Promise.resolve(null)
    ).pipe(
      switchMap((token) => {
        // Si existe un token, clona la petición y añade el token de autenticación.
        if (token) {
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
        }
        // Pasa la petición modificada (o no modificada si no hay token) al siguiente manejador.
        return next.handle(request);
      }),
      catchError((err: HttpErrorResponse) => {
        // Maneja errores específicos.
        if (err.status === 401 || err.status === 403) {
          // Si recibes un error 401/403, desconecta al usuario.
          this.authService.signOut();
        }
        // Propaga el error.
        return throwError(() => err);
      })
    );
  }
}
