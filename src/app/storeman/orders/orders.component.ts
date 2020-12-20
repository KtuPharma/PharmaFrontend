import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

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

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.backendService
      .getDataList('Orders')
      .subscribe((response) => (this.orders = [...response.data]));
  }
}
