import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { User } from "./user.model";
import { environment } from "src/environments/environment";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // userSubject = new BehaviorSubject<User>(null);

  private tokenExpireTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  // signup(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
  //         environment.firebaseAPIKey,
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((resData) => {
  //         this.handleAuthentication(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn
  //         );
  //       })
  //     );
  // }

  // login(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
  //         environment.firebaseAPIKey,
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((resData) => {
  //         this.handleAuthentication(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn
  //         );
  //       })
  //     );
  // }

  // autoLogin() {
  //   const userData: {
  //     email: string;
  //     id: string;
  //     _token: string;
  //     _tokenExpirationDate: string;
  //   } = JSON.parse(localStorage.getItem("userData"));
  //   if (!userData) {
  //     return;
  //   }

  //   const loadedUser = new User(
  //     userData.email,
  //     userData.id,
  //     userData._token,
  //     new Date(userData._tokenExpirationDate)
  //   );

  //   if (loadedUser.token) {
  //     // this.userSubject.next(loadedUser);
  //     this.store.dispatch(
  //       new AuthActions.AuthenticateSuccess({
  //         email: loadedUser.email,
  //         userId: loadedUser.id,
  //         token: loadedUser.token,
  //         expirationDate: new Date(userData._tokenExpirationDate),
  //       })
  //     );
  //     const expirationDuration =
  //       new Date(userData._tokenExpirationDate).getTime() -
  //       new Date().getTime();
  //     this.autoLogout(expirationDuration);
  //   }
  // }

  // logout() {
  //   // this.userSubject.next(null);
  //   this.store.dispatch(new AuthActions.Logout());
  //   // this.router.navigate(["/auth"]);
  //   localStorage.removeItem("userData");

  //   if (this.tokenExpireTimer) {
  //     clearTimeout(this.tokenExpireTimer);
  //   }

  //   this.tokenExpireTimer = null;
  // }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpireTimer = setTimeout(() => {
      // this.logout();
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if(this.tokenExpireTimer) {
      clearTimeout(this.tokenExpireTimer);
      this.tokenExpireTimer = null;
    }
  }

  // private handleAuthentication(
  //   email: string,
  //   userId: string,
  //   token: string,
  //   expiresIn: number
  // ) {
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new User(email, userId, token, expirationDate);

  //   // this.userSubject.next(user);
  //   this.store.dispatch(
  //     new AuthActions.AuthenticateSuccess({
  //       email: email,
  //       userId: userId,
  //       token: token,
  //       expirationDate: expirationDate
  //     })
  //   );
  //   this.autoLogout(expiresIn * 1000);
  //   localStorage.setItem("userData", JSON.stringify(user));
  // }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMessage = "An unknown error occured";

  //   if (!errorRes.error && !errorRes.error.error) {
  //     return throwError(errorMessage);
  //   }

  //   switch (errorRes.error.error.message) {
  //     case "EMAIL_EXISTS":
  //       errorMessage =
  //         "The email address is already in use by another account.";
  //       break;
  //     case "EMAIL_NOT_FOUND":
  //       errorMessage =
  //         "There is no user record corresponding to this identifier. The user may have been deleted.";
  //       break;
  //     case "INVALID_PASSWORD":
  //       errorMessage =
  //         "The password is invalid or the user does not have a password.";
  //       break;
  //     case "USER_DISABLED":
  //       errorMessage =
  //         "The user account has been disabled by an administrator.";
  //       break;
  //   }
  //   return throwError(errorMessage);
  // }
}
