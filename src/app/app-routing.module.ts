import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { FoodPageComponent } from "./components/food-page/food-page.component";
import { CartPageComponent } from "./components/cart-page/cart-page.component";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { RegisterPageComponent } from "./components/register-page/register-page.component";
import { AdminPageComponent } from "./components/admin-page/admin-page.component";
import { NotFoundPageComponent } from "./components/not-found-page/not-found-page.component";
import { AuthGuard } from "./auth.guard";
import { CheckoutPageComponent } from "./components/checkout-page/checkout-page.component";

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'food/:id', component: FoodPageComponent},
  {path:'cart-page', component: CartPageComponent},
  {path:'login', component: LoginPageComponent},
  {path:'register', component: RegisterPageComponent},
  {path:'admin', component: AdminPageComponent, canActivate: [AuthGuard]},
  {path:'checkout', component: CheckoutPageComponent},
  {path:'**', component: NotFoundPageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
