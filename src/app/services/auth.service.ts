import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | null = null;

  constructor(private auth: Auth, private toastr: ToastrService, private router: Router) {
    this.loadUser(); // Initialize currentUser when the service is created
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.toastr.success('Logged in successfully', 'Success');
        this.router.navigate(['/']);
      })
      .catch(() => {
        this.toastr.warning('Login failed: invalid user or password', 'Error');
      });
  }

  private loadUser() {
    this.auth.onAuthStateChanged((user) => {
      this.currentUser = user;
      localStorage.setItem('user', JSON.stringify(user)); //
    });
  }


  logout() {
    this.auth.signOut().then(() => {
      this.currentUser = null;
      this.toastr.success('Logged out successfully', 'Success');
      this.router.navigate(['/login']);
    }).catch(() => {
      this.toastr.error('Logout failed', 'Error');
    });
  }
}

