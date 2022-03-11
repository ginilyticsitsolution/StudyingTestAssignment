import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
    let url = environment.baseUrl +'auth/register';
    return this.http.post( url, user);
  }

  // Login
  signin(form: any): Observable<any>{
    let url = environment.baseUrl + 'auth/login';
    let headers = {'accept': '*/*', 'Content-Type':'application/json'};
    let opts:any = {headers:headers};
    return this.http.post(url, form);
  }

  fatchCourses(): Observable<any>{
    let url = environment.baseUrl + 'auth/course';
    return this.http.get(url);
  }

  fatchCourseVideos(courseId: any): Observable<any>{
    let url = environment.baseUrl + 'auth/video/' + courseId;
    return this.http.get(url);
  }

  // Access user profile
  profileUser(): Observable<any> {
    let url = environment.baseUrl + 'auth/user-profile';
    return this.http.get(url);
  }
}
