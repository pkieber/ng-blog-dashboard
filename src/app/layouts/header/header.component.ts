import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userEmail: string | null;
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService) {
    // Retrieve the user from local storage and parse it as a JavaScript object
    const userString = localStorage.getItem('user');
    const userObject = userString ? JSON.parse(userString) : null;

    // Extract the email property
    this.userEmail = userObject ? userObject.email : null;
  }


  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }


  onLogout() {
    this.authService.logout();

    // Remove the user from local storage
    localStorage.removeItem('user');
    this.userEmail = null;
  }
}
