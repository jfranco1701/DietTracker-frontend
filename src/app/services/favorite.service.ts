import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { IFavorite } from '../interfaces/IFavorite';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private urlDetail: string;

  constructor(
    private http: HttpClient,
    private locationService: Location
  ) {
    const prodUrlDetail = '/api/favorites/';
    this.urlDetail = locationService.prepareExternalUrl(prodUrlDetail);
  }

  getFavorites(): Observable<IFavorite[]> {
    return this.http
      .get<IFavorite[]>(this.urlDetail);
  }

  deleteFavorite(id): Observable<any> {
    return this.http.delete<any>(this.urlDetail + id + '/').pipe(
      retry(3),
      tap(_ => console.log(`deleted favorite id=${id}`)),
     catchError(this.handleError));
  }

  addFavorite(userId: number, foodName: string, caloriesCount: number, fatCount: number, carbsCount: number, fiberCount: number,
    sugarsCount: number, proteinCount: number, measureAmt: string): Observable<IFavorite> {
    const obj = {
      userid: userId,
      foodname: foodName,
      calories: caloriesCount,
      fat: fatCount,
      carbs: carbsCount,
      protein: proteinCount,
      fiber: fiberCount,
      sugars: sugarsCount,
      measure: measureAmt
    };

    console.log('posting now to ' + this.urlDetail);
    console.log(obj);

    return this.http.post<IFavorite>(this.urlDetail, obj).pipe(
      retry(3),
      tap(_ => console.log(`add favorite.`)),
      catchError(this.handleError));
  }

  handleError(error) {
    console.log('errror');
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







