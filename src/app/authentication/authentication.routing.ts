import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginLayoutComponent } from '../layouts/login-layout/login-layout.component';

export const AuthenticationRoutes: Routes = [
      { path: '',
        component: LoginLayoutComponent,
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
        ]
      }
 ];
