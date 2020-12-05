import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginMessage: string;
  loginError: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        ,
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'change',
        },
      ],
      password: [
        ,
        {
          validators: [Validators.required],
        },
      ],
    });
    if (this.auth.loggedIn()) this.router.navigate(['home']);
  }

  submit() {
    if (this.form.valid) {
      this.auth.loginUser(this.form.value).subscribe(
        (result) => {
          localStorage.setItem('token', result.token);
          this.router.navigate(['home']);
        },
        (err) => {
          this.loginError = err.error.details
            ? err.error.details
            : err.error.title
            ? err.error.title
            : 'Something bad happened, try again later';
        }
      );
    }
  }
}
