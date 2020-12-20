import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BackendService } from 'src/app/services/backend.service';
import { SupplierService } from 'src/app/services/suppliers/suppliers.service';
import { MessagingService } from '../../../services/messaging.service';

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.less'],
})
export class NewSupplierComponent implements OnInit {
  supplierName: string = '';
  supplierCountry: string = '';
  warehouses: any;
  medicaments: any;
  products: any = [];
  selectedWarehouse: number = 1;

  constructor(
    private dialogRef: MatDialogRef<NewSupplierComponent>,
    private messagingService: MessagingService,
    private backendService: BackendService,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.getWarehouseOptions();
    this.getMedicamentOptions();
  }

  add(): void {
    const supplierObject = {
      name: this.supplierName,
      country: this.supplierCountry,
      products: this.products,
      warehouse: [this.selectedWarehouse],
    };
    this.supplierService.createProvider(supplierObject).subscribe(() => {
      this.messagingService.successMessage('Supplier was added!');
      this.dialogRef.close();
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  getWarehouseOptions(): void {
    this.backendService
      .getDataList('Warehouse/Addresses')
      .subscribe((response) => (this.warehouses = [...response.data]));
  }

  getMedicamentOptions(): void {
    this.backendService
      .getDataList('Medicaments/Names')
      .subscribe((response) => (this.medicaments = [...response.data]));
  }

  addProduct(): void {
    const emptyMedicament = { expirationDate: '', price: '', medicament: '' };
    this.products.push(emptyMedicament);
  }
  deleteProduct(index: number): void {
    this.products.splice(index, 1);
  }
}
