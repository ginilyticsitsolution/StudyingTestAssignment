import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})

export class SigninComponent implements OnInit {
  //loginForm: FormGroup;
  errors:any = null;

  constructor(
    public router: Router,
    //public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService
  ) {
    // this.loginForm = this.fb.group({
    //   email: [],
    //   password: [],
    // });
  }

  ngOnInit() {}

  // onSubmit() {
  //   this.authService.signin(this.loginForm.value).subscribe(
  //     (result) => {
  //       this.responseHandler(result);
  //     },
  //     (error) => {
  //       this.errors = error.error;
  //     },
  //     () => {
  //       this.authState.setAuthState(true);
  //       this.loginForm.reset();
  //       this.router.navigate(['profile']);
  //     }
  //   );
  // }

  // Handle response
  responseHandler(data:any) {
    this.token.handleData(data.access_token);
  }


  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  });
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    console.log(this.form.value);
    this.authService.signin(this.form.value).subscribe(
      (result) => {
        this.responseHandler(result);
        console.log(result);
      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.authState.setAuthState(true);
        this.form.reset();
        this.router.navigate(['/course']);
      }
    );
  }
}
