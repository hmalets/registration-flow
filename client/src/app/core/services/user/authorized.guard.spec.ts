import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthorizedGuard } from './authorized.guard';
import { UserService } from './user.service';

describe('AuthorizedGuard', () => {
  let guard: AuthorizedGuard;
  let userService: UserService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizedGuard);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user is authorized', () => {
    userService.setIsAuthorized(true);
    expect(guard.canLoad()).toBeTruthy();
  });

  it('should redirect if user is not authorized', () => {
    userService.setIsAuthorized(false);
    spyOn(router, 'navigate');
    guard.canLoad();
    expect(router.navigate).toHaveBeenCalled();
  });
});
