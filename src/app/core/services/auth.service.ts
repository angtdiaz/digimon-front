import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _auth: Auth) {}

  public get currentUser() {
    return this._auth.currentUser;
  }

  public signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this._auth, email, password);
  }
  public signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  public sendEmailVerification() {
    if (!this._auth.currentUser) throw new Error('No current user');
    return sendEmailVerification(this._auth.currentUser);
  }

  public signOut() {
    return this._auth.signOut();
  }
}
