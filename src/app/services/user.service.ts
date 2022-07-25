import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from "rxjs";
import { User } from "../shared/models/user";


@Injectable({
  providedIn: 'root'
})

export class UserService {

  message: any;

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());

  public userObservable: Observable<User>

  constructor(
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
