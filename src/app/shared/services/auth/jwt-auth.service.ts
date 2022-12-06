import {Injectable, OnInit} from "@angular/core";
import {LocalStoreService} from "../local-store.service";
import {HttpClient} from "@angular/common/http";
import {Router, ActivatedRoute} from "@angular/router";
import {map, catchError, delay} from "rxjs/operators";
import {of, BehaviorSubject, throwError, Observable} from "rxjs";
import {environment} from "environments/environment";
import {User} from '../../models/user';
import {Member} from "../../models/member";

// // ================= only for demo purpose ===========
// const DEMO_TOKEN =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjhkNDc4MDc4NmM3MjE3MjBkYzU1NzMiLCJlbWFpbCI6InJhZmkuYm9ncmFAZ21haWwuY29tIiwicm9sZSI6IlNBIiwiYWN0aXZlIjp0cnVlLCJpYXQiOjE1ODc3MTc2NTgsImV4cCI6MTU4ODMyMjQ1OH0.dXw0ySun5ex98dOzTEk0lkmXJvxg3Qgz4ed";
//
// const DEMO_USER: User = {
//     id: "5b700c45639d2c0c54b354ba",
//     displayName: "Watson Joyce",
//     role: "SA",
// };

// ================= you will get those data from server =======

@Injectable({
    providedIn: "root",
})
export class JwtAuthService{
    token;
    isAuthenticated: Boolean;
    user: {} = {};
    user$ = (new BehaviorSubject<User>(<User>this.user));
    return: string;
    JWT_TOKEN;
    APP_USER = "RESEARCH LABORATORY";
    signingIn: Boolean;
    constructor(
        private ls: LocalStoreService,
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.route.queryParams
            .subscribe(params => this.return = params['return'] || '/');
    }
    public signin(email: string, password: string) : Observable<any> {
        return this.http.post(`${environment.apiURL}/auth/signin`, {email, password});
    }
    public signup(email: string, password: string) {
        return this.http.post(`${environment.apiURL}/auth/signup`, {email, password});
    }

    /*
      checkTokenIsValid is called inside constructor of
      shared/components/layouts/admin-layout/admin-layout.component.ts
    */

    public checkTokenIsValid() {
        return of(this.user)
            .pipe(
                map((profile: User) => {
                    this.setUserAndToken(this.getJwtToken(), profile, true);
                    this.signingIn = false;
                    return profile;
                }),
                catchError((error) => {
                    return of(error);
                })
            );
    }

    public signout() {
        this.setUserAndToken(null, null, false);
        this.router.navigateByUrl("sessions/signin3");
    }

    // tslint:disable-next-line:ban-types
    isLoggedIn(): Boolean {
        return !!this.getJwtToken();
    }
    // isAdmin(): boolean {
    //     return !!this.user.role.includes('admin');
    // }
    //
    // isUser(): boolean {
    //     return !!this.user.role.includes('user');
    // }

    getJwtToken() {
        return this.ls.getItem(this.JWT_TOKEN);
    }

    getUser() {
        return this.ls.getItem(this.APP_USER);
    }

    // tslint:disable-next-line:ban-types
    setUserAndToken(token: String, user: User, isAuthenticated: Boolean) {
        this.isAuthenticated = isAuthenticated;
        this.token = token;
        this.user = user;
        this.user$.next(user);
        this.ls.setItem(this.JWT_TOKEN, token);
        this.ls.setItem(this.APP_USER, user);
    }


}
