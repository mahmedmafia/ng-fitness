import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.sevice';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  ongoingTraining=false;
  excerciseSubscription:Subscription;
    constructor(private trainigService:TrainingService) { }

  ngOnInit() {
    this.excerciseSubscription = this.trainigService.excerciseChanged.subscribe(excercise=>{
      if (excercise !=null){
      this.ongoingTraining=true;
      }else{
      this.ongoingTraining=false;
      }
    });
  }

}
