import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from 'src/app/shared/models/course';
import { Enrollment } from 'src/app/shared/models/enrollment';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  enrolledCourses: (Course & Enrollment)[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadEnrolledCourses();
  }

  loadEnrolledCourses(): void {
    this.http.get<{ courses: Course[] }>('/assets/courses.json').subscribe(courseData => {
      this.http.get<{ enrollments: Enrollment[] }>('/assets/enrollments.json').subscribe(enrollmentData => {
        const userId = 1; // Replace with the actual logged-in user's ID
        const userEnrollments = enrollmentData.enrollments.filter(enrollment => enrollment.userId === userId);

        this.enrolledCourses = userEnrollments.map(enrollment => {
          const course = courseData.courses.find(course => course.id === enrollment.courseId);
          if (course) {
            return { ...course, ...enrollment };
          }
          return null;
        }).filter(item => item !== null) as (Course & Enrollment)[];
      });
    });
  }
}
