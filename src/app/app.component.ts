import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth/auth.sevice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-fitness';
  constructor(private authSev: AuthService) { }
  ngOnInit(): void {
    this.authSev.initAuthListener();
  };

}
