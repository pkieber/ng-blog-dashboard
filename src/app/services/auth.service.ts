import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private toastr: ToastrService ) { }


  // Login
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.toastr.success('Logged in successfully', 'Success');
      })
      .catch(error => {
        // Handle login error here
        this.toastr.error('Login failed: ' + error.message, 'Error');
      });
  }


}
