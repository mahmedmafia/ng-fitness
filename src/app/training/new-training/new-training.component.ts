import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.sevice';
import { Excercise } from '../excercise.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit,OnDestroy {
  
  @Output() trainingStart = new EventEmitter<void>();
  Excercies:Excercise[];
  selectedExcercise;
  excerciseSubscription:Subscription;
  constructor(private trainService: TrainingService) { }

  ngOnInit() {
    // this.Excercies = this.trainService.getExcercises();
    this.excerciseSubscription=this.trainService.availableExcercisesChanged.subscribe(res=>{
        this.Excercies=res;
      this.selectedExcercise = this.Excercies[0];

    });
    this.trainService.fetchAvailableExcercises();

  }
  onStartTraining() {
    this.trainService.startExcercise(this.selectedExcercise);
  }
  ngOnDestroy(): void {
    this.excerciseSubscription.unsubscribe();
  }
}
