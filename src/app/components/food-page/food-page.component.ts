import { Component, OnInit } from '@angular/core';
import { FoodService } from "../../services/food.service";
import { Food } from "../../shared/models/food";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {

  food!: Food;

  constructor(
    activatedRoute: ActivatedRoute,
    foodService: FoodService,
    private cartService: CartService,
    private router: Router,
    private auth: AuthService,
  ) {
    activatedRoute.params.subscribe((param) => {
      if(param.id)
        foodService.getFoodById(param.id).subscribe({
          next: (serverFood) => {
            this.food = serverFood;
          },
          error: (err) => {
            this.auth.loginWithRedirect();
          }
        });
    });
  }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addItemToCart(this.food);
    this.router.navigateByUrl('/cart-page')
  }
}
