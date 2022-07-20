import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from "rxjs";
import { User } from "../shared/models/user";
import { UserLogin } from "../shared/interfaces/UserLogin";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { UserRegister } from "../shared/interfaces/UserRegister";
import {MatSnackBar} from "@angular/material/snack-bar";


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
    private matSnack: MatSnackBar,
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
          this.matSnack.open(JSON.stringify(user.name), 'Successful login!',{
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "end",
          });
        },
        error: (err) => {
          this.matSnack.open(JSON.stringify(err.error), 'Login failed!',{
            duration: 5000,
            verticalPosition: "top",
            horizontalPosition: "end",
          });
        }
      })
    );
  }

  register(userRegister: UserRegister): Subscription{
    return this.httpClient.post<User>(this.baseURL + '/users/register', userRegister)
      .subscribe({
        next: (user) =>{
          this.userSubject.next(user);
          this.matSnack.open(JSON.stringify(user.name), 'Successful register!',{
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "end",
          });
        },
        error: (err) => {
          this.matSnack.open(JSON.stringify(err.error.text), 'Register failed!',{
            duration: 5000,
            verticalPosition: "top",
            horizontalPosition: "end",
          });
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
}
