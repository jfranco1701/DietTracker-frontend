import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import { DailyTotal } from '../models/DailyTotal';
import { MealItem } from '../models/mealitem';
import { TopConsumed } from '../models/topconsumed';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dailyTotals: DailyTotal[];
  itemsBreakfast: MealItem[];
  itemsLunch: MealItem[];
  itemsDinner: MealItem[];
  itemsSnack: MealItem[];
  topConsumed: TopConsumed[];
  mealDate: Date;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.dailyTotals = [
      {'category': 'Calories', 'total': 1000, 'fromDailyAmt': -1000},
      {'category': 'Calories', 'total': 1000, 'fromDailyAmt': -1000},
      {'category': 'Calories', 'total': 1000, 'fromDailyAmt': -1000},
      {'category': 'Calories', 'total': 1000, 'fromDailyAmt': -1000},
      {'category': 'Calories', 'total': 1000, 'fromDailyAmt': -1000},
      {'category': 'Calories', 'total': 1000, 'fromDailyAmt': -1000}
    ];

    this.mealDate = new Date();

    this.itemsLunch = [];
    this.itemsDinner = [];
    this.itemsSnack = [];

    this.itemsBreakfast = [
      {'qty': 1 , 'foodId': 1, 'name': 'Test Food Item', 'calories': 310, 'protein': 5.5, 'fat': 1.1, 'fiber': 1.2,
      'carbs': 20, 'sugars': 10, 'measure': 'Package'}
    ];

    this.topConsumed = [
      {'name': 'Test Item #1', 'total': 10},
      {'name': 'Test Item #2', 'total': 10},
      {'name': 'Test Item #3', 'total': 10},
      {'name': 'Test Item #4', 'total': 10},
      {'name': 'Test Item #5', 'total': 10},
      {'name': 'Test Item #6', 'total': 10},
      {'name': 'Test Item #7', 'total': 10},
      {'name': 'Test Item #8', 'total': 10},
      {'name': 'Test Item #9', 'total': 10},
    ];
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  nextClick() {
    this.mealDate.setDate(this.mealDate.getDate() + 1);
  }

  prevClick() {
    this.mealDate.setDate(this.mealDate.getDate() - 1);
  }
}
