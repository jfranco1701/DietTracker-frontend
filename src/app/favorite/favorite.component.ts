import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { IFavorite } from '../interfaces/IFavorite';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class FavoriteComponent implements OnInit {
  favorites: IFavorite[];
  cols: any[];
  displayForm = false;
  formHeader: string;
  rowData;
  foodForm: FormGroup;

  constructor(
    private favoriteService: FavoriteService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'quantity', header: ''},
      { field: 'foodname', header: ''}
    ];

    this.getFavorites();

    this.foodForm = this.fb.group({
      foodname: ['', [Validators.required]],
      calories: ['', [Validators.required]],
      protein: ['', [Validators.required]],
      fat: ['', [Validators.required]],
      fiber: ['', [Validators.required]],
      carbs: ['', [Validators.required]],
      sugars: ['', [Validators.required]],
      measure: ['', [Validators.required]]
    });
  }

  addClick() {
    this.rowData = null;
    this.formHeader = 'Add Favorite Item';

    this.foodForm.controls['foodname'].setValue('');
    this.foodForm.controls['calories'].setValue(0);
    this.foodForm.controls['fat'].setValue(0);
    this.foodForm.controls['carbs'].setValue(0);
    this.foodForm.controls['fiber'].setValue(0);
    this.foodForm.controls['sugars'].setValue(0);
    this.foodForm.controls['protein'].setValue(0);
    this.foodForm.controls['measure'].setValue('');

    this.displayForm = true;
  }

  deleteClick(id: number, foodName: string) {
    this.confirmationService.confirm({
      message: 'Delete ' + foodName + '?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteFavorite(id);
      }
    });
  }

  deleteFavorite(id: number) {
    this.favoriteService.deleteFavorite(id)
      .subscribe(res => {
        }, err => {
          console.log(err);
          this.messageService.add({severity: 'error', summary: 'Error Message', detail: 'Failed to Delete Favorite'});
        },
        () => {
          this.messageService.add({severity: 'success', summary: 'Success Message', detail: 'Favorite Deleted'});
          this.getFavorites();
        }
      );
  }

  getFavorites() {
    this.favoriteService
    .getFavorites()
    .subscribe(weights => {
      this.favorites = weights;
    });
  }

  addFavorite(foodName: string, caloriesCount: number, fatCount: number, carbsCount: number, fiberCount: number,
    sugarsCount: number, proteinCount: number, measureAmt: string) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.favoriteService.addFavorite(currentUser.userid, foodName, caloriesCount, fatCount,
      carbsCount, fiberCount, sugarsCount, proteinCount, measureAmt).subscribe(
        res => {},
        err => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Failed to Add Favorite' });
        },
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Favorite Added' });
          this.closeForm();
          this.getFavorites();
        }
      );
  }

  onSubmit() {
        this.addFavorite(this.foodForm.controls['foodname'].value,
        this.foodForm.controls['calories'].value,
        this.foodForm.controls['fat'].value,
        this.foodForm.controls['carbs'].value,
        this.foodForm.controls['fiber'].value,
        this.foodForm.controls['sugars'].value,
        this.foodForm.controls['protein'].value,
        this.foodForm.controls['measure'].value
        );
      }

  closeForm() {
    this.foodForm.markAsPristine();
    this.foodForm.markAsUntouched();
    this.displayForm = false;
  }
}
