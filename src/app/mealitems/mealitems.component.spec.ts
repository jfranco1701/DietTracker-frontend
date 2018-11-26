import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealitemsComponent } from './mealitems.component';

describe('MealitemsComponent', () => {
  let component: MealitemsComponent;
  let fixture: ComponentFixture<MealitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
