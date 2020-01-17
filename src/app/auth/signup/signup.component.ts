import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.sevice';
import { AuthData } from '../auth-data.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }
  isLoading=false;
  private loadingSubs:Subscription;
  @ViewChild('f', { static: false }) form: NgForm;

  constructor(private authService: AuthService,private uiServ:UIService) { }
  maxDate;
  ngOnInit() {
    this.loadingSubs=this.uiServ.loadingStateChanged.subscribe(res=>{
      this.isLoading=res;
    });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  onSubmit(form: NgForm) {
    let newUser: AuthData;
    this.authService.registerUser({ email: form.value.email, password: form.value.password });
  }
}
