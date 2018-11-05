import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AuthenticationRoutes } from './authentication.routing';


import {CardModule} from 'primeng/card';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    RouterModule.forChild(AuthenticationRoutes),
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
  ]
})
export class AuthenticationModule { }
