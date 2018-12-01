import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { IMeal } from '../interfaces/IMeal';

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

  deleteMeal(id): Observable<any> {
    return this.http.delete<any>(this.urlDetail + id + '/').pipe(
      retry(3),
      tap(_ => console.log(`deleted meal id=${id}`)),
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
