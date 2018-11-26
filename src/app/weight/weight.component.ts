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
  weightStart: number;
  weightGoal: number;
  dayStart: number;
  dayEnd: number;
  displayAdd: boolean;

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
    this.displayAdd = false;

    this.weights = [
      { 'weightDate': new Date('2018-07-01'), 'weightAmt': 200.5},
      { 'weightDate': new Date('2018-08-01'), 'weightAmt': 180.5},
      { 'weightDate': new Date('2018-09-01'), 'weightAmt': 170.5},
    ];

    this.weightStart = 220.5;
    this.weightGoal = 150;
    this.dayStart = 0;
    this.dayEnd = 0;

    this.updateChart();
  }

  updateChart() {
     let dateLabels: string[];
     let goal: number[];
     let start: number[];
     let weight: number[];

     dateLabels = [];
     goal = [];
     start = [];
     weight = [];

     for (let i = 0; i < this.weights.length; i++) {
        const date = this.weights[i].weightDate.toISOString().slice(0, 10);
        dateLabels.push(date.substr(5) + '-' + date.substr(0, 4));
        goal.push(this.weightGoal);
        start.push(this.weightStart);
        weight.push(this.weights[i].weightAmt);
     }

    this.weightData = {
      labels: dateLabels,
      datasets: [
        {
          label: 'Weight',
          data: weight,
          fill: false,
          borderColor: '#000000'
        },
        {
           label: 'Start Weight',
           data: start,
           fill: false,
          borderColor: '#ff0000'
        },
        {
           label: 'Goal Weight',
           data: goal,
           fill: false,
           borderColor: '#008000'
        }
      ]
    };
  }

  showAdd() {
    this.displayAdd = true;
  }

  addWeight() {
    this.weights.push(
      { 'weightDate': new Date('2018-10-01'), 'weightAmt': 160.5},
    );

    this.displayAdd = false;
    this.updateChart();
  }
}
