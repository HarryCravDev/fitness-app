import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() toggleSideNavEmit = new EventEmitter();
  authSubscription: Subscription | undefined;
  isAuth = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authChange => {
      this.isAuth = authChange;
    })
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  toggleSideNav(){
    this.toggleSideNavEmit.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
