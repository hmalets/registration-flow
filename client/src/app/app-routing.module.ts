import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizedGuard } from './core/services/user';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./features/registration/registration.module').then(m => m.RegistrationModule),
  },
  {
    path: 'welcome',
    canLoad: [AuthorizedGuard],
    loadChildren: () => import('./features/welcome/welcome.module').then(m => m.WelcomeModule),
  },
  {
    path: '**',
    loadChildren: () => import('./features/error/error.module').then(m => m.ErrorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
