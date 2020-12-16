import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from '../../../services/orders/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less'],
})
export class OrderComponent implements OnInit {
  orderInformation: any;
  displayedColumns: string[] = ['name', 'expiration', 'provider', 'price'];

  constructor(
    private ordersService: OrdersService,
    private dialogRef: MatDialogRef<OrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    this.getOrderInfo();
  }

  getOrderInfo() {
    this.ordersService
      .getOrderInformation(this.data)
      .subscribe((response) => (this.orderInformation = { ...response.data }));
  }

  close() {
    this.dialogRef.close();
  }
}
