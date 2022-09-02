import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isAuthorized: boolean = false;

  public setIsAuthorized(isAuthorized: boolean): void {
    this.isAuthorized = isAuthorized;
  }
}
