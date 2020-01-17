import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.sevice';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sideNavClose = new EventEmitter<void>();
  isAuth: boolean;
  authSubscribtion: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscribtion = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }
  onCloseSideNav() {
    this.sideNavClose.emit();
    
  }
  Logout() {
    this.authService.logout();
    this.onCloseSideNav();
  }
  ngOnDestroy(): void {
    this.authSubscribtion.unsubscribe();
  }
}
