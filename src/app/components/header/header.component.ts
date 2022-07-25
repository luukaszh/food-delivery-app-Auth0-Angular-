import {Component, Inject, OnInit} from '@angular/core';
import { UserService } from "../../services/user.service";
import { User } from "../../shared/models/user";
import { AuthService } from "@auth0/auth0-angular";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user!: User;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private userService: UserService,
    public auth: AuthService,
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }

  ngOnInit(): void {
  }

  loginWithAuth0(): void {
    this.auth.loginWithRedirect();
  }

  logoutWithAuth0(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
}
