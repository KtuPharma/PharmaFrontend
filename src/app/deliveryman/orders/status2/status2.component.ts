import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendService } from '../../../services/backend.service';
import { OrdersService } from '../../../services/orders/orders.service';
import { MessagingService } from '../../../services/messaging.service';

@Component({
  selector: 'app-status2',
  templateUrl: './status2.component.html',
  styleUrls: ['./status2.component.less'],
})
export class Status2Component implements OnInit {
  orderStatus: any;
  selectedStatus: number = 1;

  constructor(
    private backendService: BackendService,
    private messagingService: MessagingService,
    private orderService: OrdersService,
    public dialogRef: MatDialogRef<Status2Component>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  ngOnInit(): void {
    this.getOrderStatus();
  }

  getOrderStatus(): void {
    this.backendService.getDataList('Status/order').subscribe((response) => {
      this.orderStatus = [...response.data];
      this.orderStatus = this.orderStatus.filter(
        (status) => status.name != 'Canceled'
      );
    });
  }

  setOrderStatus(): void {
    const status = {
      orderID: this.data,
      status: this.selectedStatus,
    };

    this.orderService.changeOrderStatus(status).subscribe(() => {
      this.messagingService.successMessage(
        'Order status was changed successfully'
      );
      this.dialogRef.close();
    });
  }
}
