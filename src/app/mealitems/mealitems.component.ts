import { Component, OnInit, Input } from '@angular/core';
import { MealItem } from '../models/mealitem';

@Component({
  selector: 'app-mealitems',
  templateUrl: './mealitems.component.html',
  styleUrls: ['./mealitems.component.scss']
})
export class MealitemsComponent implements OnInit {
  @Input() mealItems: MealItem[];
  @Input() mealName: string;

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
