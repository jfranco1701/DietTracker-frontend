import { Component, OnInit } from '@angular/core';
import { Weight } from '../models/weight';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {
  weightData: any;
  options: any;
  weights: Weight[];

  constructor() {
    this.options = {
      title: {
        display: true,
        text: 'My Progress',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
  }

  ngOnInit() {
    this.weightData = {
      labels: [-60, -40, -20, 0],
      datasets: [
        {
          label: 'Weight',
          data: [200, 195, 180, 170],
          fill: false,
          borderColor: '#000000'
        },
        {
          label: 'Goal Weight',
          data: [140, 140, 140, 140],
          fill: false,
          borderColor: '#008000'
        },
        {
          label: 'Start Weight',
          data: [200, 200, 200, 200],
          fill: false,
          borderColor: '#ff0000'
        }
      ]
    };

    this.weights = [
      { 'weightDate': new Date('2018-07-01'), 'weightAmt': 200.5},
      { 'weightDate': new Date('2018-08-01'), 'weightAmt': 180.5},
      { 'weightDate': new Date('2018-09-01'), 'weightAmt': 170.5},
    ];
  }

  update(event) {}

  addWeight() {}
}
