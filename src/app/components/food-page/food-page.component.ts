import { Component, OnInit } from '@angular/core';
import { FoodService } from "../../services/food.service";
import { Food } from "../../shared/models/food";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../services/cart.service";

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
  ) {
    activatedRoute.params.subscribe((param) => {
      if(param.id)
        foodService.getFoodById(param.id).subscribe(serverFood => {
          this.food = serverFood;
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
