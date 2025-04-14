import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { CategoriaComponent } from './modules/private/categoria/categoria.component';
import { PerfilComponent } from './modules/private/perfil/perfil.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { TransacoesComponent } from './modules/private/transacoes/transacoes.component';

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
        path: 'categorias',
        component: CategoriaComponent,
        canActivate: [authGuard],
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        canActivate: [authGuard],
      },
      {
        path: 'transacao',
        component: TransacoesComponent,
        canActivate: [authGuard],
      },
    ],
  },
];
