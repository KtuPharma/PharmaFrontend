import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PharmaciesService } from 'src/app/services/pharmacies/pharmacies.service';

@Component({
  selector: 'app-pharmacies-report',
  templateUrl: './pharmacies-report.component.html',
  styleUrls: ['./pharmacies-report.component.less'],
})
export class PharmaciesReportComponent implements OnInit {
  fromDate: string;
  toDate: string;
  pharmacyReport: any;
  displayedColumns: string[] = ['name', 'expiration', 'provider', 'price'];

  constructor(
    private pharmaciesService: PharmaciesService,
    private dialogRef: MatDialogRef<PharmaciesReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {}

  getReport() {
    const from = new Date(this.fromDate).toISOString().split('T')[0];
    const to = new Date(this.toDate).toISOString().split('T')[0];
    const generateReportRequest = {
      pharmacyId: this.data,
      dateFrom: from,
      dateTo: to,
    };
    this.pharmaciesService
      .getReport(generateReportRequest)
      .subscribe((response) => (this.pharmacyReport = { ...response.data }));
  }
}
