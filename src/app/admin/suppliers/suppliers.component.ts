import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/interfaces/supplier';
import { SupplierService } from 'src/app/services/suppliers/suppliers.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.less']
})
export class AdminSuppliersComponent implements OnInit {

  suppliers : Supplier[];

  displayedColumns: string[] = [
    'id',
    'name',
    'country',
    'actions'
  ];
  constructor(private suppliersService: SupplierService) {}

  ngOnInit(): void {
    this.getSuppliers();
  }

  getSuppliers(): void {
    this.suppliersService
      .getSuppliers()
      .subscribe((response) => (this.suppliers = [...response.data]));
  }

}
