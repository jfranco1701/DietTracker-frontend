import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseadminComponent } from './databaseadmin.component';

describe('DatabaseadminComponent', () => {
  let component: DatabaseadminComponent;
  let fixture: ComponentFixture<DatabaseadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
