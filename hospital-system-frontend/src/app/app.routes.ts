import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Reports } from './pages/reports/reports';
import { Tickets } from './pages/tickets/tickets';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: Login,
  },
  {
    path: 'app',
    children: [
      { path: '', component: Tickets, pathMatch: 'full' },
      { path: 'reports', component: Reports },
    ],
  },
];
