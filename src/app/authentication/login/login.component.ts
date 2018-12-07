import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: any;
  public errors: any = [];
  private currentUser: User;
  loginForm: FormGroup;

  constructor( public _authenticationService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    };

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log(this.loginForm.value, this.loginForm.valid);
    this.login(this.loginForm.value.email, this.loginForm.value.password);
  }

  login(username: string, password: string) {
    console.log('logging in ' + this.user.username);


    this._authenticationService.login({'username': username, 'password': password }).subscribe(
        data => {
          console.log(data);
          this.updateData(data['token'], data['lastName'], data['firstName'], data['dateJoined']);
          this.router.navigate(['/home']);
        },
        err => {
          this.errors = err['error'];
          localStorage.removeItem('currentUser');
          console.log(this.errors);
        });
  }

  private updateData(token, lastName, firstName, dateJoined) {
    this.currentUser = new User();
    this.errors = [];
    // decode the token to read the username and expiration timestamp
    const token_parts = token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));

    this.currentUser.token = token;
    this.currentUser.tokenExpires = new Date(token_decoded.exp * 1000);
    this.currentUser.email = token_decoded.email;
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
    this.currentUser.joinDate = dateJoined;
    this.currentUser.username = token_decoded.username;
    this.currentUser.userid = token_decoded.user_id;

    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }
}
