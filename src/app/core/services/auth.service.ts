import { Injectable } from '@angular/core';
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _auth: Auth) {}

  /**
   * Returns the current user.
   * @returns {User} The current user.
   */
  public get currentUser(): User | null {
    return this._auth.currentUser;
  }

  /**
   * Creates a new user account with the given email and password.
   * @param email - The email for the new user account.
   * @param password - The password for the new user account.
   * @returns A Promise that resolves with the newly created user's information.
   */
  public signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this._auth, email, password);
  }
  /**
   * Signs in a user with the provided email and password.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns A promise that resolves with the user's authentication data.
   */
  public signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  /**
   * Sends an email verification to the current user.
   * @throws {Error} If there is no current user.
   * @returns A promise that resolves when the email is sent.
   */
  public sendEmailVerification() {
    if (!this._auth.currentUser) throw new Error('No current user');
    return sendEmailVerification(this._auth.currentUser);
  }

  /**
   * Signs out the current user.
   * @returns A promise that resolves when the user is signed out.
   */
  public signOut() {
    return this._auth.signOut();
  }
}
