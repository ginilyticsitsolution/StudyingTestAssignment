import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  public courseId: any;
  
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.fatchCourse();
  }

  course: any;

  fatchCourse() {
    this.authService.fatchCourses().subscribe((courses: any) => {
      this.course = courses.courses;
    })
  }

  selectedCourse(course: any){
    this.courseId = course.id;
  }
}
