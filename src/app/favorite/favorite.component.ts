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
  }

  editClick(rowData) {
    this.rowData = rowData;
    this.formHeader = 'Edit Favorite Item';
    this.displayForm = true;
  }

  addClick() {
    this.rowData = null;
    this.formHeader = 'Add Favorite Item';
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
}
