import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { MatDialog } from '@angular/material/dialog';
import { NewOrderComponent } from './new-order/new-order.component';

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
}
