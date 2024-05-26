import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseListComponent } from './course-list/course-list.component';


@NgModule({
  declarations: [
    CourseDetailsComponent,
    CourseListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }
