import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.sevice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth: boolean;
  authSubscribtion: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscribtion = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }
  onToggleSideNav() {
    this.sideNavToggle.emit();
  }
  Logout() {
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.authSubscribtion.unsubscribe();
  }
}
