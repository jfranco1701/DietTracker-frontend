import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // http options used for making API calls
  private httpOptions: any;
  private currentUser: User;

  // error messages received from the login attempt
  public errors: any = [];

  constructor(private http: HttpClient,
    private locationService: Location) {

    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public login(user) {
    console.log('login ' + JSON.stringify(user));
    return this.http.post('http://diettracker-env.yhkmwyss9b.us-east-2.elasticbeanstalk.com/api/login/',
      JSON.stringify(user), this.httpOptions);
  }

  public register(newUser) {
    console.log('register ' + JSON.stringify(newUser));
    return this.http.post('http://diettracker-env.yhkmwyss9b.us-east-2.elasticbeanstalk.com/api/register/'
      , JSON.stringify(newUser), this.httpOptions);
  }

  // Refreshes the JWT token, to extend the time the user is logged in
  // public refreshToken() {
  //   this.http
  //     .post('/api-token-refresh/', JSON.stringify({ token: this.token }), this.httpOptions)
  //     .subscribe(
  //       data => {
  //         this.updateData(data['token']);
  //       },
  //       err => {
  //         this.errors = err['error'];
  //       }
  //     );
  // }

  public logout() {
    localStorage.removeItem('currentUser');
  }
}
