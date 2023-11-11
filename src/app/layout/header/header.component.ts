import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('menuAnimation', [
      state(
        'enter',
        style({
          opacity: 1,
          transform: 'scale(1)',
        })
      ),
      state(
        'leave',
        style({
          opacity: 0,
          transform: 'scale(0.95)',
        })
      ),
      transition('leave => enter', animate('150ms ease-out')),
      transition('enter => leave', animate('150ms ease-in')),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false;
  isUserMenuOpen: boolean = false;
  user: User | null = null;
  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.user = this._authService.currentUser;
  }
  /**
   * Toggles the menu open/closed.
   */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  /**
   * Toggles the user menu open or closed.
   */
  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
  /**
   * Signs out the current user and navigates to the login page.
   */
  signOut() {
    this._authService.signOut().then(() => {
      this._router.navigate(['/auth/login']);
    });
  }
}
