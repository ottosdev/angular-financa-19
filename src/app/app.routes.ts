import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { HomeComponent } from './modules/private/home/home.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { CategoriaComponent } from './modules/private/categoria/categoria.component';
import { PerfilComponent } from './modules/private/perfil/perfil.component';
import { RegisterComponent } from './modules/auth/register/register.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loginGuard],
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard],
      },
      {
        path: 'categorias',
        component: CategoriaComponent,
        canActivate: [authGuard],
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        canActivate: [authGuard],
      },
    ],
  },
];
