import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from '../../../services/orders/orders.service';
import { MessagingService } from '../../../services/messaging.service';
@Component({
  selector: 'app-delay-order',
  templateUrl: './delay-order.component.html',
  styleUrls: ['./delay-order.component.less'],
})
export class DelayOrderComponent implements OnInit {
  days: number = 1;

  constructor(
    private ordersService: OrdersService,
    private dialogRef: MatDialogRef<DelayOrderComponent>,
    private messagingService: MessagingService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {}

  delayOrder(): void {
    this.ordersService.delayOrder(this.data, this.days).subscribe(() => {
      this.messagingService.successMessage(
        `Order was delayed by ${this.days} days`
      );
      this.dialogRef.close();
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
