import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// User interface
export class User {
  name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String;
  role!:String;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // User registration
  register(user: User): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/auth/register', user);
  }

  // Login
  signin(form: any): Observable<any>{
    let url = 'http://127.0.0.1:8000/api/auth/login';
    let headers = {'accept': '*/*', 'Content-Type':'application/json'};
    let opts:any = {headers:headers};
    return this.http.post(url, form);
  }

  fatchCourses(): Observable<any>{
    let url = 'http://127.0.0.1:8000/api/auth/course';
    return this.http.get(url);
  }

  fatchCourseVideos(courseId: any): Observable<any>{
    let url = 'http://127.0.0.1:8000/api/auth/video/' + courseId;
    return this.http.get(url);
  }

  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/auth/user-profile');
  }
}
