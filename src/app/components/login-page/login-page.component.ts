import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";


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
