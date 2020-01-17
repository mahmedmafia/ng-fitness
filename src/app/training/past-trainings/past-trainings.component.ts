import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Excercise } from '../excercise.model';
import { TrainingService } from '../training.sevice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit,OnDestroy {
 

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Excercise>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  finishedExcercisesSubscribtion:Subscription;
  constructor(private trainingServ: TrainingService) { }

  ngOnInit() {
    this.finishedExcercisesSubscribtion=this.trainingServ.finishedExcercisesChanged.subscribe(finished => {
      this.dataSource.data = finished;
    });
    this.trainingServ.fetchCompletedOrCancelledExcercsises();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  filter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy(): void {
    this.finishedExcercisesSubscribtion.unsubscribe();
  }

}
