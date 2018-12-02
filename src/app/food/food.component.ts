import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  private _editData;
  food: FormGroup;


  @Input()
    set editData(editData) {
      this._editData = editData ;
      this.populateInputs();
    }

    @Output() childEvent = new EventEmitter();

  constructor(
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.food = this.fb.group({
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

  onSubmit() {
    console.log(this.food.value, this.food.valid);
    // this.addWeight(this.weight.controls['userweight'].value, this.weight.controls['weightdate'].value);
  }

  populateInputs() {
    if (this._editData != null) {
      this.food.controls['foodname'].setValue(this._editData.foodname);
      this.food.controls['calories'].setValue(this._editData.calories);
      this.food.controls['fat'].setValue(this._editData.fat);
      this.food.controls['carbs'].setValue(this._editData.carbs);
      this.food.controls['fiber'].setValue(this._editData.fiber);
      this.food.controls['sugars'].setValue(this._editData.sugars);
      this.food.controls['protein'].setValue(this._editData.protein);
      this.food.controls['measure'].setValue(this._editData.measure);

    } else {

      this.food.controls['foodname'].setValue('');
      this.food.controls['calories'].setValue(0);
      this.food.controls['fat'].setValue(0);
      this.food.controls['carbs'].setValue(0);
      this.food.controls['fiber'].setValue(0);
      this.food.controls['sugars'].setValue(0);
      this.food.controls['protein'].setValue(0);
      this.food.controls['measure'].setValue('');

    }
  }

  closeForm() {
    this.food.markAsPristine();
    this.food.markAsUntouched();
    this.childEvent.emit(true);
  }

}
