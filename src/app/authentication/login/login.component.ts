import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: any;

  constructor( public _authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    };
  }

  login() {
    console.log('logging in ' + this.user.username);
    this._authenticationService.login({'username': this.user.username, 'password': this.user.password })
  }
}
