import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {UserService} from "../../services/user.service";
import {Order} from "../../shared/models/order";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cart} from "../../shared/models/cart";

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  order: Order = new Order();

  cart!: Cart;

  checkoutForm!: FormGroup;

  isSubmit = false;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
      this.order.items = cart.items;
      this.order.totalprice = cart.totalPrice;
  });
  }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group(
      {
        name: [
          '',
          [Validators.required]
        ],
        address: [
          '',
          [Validators.required]],
      });
  }

  createOrder(){
    this.isSubmit = true;
    if (this.checkoutForm.invalid) {
      window.alert('Invalid inputs!')
      return;
    } else {
      this.order.name = this.checkoutForm.controls.name.value;
      this.order.address = this.checkoutForm.controls.address.value;

      console.log(this.order);
      this.cartService.postOrder(this.order);
    }
  }

}
