import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import {UserRegister} from "../../shared/interfaces/UserRegister";
import {Subscription} from "rxjs";
import {User} from "../../shared/models/user";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm! : FormGroup;

  isSubmit = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matSnack: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: [
          '',
          [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, Validators.minLength(2)]]
      });
  }

  // onSubmit(){
  //   this.isSubmit = true;
  //   if(this.loginForm.controls.invalid)
  //     return;
  //
  //   this.userService.login({
  //     email: this.loginForm.controls.email.value,
  //     password: this.loginForm.controls.password.value,
  //   }).subscribe((res) => {
  //     this.router.navigateByUrl('/');
  //     this.matSnack.open('Successful login!', '',{
  //       duration: 3000,
  //       verticalPosition: "top",
  //       horizontalPosition: "end",
  //     });
  //   });
  // }

  onSubmit(){
    this.isSubmit = true;
    if(this.loginForm.controls.invalid)
      return;

    this.userService.login({
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    })
      .subscribe({
        next: (res) =>{
          this.router.navigateByUrl('/');
        },
      })
  }
}
