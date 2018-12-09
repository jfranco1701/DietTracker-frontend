import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { IMeal } from '../interfaces/IMeal';
import { IMealTotals } from '../interfaces/IMealTotals';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private urlDetail: string;

  constructor(private http: HttpClient, private locationService: Location) {
    const prodUrlDetail = '/api/meals/';
    this.urlDetail = locationService.prepareExternalUrl(prodUrlDetail);
  }

  getMeals(mealDate: Date, mealType: string): Observable<IMeal[]> {
    return this.http.get<IMeal[]>(this.urlDetail + '?mealdate=' + mealDate.toISOString().slice(0, 10) +
      '&mealtype=' + mealType);
  }

  getMealTotals(mealDate: Date): Observable<IMealTotals> {
    return this.http.get<IMealTotals>(this.urlDetail + 'totals/?mealdate=' + mealDate.toISOString().slice(0, 10));
  }


  deleteMeal(id): Observable<any> {
    return this.http.delete<any>(this.urlDetail + id + '/').pipe(
      retry(3),
      tap(_ => console.log(`deleted meal id=${id}`)),
     catchError(this.handleError));
  }

  addMeal(userId: number, foodName: string, caloriesCount: number, fatCount: number, carbsCount: number, fiberCount: number,
    sugarsCount: number, proteinCount: number, measureAmt: string, mealDate: Date, mealType: string, quantity: number): Observable<IMeal> {
    const obj = {
      userid: userId,
      foodname: foodName,
      calories: caloriesCount,
      fat: fatCount,
      carbs: carbsCount,
      protein: proteinCount,
      fiber: fiberCount,
      sugars: sugarsCount,
      measure: measureAmt,
      mealdate: mealDate.toISOString().slice(0, 10),
      mealtype: mealType,
      quantity: quantity
    };

    console.log('posting now to ' + this.urlDetail);
    console.log(obj);

    return this.http.post<IMeal>(this.urlDetail, obj).pipe(
      retry(3),
      tap(_ => console.log(`add meal`)),
      catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
