import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-layout',
  template: `<div style="background-image: url('../assets/background.jpg'); background-size: cover; height:100vh;">
    <router-outlet></router-outlet></div>`,
  styles: []
})
export class LoginLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
