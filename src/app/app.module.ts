import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '',  component: LandingComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FavoriteComponent,
    HomeComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
