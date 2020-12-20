import { Component, OnInit } from '@angular/core';
import { PharmaciesService } from '../../../services/pharmacies/pharmacies.service';

@Component({
  selector: 'app-full-report',
  templateUrl: './full-report.component.html',
  styleUrls: ['./full-report.component.less'],
})
export class FullReportComponent implements OnInit {
  fromDate: string;
  toDate: string;
  pharmacyReport: any;
  displayedColumns: string[] = ['name', 'expiration'];
  constructor(private pharmaciesService: PharmaciesService) {}

  ngOnInit(): void {}

  getFullReport() {
    const from = new Date(this.fromDate).toISOString().split('T')[0];
    const to = new Date(this.toDate).toISOString().split('T')[0];
    const generateReportRequest = {
      dateFrom: from,
      dateTo: to,
    };
    this.pharmaciesService
      .getFullReport(generateReportRequest)
      .subscribe((response) => (this.pharmacyReport = { ...response.data }));
  }
}
