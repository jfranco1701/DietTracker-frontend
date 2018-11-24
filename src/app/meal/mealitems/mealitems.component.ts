import { Component, OnInit, Input } from '@angular/core';
import { MealItem } from '../../models/mealitem';

@Component({
  selector: 'app-mealitems',
  templateUrl: './mealitems.component.html',
  styleUrls: ['./mealitems.component.scss']
})
export class MealitemsComponent implements OnInit {
  @Input() mealItems: MealItem[];
  @Input() mealName: string;

  constructor() { }

  ngOnInit() {
  }

}
