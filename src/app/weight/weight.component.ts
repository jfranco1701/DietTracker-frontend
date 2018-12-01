import { Component, OnInit } from '@angular/core';
import { Weight } from '../models/weight';
import { IWeight } from '../interfaces/IWeight';
import { WeightService } from '../services/weight.service';
import { ConfirmationService } from 'primeng/api';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class WeightComponent implements OnInit {
  weightData: any;
  options: any;
  weights: IWeight[];
  weightStart: number;
  weightGoal: number;
  dayStart: number;
  dayEnd: number;
  displayAdd: boolean;

  constructor(
    private weightService: WeightService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
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
    this.weights = [];
    this.getWeights();

    this.weightStart = 220.5;
    this.weightGoal = 150;
    this.dayStart = 0;
    this.dayEnd = 0;


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
        const date = this.weights[i].weightdate.toString().slice(0, 10);
        dateLabels.push(date.substr(5) + '-' + date.substr(0, 4));
        goal.push(this.weightGoal);
        start.push(this.weightStart);
        weight.push(this.weights[i].userweight);
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

  deleteClick(id: number, weightDate: Date) {
    this.confirmationService.confirm({
      message: 'Delete Entry From ' + weightDate.toString() + '?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteWeight(id);
      }
    });
  }

  deleteWeight(id: number) {
    this.weightService.deleteWeight(id)
      .subscribe(res => {
        }, err => {
          console.log(err);
          this.messageService.add({severity: 'error', summary: 'Error Message', detail: 'Failed to Delete Weight Entry'});
        },
        () => {
          this.messageService.add({severity: 'success', summary: 'Success Message', detail: 'Weight Entry Deleted'});
          this.getWeights();
        }
      );
  }

  getWeights() {
    this.weightService
    .getWeights()
    .subscribe(weights => {
      this.weights = weights;
      this.updateChart();
    });
  }
}
