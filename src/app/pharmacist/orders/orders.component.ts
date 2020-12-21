import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { MatDialog } from '@angular/material/dialog';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrderComponent } from '../../admin/orders/order/order.component';
import { OrdersService } from '../../services/orders/orders.service';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less'],
})
export class PharmacistOrdersComponent implements OnInit {
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

  createNewOrder(): void {
    const dialogRef = this.dialog.open(NewOrderComponent);
    dialogRef.afterClosed().subscribe(() => this.getOrders());
  }

  getOrderInformation(id) {
    this.dialog.open(OrderComponent, {
      data: id,
    });
  }

  cancelOrder(id) {
    this.messagingService
      .confirmDialog('Are you sure you want to cancel this order?')
      .then((isConfirmed) => {
        if (isConfirmed)
          this.ordersService.cancelOrder(id).subscribe(() => {
            this.getOrders();
            this.messagingService.successMessage('Order was canceled');
          });
      });
  }
}
