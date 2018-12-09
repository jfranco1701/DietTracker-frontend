import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { FavoriteService } from '../services/favorite.service';
import { Router } from '@angular/router';
import { TopConsumed } from '../models/topconsumed';
import { IMeal } from '../interfaces/IMeal';
import { MealService } from '../services/meal.service';
import { IMealTotals } from '../interfaces/IMealTotals';
import { IFavorite } from '../interfaces/IFavorite';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class HomeComponent implements OnInit {
  mealTotals: IMealTotals;
  mostConsumed: any[];
  favorites_cols: any[];
  topConsumed: TopConsumed[];
  mealDate: Date;
  favorites: IFavorite[];
  mealItemsToAdd: IMeal[];
  displayForm: boolean;
  addItemType: string;
  currentUserid: number;

    @Input()
      set updateCounts(updateCounts) {
        this.getMealTotals();
    }

  constructor(
    private authenticationService: AuthenticationService,
    private mealService: MealService,
    private favoriteService: FavoriteService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) { }


  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUserid = currentUser.userid;

    this.mealDate = new Date();

    console.log(this.mealDate);

    this.displayForm = false;
    this.addItemType = '';

    this.getMealTotals();
    this.getMostConsumed();

    this.favorites_cols = [
      { field: 'foodname', header: ''}
    ];

    this.getFavorites();
  }

  addItemChange(event) {
    // Get the add item event from the meal items component and display the input form
    this.mealItemsToAdd = [];
    this.addItemType = event;
    this.displayForm = true;
    this.getMostConsumed();
  }

  deleteItemChange(event) {
    this.getMealTotals();
    this.getMostConsumed();
  }

  getMealTotals() {
    // Get the total of the meal totals for the given day
    this.mealService
    .getMealTotals(this.mealDate)
    .subscribe(mealTotals => {
      this.mealTotals = mealTotals;
    });
  }

  getMostConsumed() {
    this.mealService
    .getMostConsumed()
    .subscribe(consumed => {
      this.mostConsumed = consumed;

      console.log(this.mostConsumed);
    });
  }

  getFavorites() {
    this.favoriteService
    .getFavorites()
    .subscribe(weights => {
      this.favorites = weights;
    });
  }

  nextClick() {
    this.mealDate = new Date(this.mealDate.setDate(this.mealDate.getDate() + 1));
    this.getMealTotals();
  }

  prevClick() {
    this.mealDate = new Date(this.mealDate.setDate(this.mealDate.getDate() - 1));
    this.getMealTotals();
  }

  clearClick() {
    this.mealDate = new Date();
    this.getMealTotals();
  }

  dateSelect() {
    this.getMealTotals();
  }

  mealItemsAddDeleteClick(foodname) {
    const index = this.mealItemsToAdd.findIndex(x => x.foodname === foodname);
    this.mealItemsToAdd.splice(index, 1);
  }

  addFavoritesClick(rowData) {
    this.mealItemsToAdd.push({
      'id': null,
      'foodname': rowData.foodname,
      'userid': this.currentUserid,
      'mealdate': this.mealDate,
      'mealtype': this.addItemType,
      'quantity': 1,
      'calories': rowData.calories,
      'carbs': rowData.carbs,
      'fat': rowData.fat,
      'fiber': rowData.fiber,
      'protein': rowData.protein,
      'sugars': rowData.sugars,
      'measure': rowData.measure,
      'timestamp': null
    });
  }

  addMealItemsSaveClick() {
    let errors = 0;

    for (let i = 0; i < this.mealItemsToAdd.length; i++) {
      this.mealService.addMeal(this.currentUserid, this.mealItemsToAdd[i].foodname, this.mealItemsToAdd[i].calories,
        this.mealItemsToAdd[i].fat, this.mealItemsToAdd[i].carbs, this.mealItemsToAdd[i].fiber,
        this.mealItemsToAdd[i].sugars, this.mealItemsToAdd[i].protein, this.mealItemsToAdd[i].measure,
        this.mealDate, this.addItemType, this.mealItemsToAdd[i].quantity).subscribe(
          res => {},
          err => {
            console.log(err);
            errors++;
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Failed to Add Favorite' });
          },
          () => {
            this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Favorite Added' });
          }
        );
    }

    this.mealDate = new Date(this.mealDate.toISOString().slice(0, 10));

    this.getFavorites();
    this.getMealTotals();
    this.displayForm = false;
  }

  addMealItemsCancelClick() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.getFavorites();
        this.displayForm = false;
      }
    });
  }
}
