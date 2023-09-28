import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private toastr: ToastrService, private router: Router ) { }


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

}
