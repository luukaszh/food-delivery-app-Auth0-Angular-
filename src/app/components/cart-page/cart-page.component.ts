import { Component, OnInit } from '@angular/core';
import {Cart} from "../../shared/models/cart";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../shared/models/cartItem";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cart!: Cart;

  constructor(
    private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }

  ngOnInit(): void {
  }

  removeItemFromCart(cartItem: CartItem){
    this.cartService.removeItemFromCart(cartItem.food.id)
  }

  clearCart(){
    this.cartService.clearCart();
  }

  changeCartQuantity(cartItem: CartItem, quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeCartQuantity(cartItem.food.id, quantity);
  }
}
