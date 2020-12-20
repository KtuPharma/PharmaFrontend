import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pharmacy } from 'src/app/interfaces/pharmacy';
import { BackendService } from 'src/app/services/backend.service';
import { PharmaciesReportComponent } from './pharmacies-report/pharmacies-report.component';
import { FullReportComponent } from './full-report/full-report.component';

@Component({
  selector: 'app-pharmacies',
  templateUrl: './pharmacies.component.html',
  styleUrls: ['./pharmacies.component.less'],
})
export class AdminPharmaciesComponent implements OnInit {
  pharmacies: Pharmacy[];

  displayedColumns: string[] = ['id', 'address', 'city', 'actions'];

  constructor(
    private backendService: BackendService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPharmacies();
  }

  getPharmacies(): void {
    this.backendService
      .getDataList('Pharmacies')
      .subscribe((response) => (this.pharmacies = [...response.data]));
  }

  getOrderInformation(phamracyId): void {
    this.dialog.open(PharmaciesReportComponent, {
      data: phamracyId,
    });
  }

  getFullReport() {
    this.dialog.open(FullReportComponent);
  }
}
