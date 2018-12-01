import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { IWeight } from '../interfaces/IWeight';

@Injectable({
  providedIn: 'root',
})
export class WeightService {
  private urlDetail: string;

  constructor(private http: HttpClient, private locationService: Location) {
    const prodUrlDetail = '/api/weights/';
    this.urlDetail = locationService.prepareExternalUrl(prodUrlDetail);
  }

  getWeights(): Observable<IWeight[]> {
    return this.http.get<IWeight[]>(this.urlDetail);
  }

  deleteWeight(id): Observable<any> {
    return this.http.delete<any>(this.urlDetail + id + '/').pipe(
      retry(3),
      tap(_ => console.log(`deleted weight id=${id}`)),
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
