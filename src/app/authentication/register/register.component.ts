import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  emailAddress: string;
  confirmEmailAddress: string;
  password: string;
  confirmPassword: string;
  lastName: string;
  firstName: string;
  recaptcha: any;

  constructor() { }

  showResponse(event) {
    // call to a backend to verify against recaptcha with private key
}

  ngOnInit() {
    this.recaptcha = (window as any).grecaptcha;
  }

}
