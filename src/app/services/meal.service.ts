import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { IMeal } from '../interfaces/IMeal';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private urlDetail: string;

  constructor(
    private http: HttpClient,
    private locationService: Location
  ) {
    const prodUrlDetail = '/api/meals/';
    this.urlDetail = locationService.prepareExternalUrl(prodUrlDetail);
  }

  getMeals(mealDate: Date): Observable<IMeal[]> {
    return this.http
      .get<IMeal[]>(this.urlDetail + '?mealdate=' + mealDate.toISOString().slice(0, 10));
  }
}

