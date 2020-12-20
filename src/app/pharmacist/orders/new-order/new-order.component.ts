import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BackendService } from '../../../services/backend.service';
import { MessagingService } from '../../../services/messaging.service';
import { OrdersService } from '../../../services/orders/orders.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.less'],
})
export class NewOrderComponent implements OnInit {
  availableProviders: any;
  selectedProvider: number = 0;

  providerProducts: any;
  selectedProducts: any;

  stockDTO: any;

  constructor(
    private backendService: BackendService,
    private messagingService: MessagingService,
    private ordersService: OrdersService,
    public dialogRef: MatDialogRef<NewOrderComponent>
  ) {}

  ngOnInit(): void {
    this.getProviders();
  }

  getProviders(): void {
    this.backendService
      .getDataList('Warehouse')
      .subscribe((response) => (this.availableProviders = [...response.data]));
  }

  getProviderProducts(): void {
    this.backendService
      .getDataList(`Warehouse/${this.selectedProvider}/products`)
      .subscribe((response) => (this.providerProducts = [...response.data]));
  }

  addProductMock(): void {
    this.stockDTO = [];
    this.selectedProducts.forEach((item) => {
      this.stockDTO.push({ productBalanceId: item, quantity: 0 });
    });
  }

  getProductNameById(id) {
    return this.providerProducts.filter((item) => item.id == id)[0].name;
  }

  add(): void {
    this.ordersService
      .addOrder(this.selectedProvider, this.stockDTO)
      .subscribe(() => {
        this.messagingService.successMessage('Order was added successfuly!');
        this.dialogRef.close();
      });
  }
}
