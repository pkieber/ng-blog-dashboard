import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | null = null; // To store the current user.
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // To keep track whether the user is logged in or not.


  constructor(private auth: Auth, private toastr: ToastrService, private router: Router) {
    this.loadUser(); // Initialize currentUser when the service is created
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.loggedIn.next(true);
        this.toastr.success('Logged in successfully', 'Success');
        this.router.navigate(['/']);
      })
      .catch(() => {
        this.toastr.warning('Login failed: invalid user or password', 'Error');
      });
  }


  // This method is called when the service is created to initialize the currentUser property.
  private loadUser() {
    this.auth.onAuthStateChanged((user) => {
      this.currentUser = user;
      localStorage.setItem('user', JSON.stringify(user)); //
    });
  }


  logout() {
    this.auth.signOut().then(() => {
      this.currentUser = null;
      this.loggedIn.next(false);
      this.toastr.success('Logged out successfully', 'Success');
      this.router.navigate(['/login']);
    }).catch(() => {
      this.toastr.error('Logout failed', 'Error');
    });
  }


  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

}
