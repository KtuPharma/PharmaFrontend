import { Component, OnInit } from '@angular/core';
import { Pharmacy } from 'src/app/interfaces/pharmacy';
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

  constructor(private pharmaciesService: PharmaciesService) { }

  ngOnInit(): void {
    this.getPharmacies();
  }

  getPharmacies(): void {
    this.pharmaciesService
    .getPharmacies()
    .subscribe((response) => (this.pharmacies = [...response.data]));
  }
}
