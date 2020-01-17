import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.sevice';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { Excercise } from '../excercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer;
  activeExcercise: Excercise;


  constructor(public dialog: MatDialog, private trainServ: TrainingService) { }
  ngOnInit() {
    this.StartOrResumeTraining();
  }
  StartOrResumeTraining() {
    this.activeExcercise = this.trainServ.getRunningExcercise();
    const step=this.activeExcercise.duration /100 *1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        clearInterval(this.timer);
        this.trainServ.completeExcercise();
      }
    }, step);
  }
  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainServ.cancelExcercise(this.progress);
      } else {
        this.StartOrResumeTraining();
      }
    });
  }

}
