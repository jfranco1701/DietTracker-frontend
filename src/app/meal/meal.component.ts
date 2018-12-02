import { Component, OnInit } from '@angular/core';
import { IFavorite } from '../interfaces/IFavorite';
import { FavoriteService } from '../services/favorite.service';
import { IMeal} from '../interfaces/IMeal';
import { ActivatedRoute } from '@angular/router';
import {SelectItem} from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
  providers: [ConfirmationService, MessageService]
})

export class MealComponent implements OnInit {
  cols: any[];
  favorites_cols: any[];
  favorites: IFavorite[];
  mealItems: IMeal[];
  mealName: string;
  mealDate: Date;
  mealTypes: SelectItem[];
  meal: IMeal;

  constructor(
    private favoriteService: FavoriteService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'mealdate', header: 'Date'},
      { field: 'mealtype', header: 'Meal Type'},
      { field: 'quantity', header: 'Quantity'},
      { field: 'foodname', header: 'Food Name'}
    ];

    this.favorites_cols = [
      { field: 'foodname', header: ''}
    ];

    this.mealTypes = [
      {label: 'Breakfast', value: 'Breakfast'},
      {label: 'Lunch', value: 'Lunch'},
      {label: 'Dinner', value: 'Dinner'},
      {label: 'Snack', value: 'Snack'}
    ];

    this.mealItems = [];
    this.getFavorites();

    this.route.queryParams.subscribe(params => {
      this.mealName = params['meal'] || '';
      this.mealDate = params['mealdate'] || new Date();
    });
  }

  getFavorites() {
    this.favoriteService
    .getFavorites()
    .subscribe(weights => {
      this.favorites = weights;
    });
  }

  addFromFavorite(favorite: IFavorite) {
    this.meal = {
      id: null,
      userid: favorite.userid,
      mealdate: this.mealDate,
      mealtype: this.mealName,
      quantity: 1,
      calories: favorite.calories,
      protein: favorite.protein,
      fat: favorite.fat,
      fiber: favorite.fiber,
      carbs: favorite.carbs,
      sugars: favorite.sugars,
      measure: favorite.measure,
      timestamp: null,
      foodname: favorite.foodname
    };
      this.mealItems.push(this.meal);
  }

  addMealItemFavorite(id: number) {

  }

  cancelAdd() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.router.navigate(['/', 'home']);
      }
    });
  }

}
