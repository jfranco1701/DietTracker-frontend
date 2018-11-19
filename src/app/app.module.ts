import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { DatabaseadminComponent } from './databaseadmin/databaseadmin.component';
import { MealComponent } from './meal/meal.component';
import { WeightComponent } from './weight/weight.component';
import { ChartComponent } from './chart/chart.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers';

@NgModule({
  declarations: [
    AppComponent,
    FavoriteComponent,
    HomeComponent,
    LandingComponent,
    DatabaseadminComponent,
    MealComponent,
    WeightComponent,
    ChartComponent,
    NotfoundComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
