import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
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

import {AccordionModule} from 'primeng/accordion';
import {ListboxModule} from 'primeng/listbox';
import {ButtonModule} from 'primeng/button';

import {CalendarModule} from 'primeng/calendar';
import { MealitemsComponent } from './meal/mealitems/mealitems.component';



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
    MealitemsComponent,


  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    PanelModule,
    CardModule,
    BrowserModule,
    AuthenticationModule,
    AppRoutingModule,
    AccordionModule,
    ListboxModule,
    ButtonModule,
    CalendarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
