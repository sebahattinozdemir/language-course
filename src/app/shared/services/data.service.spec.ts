import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getUsers', () => {
    it('should return an Observable of users', () => {
      const mockUsers = [
        { id: 1, email: 'user@example.com', password: 'password', registrationDate: '2024-05-24' },
        { id: 2, email: 'user2@example.com', password: 'password2', registrationDate: '2024-05-25' }
      ];

      service.getUsers().subscribe(users => {
        expect(users).toEqual({ users: mockUsers });
      });

      const req = httpMock.expectOne('/assets/users.json');
      expect(req.request.method).toBe('GET');
      req.flush({ users: mockUsers });
    });
  });

  describe('#getCourses', () => {
    it('should return an Observable of courses', () => {
      const mockCourses = [
        { id: 1, title: 'Course 1', description: 'Description 1', instructor: 'Instructor 1', duration: '10 weeks', difficulty: 'Beginner' },
        { id: 2, title: 'Course 2', description: 'Description 2', instructor: 'Instructor 2', duration: '12 weeks', difficulty: 'Intermediate' }
      ];

      service.getCourses().subscribe(courses => {
        expect(courses).toEqual({ courses: mockCourses });
      });

      const req = httpMock.expectOne('/assets/courses.json');
      expect(req.request.method).toBe('GET');
      req.flush({ courses: mockCourses });
    });
  });

  describe('#getEnrollments', () => {
    it('should return an Observable of enrollments', () => {
      const mockEnrollments = [
        { userId: 1, courseId: 1, enrollmentDate: '2024-05-24', progress: '30%' },
        { userId: 2, courseId: 2, enrollmentDate: '2024-05-25', progress: '50%' }
      ];

      service.getEnrollments().subscribe(enrollments => {
        expect(enrollments).toEqual({ enrollments: mockEnrollments });
      });

      const req = httpMock.expectOne('/assets/enrollments.json');
      expect(req.request.method).toBe('GET');
      req.flush({ enrollments: mockEnrollments });
    });
  });
});
