import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];

  constructor(private dataService: DataService) { }

  displayedColumns: string[] = ['title', 'instructor', 'duration', 'description', 'details'];

  ngOnInit(): void {
    this.dataService.getCourses().subscribe(data => {
      this.courses = data.courses;
    });
  }
}
