import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/interfaces/supplier';
import { SupplierService } from 'src/app/services/suppliers/suppliers.service';
import { BackendService } from 'src/app/services/backend.service';
import { MatDialog } from '@angular/material/dialog';
import { NewSupplierComponent } from './new-supplier/new-supplier.component';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.less'],
})
export class AdminSuppliersComponent implements OnInit {
  suppliers: Supplier[];
  error: any[];

  displayedColumns: string[] = ['id', 'name', 'country', 'actions'];
  constructor(
    private backendService: BackendService,
    private suppliersService: SupplierService,
    private messagingService: MessagingService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getSuppliers();
  }

  submit(id: number): void {
    this.suppliersService.changeProviderStatus(id).subscribe(() => {
      this.messagingService.successMessage('Supplier was removed!');
      this.getSuppliers();
    });
  }

  getSuppliers(): void {
    this.backendService
      .getDataList('Providers')
      .subscribe((response) => (this.suppliers = [...response.data]));
  }

  newSupplier(): void {
    const dialogRef = this.dialog.open(NewSupplierComponent);
  }
}
