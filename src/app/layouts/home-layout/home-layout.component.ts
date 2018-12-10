import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
    <div style="min-width:1024px;">
    <app-header></app-header>
    </div>
    <div style="width:1024px;margin:0 auto">
    <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class HomeLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
