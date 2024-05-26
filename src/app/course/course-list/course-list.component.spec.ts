import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CourseListComponent } from './course-list.component';
import { DataService } from 'src/app/shared/services/data.service';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
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

    await TestBed.configureTestingModule({
      declarations: [CourseListComponent],
      imports: [
        MatListModule,
        MatCardModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: DataService, useValue: dataServiceMock }
      ]
    }).compileComponents();

    dataService = TestBed.inject(DataService);
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch course list on initialization', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(dataService.getCourses).toHaveBeenCalled();
    expect(component.courses.length).toBe(2);
    expect(component.courses).toEqual([
      { id: 1, title: 'Course 1', description: 'Description 1', instructor: 'Instructor 1', duration: '10 weeks', difficulty: 'Beginner' },
      { id: 2, title: 'Course 2', description: 'Description 2', instructor: 'Instructor 2', duration: '12 weeks', difficulty: 'Intermediate' }
    ]);
  });
});
