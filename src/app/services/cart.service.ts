import { Injectable } from '@angular/core';
import {CartItem} from "../shared/models/cartItem";
import {Cart} from "../shared/models/cart";
import {Food} from "../shared/models/food";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart = this.getFromStorage();

  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  addItemToCart(food: Food): void{
    this.cart.items.push(new CartItem(food))
    this.setToCartStorage()
  }

  removeItemFromCart(foodId: string): void{
    this.cart.items = this.cart.items.filter(item => item.food.id !== foodId);
    this.setToCartStorage()
  }

  changeCartQuantity(foodId: string, quantity: number){
    let cartItem = this.cart.items.find(item => item.food.id === foodId)
    if(!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setToCartStorage()
  }

  clearCart(){
    this.cart = new Cart();
    this.setToCartStorage()
  }

  getCartObservable(): Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setToCartStorage(): void{
    this.cart.totalPrice = this.cart.items.reduce((sum, item) => sum + item.price, 0)

    localStorage.setItem('Cart', JSON.stringify(this.cart))

    this.cartSubject.next(this.cart);
  }

  private getFromStorage(): Cart{
    const cartJSON = localStorage.getItem('Cart');
    return cartJSON? JSON.parse(cartJSON): new Cart();
  }
}
