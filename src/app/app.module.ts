import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RatingModule } from "ng-starrating";
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FoodPageComponent } from './components/food-page/food-page.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { MatCardModule } from "@angular/material/card";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { MatSelectModule } from "@angular/material/select";
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { AuthGuard } from "./auth.guard";
import { AuthInterceptor } from "./auth.interceptor";
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { OrderItemsComponent } from './components/checkout-page/order-items/order-items.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { AuthModule, AuthHttpInterceptor } from "@auth0/auth0-angular";
import { environment as env } from '../environments/environment'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    FoodPageComponent,
    CartPageComponent,
    AdminPageComponent,
    NotFoundPageComponent,
    CheckoutPageComponent,
    OrderItemsComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
        RatingModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatSnackBarModule,
        AuthModule.forRoot({
          ...env.auth,
          httpInterceptor: {
            allowedList: [
              `http://localhost:3300/api/messages/protected-message`,
              `http://localhost:3300/food`,
              `http://localhost:3300/food/1`,
              `http://localhost:3300/food/2`,
              `http://localhost:3300/food/3`,
              `http://localhost:3300/food/4`,
              `http://localhost:3300/food/5`,
              `http://localhost:3300/food/6`,
              `http://localhost:3300/food/7`,
              `http://localhost:3300/food/8`,]
          },
        }),
    ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
