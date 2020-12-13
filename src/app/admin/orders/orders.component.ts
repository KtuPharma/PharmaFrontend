import { Component, Input, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders/orders.service';
import { Order } from '../../interfaces/order';
import { BackendService } from 'src/app/services/backend.service';

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

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.backendService
      .getDataList("Orders")
      .subscribe((response) => (this.orders = [...response.data]));
  }
}
