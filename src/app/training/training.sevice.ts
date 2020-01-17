import { Injectable } from '@angular/core';
import { Excercise } from './excercise.model';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';
@Injectable({ providedIn: 'root' })
export class TrainingService {
    constructor(private db: AngularFirestore) { }
    private fbSubs: Subscription[] = [];

    excerciseChanged = new Subject<Excercise>();
    availableExcercisesChanged = new Subject<Excercise[]>();
    finishedExcercisesChanged = new Subject<Excercise[]>();
    availableExcercises: Excercise[] = [
        // { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        // { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        // { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        // { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];
    private runningExcercise: Excercise;
    private finishedExcercises: Excercise[] = [];
    fetchAvailableExcercises() {
        this.fbSubs.push(this.db.collection('availableExcercises')
            .snapshotChanges().pipe(map(docArray => {

                return docArray.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        name: doc.payload.doc.data()['name'],
                        duration: doc.payload.doc.data()['duration'],
                        calories: doc.payload.doc.data()['calories'],
                    };
                });
            })).subscribe((excercises: Excercise[]) => {
                this.availableExcercises = excercises;
                this.availableExcercisesChanged.next([...this.availableExcercises]);
            }));
    }
    startExcercise(selected: Excercise) {
        this.runningExcercise = selected;
        this.excerciseChanged.next({ ...this.runningExcercise });
    }
    completeExcercise() {
        this.addDataToDataBase(
            {
                ...this.runningExcercise,
                date: new Date(),
                state: 'completed'
            }
        );
        this.runningExcercise = null;
        this.excerciseChanged.next(null);
    }
    cancelExcercise(progress: number) {
        this.addDataToDataBase(
            {
                ...this.runningExcercise,
                duration: this.runningExcercise.duration * (progress / 100),
                calories: this.runningExcercise.calories * (progress / 100),
                date: new Date(),
                state: 'cancelled'
            }
        );
        this.runningExcercise = null;
        this.excerciseChanged.next(this.runningExcercise);
    }
    getRunningExcercise() {
        return { ...this.runningExcercise };
    }
    fetchCompletedOrCancelledExcercsises() {
        this.fbSubs.push(this.db.collection('finishedExcercises')
            .valueChanges().subscribe((finishedExcercises: Excercise[]) => {
                this.finishedExcercises = finishedExcercises;
                this.finishedExcercisesChanged.next([...this.finishedExcercises]);
            }));
    }
    cancelSubscription(){
        this.fbSubs.forEach(sub=> sub.unsubscribe());
    }
    private addDataToDataBase(excercise: Excercise) {
        this.db.collection('finishedExcercises').add(excercise);
    }
}