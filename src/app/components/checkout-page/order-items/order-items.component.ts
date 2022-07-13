import {Component, Input, OnInit} from '@angular/core';
import { Order } from "../../../shared/models/order";

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  @Input()
  order!: Order;

  constructor() { }

  ngOnInit(): void {
  }

}
