import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMeal } from '../interfaces/IMeal';
import { MealService } from '../services/meal.service';
import { ConfirmationService } from 'primeng/api';
import {MessageService} from 'primeng/api';



@Component({
  selector: 'app-mealitems',
  templateUrl: './mealitems.component.html',
  styleUrls: ['./mealitems.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class MealitemsComponent implements OnInit {
  cols: any[];
  meals: IMeal[];
  selectedMealDate: Date;

  @Input() mealName: string;
  @Input() set mealDate(value: Date) {
    this.selectedMealDate = value;
    this.getMeals();
  }

  @Output() eventAddItem = new EventEmitter();

  @Output() eventDeleteItem = new EventEmitter();

  constructor(
    private mealService: MealService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'quantity', header: ''},
      { field: 'foodname', header: ''}
    ];

    this.getMeals();
  }

  addClick() {
    this.eventAddItem.emit(this.mealName);
  }

  deleteClick(id, foodName) {
    this.confirmationService.confirm({
      message: 'Delete ' + foodName + '?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteMeal(id);

      }
    });
  }

  deleteMeal(id) {
    this.mealService.deleteMeal(id)
      .subscribe(res => {
        }, err => {
          console.log(err);
          this.messageService.add({severity: 'error', summary: 'Error Message', detail: 'Failed to Delete Item'});
        },
        () => {
          this.messageService.add({severity: 'success', summary: 'Success Message', detail: 'Food Item Deleted'});
          this.getMeals();
          this.eventDeleteItem.emit(true);
        }
      );
  }

  getMeals() {
    this.mealService
    .getMeals(this.selectedMealDate, this.mealName)
    .subscribe(meals => {
      this.meals = meals;
    });
  }
}
