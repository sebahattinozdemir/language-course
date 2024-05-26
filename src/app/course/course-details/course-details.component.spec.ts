import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CourseDetailsComponent } from './course-details.component';
import { DataService } from 'src/app/shared/services/data.service';

describe('CourseDetailsComponent', () => {
  let component: CourseDetailsComponent;
  let fixture: ComponentFixture<CourseDetailsComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    const dataServiceMock = {
      getCourses: jasmine.createSpy('getCourses').and.returnValue(of({
        courses: [
          { id: 1, title: 'Course 1', description: 'Description 1', instructor: 'Instructor 1', duration: '10 weeks', difficulty: 'Beginner' },
          { id: 2, title: 'Course 2', description: 'Description 2', instructor: 'Instructor 2', duration: '12 weeks', difficulty: 'Intermediate' }
        ]
      }))
    };

    const activatedRouteMock = {
      params: of({ id: '1' })
    };

    await TestBed.configureTestingModule({
      declarations: [CourseDetailsComponent],
      providers: [
        { provide: DataService, useValue: dataServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    dataService = TestBed.inject(DataService);
    fixture = TestBed.createComponent(CourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch course details based on route parameter', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(dataService.getCourses).toHaveBeenCalled();
    expect(component.course).toEqual({ id: 1, title: 'Course 1', description: 'Description 1', instructor: 'Instructor 1', duration: '10 weeks', difficulty: 'Beginner' });
  });
});
