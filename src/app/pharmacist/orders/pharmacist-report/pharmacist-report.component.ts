import { Component, OnInit } from '@angular/core';
import { PharmaciesService } from '../../../services/pharmacies/pharmacies.service';
import { MessagingService } from '../../../services/messaging.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pharmacist-report',
  templateUrl: './pharmacist-report.component.html',
  styleUrls: ['./pharmacist-report.component.less'],
})
export class PharmacistReportComponent implements OnInit {
  fromDate: string;
  toDate: string;

  constructor(
    private pharmaciesService: PharmaciesService,
    private dialogRef: MatDialogRef<PharmacistReportComponent>,
    private messagingService: MessagingService
  ) {}

  ngOnInit(): void {}

  getReport() {
    const from = new Date(this.fromDate).toISOString().split('T')[0];
    const to = new Date(this.toDate).toISOString().split('T')[0];
    const generateReportRequest = {
      dateFrom: from,
      dateTo: to,
    };
    this.pharmaciesService.getReport2(generateReportRequest).subscribe(() => {
      this.messagingService.successMessage('Report was created!');
      this.dialogRef.close();
    });
  }
}
