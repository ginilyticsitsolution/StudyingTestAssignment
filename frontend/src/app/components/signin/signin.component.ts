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
  errors: any = null;

  constructor(public router: Router, public authService: AuthService, private token: TokenService,
    private authState: AuthStateService
  ) { }

  ngOnInit() {
    this.hideNavBar();
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  get f() {
    return this.form.controls;
  }


  submit() {
    this.authService.signin(this.form.value).subscribe(
      (result) => {
        if (result.access_token != undefined) {
          this.authState.setAuthState(true);
          localStorage.setItem('auth_token', result.access_token);
          this.form.reset();
          this.router.navigate(['/course']);

        }
        if (result.error != undefined) {
          this.errors = result.error;

        }
      }
    );
  }

  hideNavBar() {
    let token = localStorage.getItem('auth_token');

    if (token != undefined) {
      this.router.navigate(['/course']);
    }
  }
}
