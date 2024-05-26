import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './Auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;
  let routerNavigateSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }]
    });

    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    routerNavigateSpy = router.navigate as jasmine.Spy;
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow the authenticated user to access the route', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fakeToken');
    const result = authGuard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toBeTrue();
  });

  it('should not allow the unauthenticated user to access the route', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const result = authGuard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toBeFalse();
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/auth/login']);
  });
});
