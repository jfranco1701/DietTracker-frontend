import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
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
    return this.http.delete<any>(this.urlDetail + id).pipe(
      tap(_ => console.log(`deleted meal id=${id}`)),
      catchError(this.handleError<any>('deleteMeal'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
