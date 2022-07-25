import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from "rxjs";
import { User } from "../shared/models/user";
import { UserLogin } from "../shared/interfaces/UserLogin";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { UserRegister } from "../shared/interfaces/UserRegister";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment as env } from '../../environments/environment'

interface Message {
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  message: any;

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

  ngOnInit(): void {
  }

  public get currentUser():User{
    return this.userSubject.value;
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
