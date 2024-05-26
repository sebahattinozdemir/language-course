import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    const authServiceMock = {
      login: jasmine.createSpy('login').and.callFake((email: string, password: string) => {
        if (email === 'test@example.com' && password === 'password') {
          return of({ email, token: 'sample-jwt-token' });
        } else {
          return of(null);
        }
      })
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully and navigate to courses', () => {
    component.email = 'test@example.com';
    component.password = 'password';
    component.login();
    fixture.detectChanges();

    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password');
    expect(localStorage.getItem('userToken')).toBe('sample-jwt-token');
    expect(localStorage.getItem('userEmail')).toBe('test@example.com');
    expect(router.navigate).toHaveBeenCalledWith(['/courses']);
    expect(component.errorMessage).toBe('');
  });

  it('should fail login and set error message', () => {
    component.email = 'wrong@example.com';
    component.password = 'wrongpassword';
    component.login();
    fixture.detectChanges();

    expect(authService.login).toHaveBeenCalledWith('wrong@example.com', 'wrongpassword');
    expect(localStorage.getItem('userToken')).toBeNull();
    expect(localStorage.getItem('userEmail')).toBeNull();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe('Invalid email or password. Please try again.');
  });
});
