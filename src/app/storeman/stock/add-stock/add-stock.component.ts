import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendService } from '../../../services/backend.service';
import { MessagingService } from '../../../services/messaging.service';
import { SupplierService } from '../../../services/suppliers/suppliers.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.less'],
})
export class AddStockComponent implements OnInit {
  availableProviders: any;
  selectedProvider: number = 0;

  providerProducts: any;
  selectedProducts: any;

  stockDTO: any = [];

  constructor(
    private backendService: BackendService,
    private messagingService: MessagingService,
    private suppliersService: SupplierService,
    public dialogRef: MatDialogRef<AddStockComponent>
  ) {}

  ngOnInit(): void {
    this.getProviders();
  }

  getProviders(): void {
    this.backendService
      .getDataList('Providers')
      .subscribe((response) => (this.availableProviders = [...response.data]));
  }

  getProviderProducts(): void {
    this.backendService
      .getDataList(`Providers/${this.selectedProvider}/products`)
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
    this.suppliersService
      .addStock(this.selectedProvider, this.stockDTO)
      .subscribe(() => {
        this.messagingService.successMessage('Stock was added successfuly!');
        this.dialogRef.close();
      });
  }
}
