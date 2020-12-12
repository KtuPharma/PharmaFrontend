import { Component, Input, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders/orders.service';
import { Order } from '../../interfaces/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less'],
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[];
  displayedColumns: string[] = [
    'orderTime',
    'deliveryTime',
    'senderAddress',
    'receiverAddress',
    'status',
    'price',
    'actions'
  ];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.ordersService
      .getOrders()
      .subscribe((response) => (this.orders = [...response.data]));
  }
}
