import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { UsersComponent } from './users/users.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { WeightComponent } from './weight/weight.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '',
    component: HomeLayoutComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'favorites', component: FavoriteComponent },
      { path: 'weighttracking', component: WeightComponent },
    ]},
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
