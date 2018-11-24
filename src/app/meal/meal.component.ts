import { Component, OnInit } from '@angular/core';
import { DailyTotal } from '../models/DailyTotal';
import { MealItem } from '../models/mealitem';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {
  dailyTotals: DailyTotal[];
  itemsBreakfast: MealItem[];
  itemsLunch: MealItem[];
  itemsDinner: MealItem[];
  itemsSnack: MealItem[];
  mealDate: Date;

  constructor() { }

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
    this.itemsBreakfast = [];
    this.itemsLunch = [];
    this.itemsDinner = [];
    this.itemsSnack = [];
  }

  nextClick() {
    this.mealDate.setDate(this.mealDate.getDate() + 1);
  }

  prevClick() {
    this.mealDate.setDate(this.mealDate.getDate() - 1);
  }

}
