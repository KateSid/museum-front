import { Injectable } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdmin = false;

  constructor(private tokenStorageService: TokenStorageService) { }

  login() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.roles = user.roles;
      this.showAdmin = this.roles.includes('ROLE_ADMIN');
      return {
        showAdmin: this.showAdmin,
        currentUser: user,
      };
    }
    else {
      return false;
    }
  }
}
