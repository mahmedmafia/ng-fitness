import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.sevice';
import { MatSnackBar } from '@angular/material';
import { UIService } from '../shared/ui.service';
@Injectable({ providedIn: 'root' })
export class AuthService {
    private user: User;
    private isAuthenticated = false;
    authChange = new Subject<boolean>();
    constructor(private router: Router, private afauth: AngularFireAuth, private uiServ: UIService, private trainserv: TrainingService, private snackBar: MatSnackBar) { }
    registerUser(authData: AuthData) {
        this.uiServ.loadingStateChanged.next(true);
        this.afauth.auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then(res => {
        this.uiServ.loadingStateChanged.next(false);

            }).catch(err => {
                this.uiServ.loadingStateChanged.next(false);

                this.uiServ.showSnackBar(err.message, null, 3000);

            });

    }
    initAuthListener() {
        this.afauth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.trainserv.cancelSubscription();
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.router.navigate(['/login']);
            }
            console.log(user);
        });
    }
    login(authData: AuthData) {
        this.uiServ.loadingStateChanged.next(true);

        this.afauth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(res => {
            // console.log(res.user.email);
            this.user = { email: res.user.email };
            this.uiServ.loadingStateChanged.next(false);

        }).catch(err => {
            this.uiServ.loadingStateChanged.next(false);

            this.uiServ.showSnackBar(err.message,null,3000);
        });
    }
    logout() {
        this.afauth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }
}