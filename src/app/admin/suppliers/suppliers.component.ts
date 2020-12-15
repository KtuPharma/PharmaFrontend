import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/interfaces/supplier';
import { SupplierService } from 'src/app/services/suppliers/suppliers.service';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.less']
})
export class AdminSuppliersComponent implements OnInit {

  suppliers : Supplier[];
  error : any[];

  displayedColumns: string[] = [
    'id',
    'name',
    'country',
    'actions'
  ];
  constructor(private backendService: BackendService, private suppliersService: SupplierService, private router: Router,) {}

  ngOnInit(): void {
    this.getSuppliers();
  }

  submit(id:number): void{
    this.suppliersService
    .changeProviderStatus(id)
    .subscribe(result => {this.getSuppliers()});
  }

  getSuppliers(): void {
    this.backendService
      .getDataList("Providers")
      .subscribe((response) => (this.suppliers = [...response.data]));
  }

}
