import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.less'],
})
export class PharmacistStockComponent implements OnInit {
  stockList: any;
  displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'inSale'];

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.getStockList();
  }

  getStockList(): void {
    this.backendService
      .getDataList('products')
      .subscribe((response) => (this.stockList = [...response.data]));
  }
}
