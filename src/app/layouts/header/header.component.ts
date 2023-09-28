import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userEmail: string | null;

  constructor(private authService: AuthService) {
    // Retrieve the user from local storage and parse it as a JavaScript object
    const userString = localStorage.getItem('user');
    const userObject = userString ? JSON.parse(userString) : null;

    // Extract the email property
    this.userEmail = userObject ? userObject.email : null;
  }

  onLogout() {
    this.authService.logout();

    // Remove the user from local storage
    localStorage.removeItem('user');
    this.userEmail = null;
  }
}
