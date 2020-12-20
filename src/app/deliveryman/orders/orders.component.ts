import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { OrderComponent2 } from './order/order.component';
import { MatDialog } from '@angular/material/dialog';
import { DelayOrderComponent } from './delay-order/delay-order.component';
import { Status2Component } from './status2/status2.component';
import { MessagingService } from '../../services/messaging.service';
import { OrdersService } from '../../services/orders/orders.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less'],
})
export class DeliveryManOrdersComponent implements OnInit {
  orders: any;
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
    private ordersService: OrdersService,
    private messagingService: MessagingService,
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

  delayOrder(orderId): void {
    const dialogRef = this.dialog.open(DelayOrderComponent, {
      data: orderId,
    });

    dialogRef.afterClosed().subscribe(() => this.getOrders());
  }

  cancelOrder(orderId): void {
    const status = {
      orderID: orderId,
      status: 6,
    };
    this.messagingService
      .confirmDialog('Are you sure you want to cancel this order?')
      .then((isConfirmed) => {
        if (isConfirmed)
          this.ordersService.changeOrderStatus(status).subscribe(() => {
            this.getOrders();
            this.messagingService.successMessage('Order was canceled');
          });
      });
  }

  changeStatus(id: any): void {
    const dialogRef = this.dialog.open(Status2Component, {
      data: id,
    });

    dialogRef.afterClosed().subscribe(() => this.getOrders());
  }

  getOrderInformation(orderId): void {
    this.dialog.open(OrderComponent2, {
      data: orderId,
    });
  }
}
