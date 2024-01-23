import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService, authReponseData } from '../../services/auth-service.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {


  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = "";

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  loginSignup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(60)])
  })

  constructor(private authService: AuthServiceService, private router:Router) { }

  ngOnInit(): void {
  }


  onSubmit() {
    if (!this.loginSignup.valid) {
      return
    }
    console.log(this.loginSignup.value);
    const email = this.loginSignup.value.email;
    const password = this.loginSignup.value.password;

    let authObservable: Observable<authReponseData>;

    this.isLoading = !this.isLoading;
    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    }
    else {
      authObservable = this.authService.signUp(email, password)
    }

    authObservable.subscribe((res) => {
      console.log(res);
      this.isLoading = false;
      this.router.navigate(['/browse'])
    },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      })

    this.loginSignup.reset();
  }

  get email() {
    return this.loginSignup.get('email')
  }

  get password() {
    return this.loginSignup.get('password')
  }



}
