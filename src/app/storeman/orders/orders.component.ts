import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Order3Component } from './order3/order3.component';
import { MatDialog } from '@angular/material/dialog';
import { Status2Component } from '../../deliveryman/orders/status2/status2.component';
import { MessagingService } from '../../services/messaging.service';
import { OrdersService } from '../../services/orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less'],
})
export class StoremanOrdersComponent implements OnInit {
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
    private messagingService: MessagingService,
    private ordersService: OrdersService,
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
    this.dialog.open(Order3Component, {
      data: orderId,
    });
  }

  changeStatus(id) {
    const dialogRef = this.dialog.open(Status2Component, {
      data: id,
    });

    dialogRef.afterClosed().subscribe(() => this.getOrders());
  }

  cancelOrder(orderId) {
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
}
