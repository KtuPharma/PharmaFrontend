import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { MessagingService } from '../../services/messaging.service';
import { PharmaciesService } from '../../services/pharmacies/pharmacies.service';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.less'],
})
export class StoremanMedicineListComponent implements OnInit {
  medicineList: any;
  displayedColumns: string[] = [
    'name',
    'activeSubstance',
    'barCode',
    'recipeRequired',
    'isReimbursed',
    'country',
    'form',
    'inSale',
    'actions',
  ];

  constructor(
    private backendService: BackendService,
    private pharmaciesService: PharmaciesService,
    private messagingService: MessagingService
  ) {}

  ngOnInit(): void {
    this.getMedicineList();
  }

  getMedicineList(): void {
    this.backendService
      .getDataList('Medicaments')
      .subscribe((response) => (this.medicineList = [...response.data]));
  }

  changeMedicineStatus(id: string): void {
    this.messagingService
      .confirmDialog(
        'Are you sure you want to change status of this medicament?'
      )
      .then((isConfirmed) => {
        if (isConfirmed)
          this.pharmaciesService.changeMedicineStatus(id).subscribe(() => {
            this.getMedicineList();
            this.messagingService.successMessage('Status was changed');
          });
      });
  }
}
