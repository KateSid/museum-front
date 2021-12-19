import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Музей';
  isLoggedIn = false;
  showAdmin = false;

  constructor(
    private loginService: LoginService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    const login = this.loginService.login();

    if (login) {
      this.isLoggedIn = true;
      this.showAdmin = login.showAdmin;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
