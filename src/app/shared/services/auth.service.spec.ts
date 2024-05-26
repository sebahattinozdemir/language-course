import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User } from '../models/user';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    it('should return user with token if credentials are correct', () => {
      const mockUsers: User[] = [
        { id: 1, email: 'user@example.com', password: 'password', registrationDate: '2024-05-24' }
      ];
      const email = 'user@example.com';
      const password = 'password';

      service.login(email, password).subscribe(user => {
        expect(user).toBeTruthy();
        expect(user?.token).toBe('sample-jwt-token');
      });

      const req = httpMock.expectOne('/assets/users.json');
      expect(req.request.method).toBe('GET');
      req.flush({ users: mockUsers });
    });

    it('should return null if credentials are incorrect', () => {
      const mockUsers: User[] = [
        { id: 1, email: 'user@example.com', password: 'password', registrationDate: '2024-05-24' }
      ];
      const email = 'user@example.com';
      const password = 'wrongpassword';

      service.login(email, password).subscribe(user => {
        expect(user).toBeNull();
      });

      const req = httpMock.expectOne('/assets/users.json');
      expect(req.request.method).toBe('GET');
      req.flush({ users: mockUsers });
    });
  });

  describe('#register', () => {
    it('should register a new user and return the user with current date as registration date', () => {
      const mockUsers: User[] = [
        { id: 1, email: 'user@example.com', password: 'password', registrationDate: '2024-05-24' }
      ];
      const email = 'newuser@example.com';
      const password = 'newpassword';

      service.register(email, password).subscribe(user => {
        expect(user).toBeTruthy();
        expect(user.id).toBe(2);
        expect(user.email).toBe(email);
        expect(user.password).toBe(password);
        expect(user.registrationDate).toBe(new Date().toISOString().split('T')[0]);
      });

      const req = httpMock.expectOne('/assets/users.json');
      expect(req.request.method).toBe('GET');
      req.flush({ users: mockUsers });
    });
  });
});
