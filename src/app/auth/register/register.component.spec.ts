import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { RegisterComponent } from './register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    const authServiceMock = {
      register: jasmine.createSpy('register').and.callFake((email: string, password: string) => {
        return of({ email, id: 1, registrationDate: '2024-05-24' });
      })
    };

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register successfully', () => {
    spyOn(console, 'log');
    component.email = 'test@example.com';
    component.password = 'password';
    component.register();
    fixture.detectChanges();

    expect(authService.register).toHaveBeenCalledWith('test@example.com', 'password');
    expect(console.log).toHaveBeenCalledWith('Registration successful', { email: 'test@example.com', id: 1, registrationDate: '2024-05-24' });
  });
});
