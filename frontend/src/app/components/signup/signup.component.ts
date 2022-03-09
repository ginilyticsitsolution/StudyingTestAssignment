import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})

export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  errors: any = null;

  constructor(public router: Router, public fb: FormBuilder, public authService: AuthService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
      role:['user', [Validators.required]],
    });
  }

  ngOnInit() {}

  get f(){
    return this.registerForm.controls;
  }

  onSubmit() {
      this.authService.register(this.registerForm.value).subscribe(
        (result) => {
          console.log(result);
        },
        (error) => {
          this.errors = error.error;
        },
        () => {
          this.registerForm.reset();
          this.router.navigate(['/login']);
        }
      );
  }
}
