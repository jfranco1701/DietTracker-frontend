import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {
  cols: any[];

  constructor() { }

  ngOnInit() {
    this.cols = [
      { field: 'qty', header: ''},
      { field: 'name', header: ''}
    ];
  }

  addItem() {
    this.mealItems.push({'qty': 2 , 'foodId': 1, 'name': 'Test Food Item 2', 'calories': 310, 'protein': 5.5, 'fat': 1.1, 'fiber': 1.2,
    'carbs': 20, 'sugars': 10, 'measure': 'Package'});
  }

}
