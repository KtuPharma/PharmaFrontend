import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { MessagingService } from '../../services/messaging.service';
import { SupplierService } from '../../services/suppliers/suppliers.service';
import { AddStockComponent } from './add-stock/add-stock.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.less'],
})
export class StoremanStockComponent implements OnInit {
  stockList: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'quantity',
    'inSale',
    'actions',
  ];

  constructor(
    private backendService: BackendService,
    private messagingService: MessagingService,
    private suppliersService: SupplierService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getStockList();
  }

  addStock(): void {
    const dialogRef = this.dialog.open(AddStockComponent);
    dialogRef.afterClosed().subscribe(() => this.getStockList());
  }

  getStockList(): void {
    this.backendService
      .getDataList('products')
      .subscribe((response) => (this.stockList = [...response.data]));
  }

  changeStockItemStatus(id: string): void {
    this.messagingService
      .confirmDialog('Are you sure you want to change status of this order?')
      .then((isConfirmed) => {
        if (isConfirmed)
          this.suppliersService.changeProductStatus(id).subscribe(() => {
            this.getStockList();
            this.messagingService.successMessage('Status was changed');
          });
      });
  }
}
