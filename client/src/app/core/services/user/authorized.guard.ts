import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanLoad {
  constructor(private userService: UserService, private router: Router) {}

  public canLoad(): boolean {
    if (!this.userService.isAuthorized) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
