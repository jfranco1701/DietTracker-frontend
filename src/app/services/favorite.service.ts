import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
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
}
