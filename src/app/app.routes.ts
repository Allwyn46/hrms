import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Layout } from './pages/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Employee } from './pages/employee/employee';
import { Leave } from './pages/leave/leave';
import { loginGuard } from './guards/login-guard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
    canActivate: [loginGuard],
  },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'employee',
        component: Employee,
      },
      {
        path: 'leave',
        component: Leave,
      },
    ],
  },
];
