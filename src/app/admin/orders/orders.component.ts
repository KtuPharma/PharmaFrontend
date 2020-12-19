import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order';
import { BackendService } from '../../services/backend.service';
import { OrderComponent } from './order/order.component';
import { MatDialog } from '@angular/material/dialog';

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
    'actions',
  ];

  constructor(
    private backendService: BackendService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.backendService
      .getDataList('Orders')
      .subscribe((response) => (this.orders = [...response.data]));
  }

  getOrderInformation(orderId): void {
    const dialogRef = this.dialog.open(OrderComponent, {
      data: orderId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
