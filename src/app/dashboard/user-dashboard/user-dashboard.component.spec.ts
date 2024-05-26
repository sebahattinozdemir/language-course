import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Course } from '../../shared/models/course';
import { Enrollment } from '../../shared/models/enrollment';
import { UserDashboardComponent } from './user-dashboard.component';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDashboardComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load enrolled courses on initialization', () => {
    const mockCourses: Course[] = [
      { id: 1, title: 'Course 1', description: 'Description 1', instructor: 'Instructor 1', duration: '10 weeks', difficulty: 'Beginner' },
      { id: 2, title: 'Course 2', description: 'Description 2', instructor: 'Instructor 2', duration: '12 weeks', difficulty: 'Intermediate' }
    ];

    const mockEnrollments: Enrollment[] = [
      { userId: 1, courseId: 1, enrollmentDate: '2024-05-24', progress: '30%' },
      { userId: 1, courseId: 2, enrollmentDate: '2024-05-25', progress: '50%' }
    ];

    component.ngOnInit();

    const reqs = httpMock.match('/assets/courses.json');
    expect(reqs.length).toBe(2);
    reqs[0].flush({ courses: mockCourses });

    const reqs2 = httpMock.match('/assets/enrollments.json');
    expect(reqs2.length).toBe(1);
    reqs2[0].flush({ enrollments: mockEnrollments });

    fixture.detectChanges();

    expect(component.enrolledCourses.length).toBe(2);
    expect(component.enrolledCourses).toEqual([
      { ...mockCourses[0], ...mockEnrollments[0] },
      { ...mockCourses[1], ...mockEnrollments[1] }
    ]);
  });

  it('should filter enrollments by user ID', () => {
    const mockCourses: Course[] = [
      { id: 1, title: 'Course 1', description: 'Description 1', instructor: 'Instructor 1', duration: '10 weeks', difficulty: 'Beginner' },
      { id: 2, title: 'Course 2', description: 'Description 2', instructor: 'Instructor 2', duration: '12 weeks', difficulty: 'Intermediate' }
    ];

    const mockEnrollments: Enrollment[] = [
      { userId: 1, courseId: 1, enrollmentDate: '2024-05-24', progress: '30%' },
      { userId: 2, courseId: 2, enrollmentDate: '2024-05-25', progress: '50%' } // Different user
    ];

    component.ngOnInit();

    const reqs = httpMock.match('/assets/courses.json');
    expect(reqs.length).toBe(2);
    reqs[0].flush({ courses: mockCourses });

    const reqs2 = httpMock.match('/assets/enrollments.json');
    expect(reqs2.length).toBe(1);
    reqs2[0].flush({ enrollments: mockEnrollments });

    fixture.detectChanges();

    expect(component.enrolledCourses.length).toBe(1);
    expect(component.enrolledCourses).toEqual([{ ...mockCourses[0], ...mockEnrollments[0] }]);
  });
});
