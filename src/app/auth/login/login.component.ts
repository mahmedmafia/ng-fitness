import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.sevice';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authService: AuthService, private uiServ: UIService) { }
  isLoading = false;
  private loadingSubs: Subscription;
  ngOnInit() {
    this.loadingSubs = this.uiServ.loadingStateChanged.subscribe(res => {
      this.isLoading = res;
    });
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', {
          validators: [Validators.required, Validators.email]
        }),
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)]
        }),
      }
    );

  }
  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

}
