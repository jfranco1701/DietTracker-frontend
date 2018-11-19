import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAppUser } from '../interfaces/IAppUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpOptions: any;

  constructor(private http: HttpClient, private locationService: Location) {
      this.httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
  }

  getUsers(): Observable<IAppUser[]> {
    return this.http
      .get<IAppUser[]>(this.locationService.prepareExternalUrl('/api/users/'));
  }
}
