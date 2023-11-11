import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { FullComponent } from './layout/full/full.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    ...canActivate(() => redirectUnauthorizedTo(['auth/login'])),
    children: [
      {
        path: 'digimon',
        loadChildren: () =>
          import('./digimon/digimon.module').then((m) => m.DigimonModule),
      },
      {
        path: '', // Ruta vacía que redirige a 'home'
        redirectTo: 'digimon',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auth',
    ...canActivate(() => redirectLoggedInTo(['digimon'])),
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
