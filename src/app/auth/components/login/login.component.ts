import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  errorAlert: any = null;

  login = new FormGroup({
    usertype: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  getUsertypeErrorMessage() {
    if (this.login.controls['usertype'].hasError('required')) {
      return 'Please select a role';
    }
    else {
      return null;
    }
  }

  getEmailErrorMessage() {
    if (this.login.controls['email'].hasError('required')) {
      return 'Please enter your email';
    }
    else if (this.login.controls['email'].hasError('email')) {
      return 'Please enter a valid email';
    }
    else {
      return null;
    }
  }

  getPasswordErrorMessage() {
    if (this.login.controls['password'].hasError('required')) {
      return 'Please enter your password';
    }
    else {
      return null;
    }
  }

  loginUser = () => {
    this.auth.loginUser(this.login.value).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('isAuth', 'true');
        if (this.login.controls['usertype'].value == 'patient')
        {
          localStorage.setItem('usertype', 'patient');
          localStorage.setItem('ptemail', this.login.controls['email'].value);
          this.router.navigate(['patient']);
        }
        else if (this.login.controls['usertype'].value == 'doctor')
        {
          localStorage.setItem('usertype', 'doctor');
          localStorage.setItem('dremail', this.login.controls['email'].value);
          this.router.navigate(['doctor']);
        }
        else if (this.login.controls['usertype'].value == 'operator')
        {
          localStorage.setItem('usertype', 'operator');
          this.router.navigate(['operator']);
        }
      },
      err => {
        this.errorAlert = err;
        setTimeout(() => {
          this.errorAlert = null;
        }, 5 * 1000);
      }
    );
  }

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

}