import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from "rxjs";
import { User } from "../shared/models/user";
import { UserLogin } from "../shared/interfaces/UserLogin";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { UserRegister } from "../shared/interfaces/UserRegister";


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());

  public userObservable: Observable<User>

  baseURL = 'http://localhost:3300'

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser():User{
    return this.userSubject.value;
  }

  login(userLogin: UserLogin): Observable<User>{
    return this.httpClient.post<User>(this.baseURL + '/users/login', userLogin).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStorage(user)
          this.userSubject.next(user);
        },
        error: (errorResponse) => {
          console.log(errorResponse.error, 'Failed Login');
        }
      })
    );
  }

  register(userRegister: UserRegister): Subscription{
    return this.httpClient.post<User>(this.baseURL + '/users/register', userRegister)
      .subscribe({
        next: (user) =>{
          this.userSubject.next(user);
          console.log('Successful Register!')
        },
        error: (error) => {
          console.log(error, 'Failed Register');
        }
      })
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem('User');
    this.router.navigateByUrl('/')
  }

  setUserToLocalStorage(user: User){
    localStorage.setItem('User', JSON.stringify(user));
    localStorage.setItem('token', (user.token));
  }

  getUserFromLocalStorage():User{
    const userJson = localStorage.getItem('User');
    if(userJson)
      return JSON.parse(userJson) as User;
    return new User();
  }

  isAdminLoggedIn(user: User){
    return user.isadmin;
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getVerifyUser(): Observable<any>{
    let httpHeaders = new HttpHeaders({
      'content-type': 'Authorization',
      'Authorization': `Bearer ${this.currentUser.token}`,
    });
    return this.httpClient.get(this.baseURL + '/users/verify', {headers: httpHeaders})
  }
}
