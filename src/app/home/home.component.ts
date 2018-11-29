import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import { DailyTotal } from '../models/DailyTotal';
import { MealItem } from '../models/mealitem';
import { TopConsumed } from '../models/topconsumed';
import { IMeal } from '../interfaces/IMeal';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dailyTotals: DailyTotal[];
  // itemsBreakfast: MealItem[];
  // itemsLunch: MealItem[];
  // itemsDinner: MealItem[];
  // itemsSnack: MealItem[];
  topConsumed: TopConsumed[];
  mealDate: Date;
  meals: IMeal[];
  mealsLunch: IMeal[];
  mealsBreakfast: IMeal[];
  mealsDinner: IMeal[];
  mealsSnack: IMeal[];

  constructor(
    private authenticationService: AuthenticationService,
    private mealService: MealService,
    private router: Router) { }

  ngOnInit() {
    this.mealDate = new Date();
    this.mealDate = new Date(this.mealDate.getTime() - this.mealDate.getTimezoneOffset() * 60000);

    this.search();

    this.topConsumed = [
      // {'name': 'Test Item #1', 'total': 10},
      // {'name': 'Test Item #2', 'total': 10},
      // {'name': 'Test Item #3', 'total': 10},
      // {'name': 'Test Item #4', 'total': 10},
      // {'name': 'Test Item #5', 'total': 10},
      // {'name': 'Test Item #6', 'total': 10},
      // {'name': 'Test Item #7', 'total': 10},
      // {'name': 'Test Item #8', 'total': 10},
      // {'name': 'Test Item #9', 'total': 10},
    ];
  }

  computeDailyTotals(meals: IMeal[]) {
    let calories = 0.00;
    let protein = 0.00;
    let fat = 0.00;
    let fiber = 0.00;
    let carbs = 0.00;
    let sugars = 0.00;

    for (let i = 0; i < meals.length; i++) {
      calories = calories + +meals[i].calories;
      protein += Number(meals[i].protein);
      fat += Number(meals[i].fat);
      fiber += Number(meals[i].fiber);
      carbs += Number(meals[i].carbs);
      sugars += Number(meals[i].sugars);
    }
    this.dailyTotals = [
      {'category': 'Calories', 'total': calories, 'fromDailyAmt': 0},
      {'category': 'Protein', 'total': protein, 'fromDailyAmt': 0},
      {'category': 'Fat', 'total': fat, 'fromDailyAmt': 0},
      {'category': 'Fiber', 'total': fiber, 'fromDailyAmt': 0},
      {'category': 'Carbs', 'total': carbs, 'fromDailyAmt': 0},
      {'category': 'Sugars', 'total': sugars, 'fromDailyAmt': 0}
    ];
  }

  search() {
    console.log(this.mealDate);

    this.mealService
    .getMeals(this.mealDate)
    .subscribe(meals => {
      this.mealsLunch = meals.filter(meal => meal.mealtype === 'Lunch');
      this.mealsBreakfast = meals.filter(meal => meal.mealtype === 'Breakfast');
      this.mealsDinner = meals.filter(meal => meal.mealtype === 'Dinner');
      this.mealsSnack = meals.filter(meal => meal.mealtype === 'Snack');
      this.computeDailyTotals(meals);

      this.meals = meals;
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  nextClick() {
    this.mealDate = new Date(this.mealDate.getTime() + 86400000);
    this.search();
  }

  prevClick() {
    this.mealDate = new Date(this.mealDate.getTime() - 86400000);
    this.search();
  }

  clearClick() {
    this.mealDate = new Date();
    this.mealDate = new Date(this.mealDate.getTime() - this.mealDate.getTimezoneOffset() * 60000);
    this.search();
  }

  dateSelect() {
    this.search();
  }

}
