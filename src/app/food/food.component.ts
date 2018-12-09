import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FavoriteService } from '../services/favorite.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
  providers: [MessageService]
})
export class FoodComponent implements OnInit {
  private _editData;


  // @Input() source: string;

  // @Input()
  //   set editData(editData) {
  //     this._editData = editData ;
  //     this.populateInputs();
  //   }

  //   @Output() childEvent = new EventEmitter();

  constructor(

    ) { }

  ngOnInit() {

  }





  updateFavorite() {

  }


}
