import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";


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

  onSubmit(){
    this.isSubmit = true;
    console.log(this.loginForm.controls.password.value.length)
    if (this.loginForm.controls.password.value.length < 2) {
      this.matSnack.open('Login failed!', 'Minimum 2 characters', {
        duration: 3000,
        verticalPosition: "top",
        horizontalPosition: "end",
      });
      return;
    }

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
