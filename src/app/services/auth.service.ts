import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject to store the current user's data.
  currentUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  // Observable representing whether a user is logged in or not.
  loggedIn$: Observable<boolean> = this.currentUser$.pipe(
    map(user => !!user)
  );

  isLoggedInGuard: boolean = false; // used for router guard.


  constructor(private auth: Auth, private toastr: ToastrService, private router: Router) {
    this.loadUser(); // Initialize currentUser when the service is created
  }


  // Logs in the user with the provided email and password.
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.toastr.success('Logged in successfully', 'Success');
        this.isLoggedInGuard = true; // used for router guard.
        this.router.navigate(['/']);
      })
      .catch(() => {
        this.toastr.warning('Login failed: invalid user or password', 'Error');
      });
  }


  // Loads the current user's data and updates the currentUser$ BehaviorSubject.
  // This method is called when the service is created.
  private loadUser() {
    this.auth.onAuthStateChanged((user) => {
      this.currentUser$.next(user);
    });
  }


  // Logs out the current user.
  logout() {
    this.auth.signOut().then(() => {
      this.toastr.success('Logged out successfully', 'Success');
      this.isLoggedInGuard = false; // used for router guard.
      this.router.navigate(['/login']);
    }).catch(() => {
      this.toastr.error('Logout failed', 'Error');
    });
  }
}
