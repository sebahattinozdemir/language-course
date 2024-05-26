import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { DataService } from 'src/app/shared/services/data.service';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  course: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const courseId = +params['id']; // Get the course ID from route parameters
      this.dataService.getCourses().subscribe(data => {
        this.course = data.courses.find((c:Course) => c.id === courseId);
      });
    });
  }
}


