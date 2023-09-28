import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userEmail!: string | null;
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService) {}


  ngOnInit() {
    this.isLoggedIn$ = this.authService.loggedIn$;

    // Subscribe to changes in the current user to update userEmail
    this.authService.currentUser$.subscribe((user) => {
      this.userEmail = user ? user.email : null;
    });
  }


  onLogout() {
    this.authService.logout();
  }
}
