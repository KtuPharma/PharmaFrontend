import { Component, OnInit } from '@angular/core';
import { Pharmacy } from 'src/app/interfaces/pharmacy';
import { BackendService } from 'src/app/services/backend.service';
import { PharmaciesService } from 'src/app/services/pharmacies/pharmacies.service';

@Component({
  selector: 'app-pharmacies',
  templateUrl: './pharmacies.component.html',
  styleUrls: ['./pharmacies.component.less']
})
export class AdminPharmaciesComponent implements OnInit {

  pharmacies: Pharmacy[];

  displayedColumns: string[] = [
    'id',
    'address',
    'city',
    'actions'
  ]

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.getPharmacies();
  }

  getPharmacies(): void {
    this.backendService
    .getDataList("Pharmacies")
    .subscribe((response) => (this.pharmacies = [...response.data]));
  }
}
