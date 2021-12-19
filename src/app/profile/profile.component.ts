import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  pagetitle = 'Профиль';
  currentUser: any;
  isLoggedIn = false;

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    const login = this.loginService.login();

    if (login) {
      this.isLoggedIn = true;
      this.currentUser = login.currentUser;
    }
  }
}
