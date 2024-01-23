import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';

import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from '../components/auth/user.model';
import { Router } from '@angular/router';

export interface authReponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  user = new BehaviorSubject<User | null>(null);
  tokenExpirationReference:any;


  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http.post<authReponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAnQFcf2qqIlBNog2tBldS5xdRhQiEEkgM",
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap((resData) => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      }))
  }

  login(email: string, password: string) {
    return this.http.post<authReponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAnQFcf2qqIlBNog2tBldS5xdRhQiEEkgM",
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap((resData) => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      }))
  }

  getCurrentActiveUser() {
    const userDataString = localStorage.getItem('userData');
    const userData: { email: string, localId: string, _token: string, _tokenExpirationDate: string } = userDataString ? JSON.parse(userDataString) : null;
    if(!userData) {
      return
    }

    const tokenExpirationDuration = new Date(userData._tokenExpirationDate)
    const loadedUser = new User(userData.email, userData.localId, userData._token, tokenExpirationDuration );

    if(loadedUser.token)
    {
      this.user.next(loadedUser)
      const expirationDuration = tokenExpirationDuration.getTime() - new Date().getTime();
      this.autoLogOut(expirationDuration);
    }
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationReference)
    {
      clearTimeout(this.tokenExpirationReference);
    }
    this.tokenExpirationReference = null;
  }

  autoLogOut(expirationDuration:number) {
    console.log(expirationDuration);
    this.tokenExpirationReference = setTimeout(()=>
    {
      this.logOut();
      
    }, expirationDuration)
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = "An error occured!";
    if (!err.error || !err.error.error) {
      return throwError(errorMessage);
    }
    switch (err.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email already exists";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "Sorry, we can't find an account with this email address. Please try again.";
        break;
      case "INVALID_LOGIN_CREDENTIALS":
        errorMessage = "Invalid email or password. Please check your credentials and try again. "
        break;
    }
    return throwError(errorMessage);
  }

  handleAuthentication(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number) {

    const expirationDate = new Date((new Date().getTime() + expiresIn * 1000))
    const user = new User(
      email,
      localId,
      idToken,
      expirationDate)
    console.log(user);
    this.user.next(user);
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    console.log(expiresIn * 1000);
  }
}
