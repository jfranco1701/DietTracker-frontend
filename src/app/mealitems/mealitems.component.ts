import { Component, OnInit, Input } from '@angular/core';
import { MealItem } from '../models/mealitem';
import { IMeal } from '../interfaces/IMeal';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-mealitems',
  templateUrl: './mealitems.component.html',
  styleUrls: ['./mealitems.component.scss']
})
export class MealitemsComponent implements OnInit {
  @Input() mealName: string;
  @Input() mealDate: Date;

  cols: any[];
  meals: IMeal[];


  constructor(
    private mealService: MealService
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'quantity', header: ''},
      { field: 'foodname', header: ''}
    ];

    this.getMeals(this.mealDate, this.mealName);
  }

  deleteMeal(id) {
    this.mealService.deleteMeal(id)
      .subscribe(res => {
          this.getMeals(this.mealDate, this.mealName);
        }, (err) => {
          console.log(err);
        }
      );
  }

  getMeals(mealDate, mealType) {
    this.mealService
    .getMeals(mealDate, mealType)
    .subscribe(meals => {
      this.meals = meals;
    });
  }
}
