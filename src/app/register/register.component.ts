import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  pagetitle = 'Регистрация';
  form: any = {
    username: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const login = this.loginService.login();

    if (login) {
      this.redirectTo('profile');
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.register(username, password).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.redirectTo('login');
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  redirectTo(path: string): void {
    this.router.navigateByUrl(`/${path}`);
  }
}
