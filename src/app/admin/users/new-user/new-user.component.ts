import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { UsersService } from 'src/app/services/users/users.service';
import { MessagingService } from '../../../services/messaging.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.less'],
})
export class NewUserComponent implements OnInit {
  roleOptions: any;
  workplaceOptions: any;

  name: string;
  lastName: string;
  birthDate: string;
  username: string;
  email: string;
  personalCode: number;
  password: string;
  role: number = 1;
  workPlace: number;

  constructor(
    private backendService: BackendService,
    private messagingService: MessagingService,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<NewUserComponent>
  ) {}

  ngOnInit(): void {
    this.getRoleOptions();
    this.getWorkplaceOptions();
  }

  submit(): void {
    const userObject = {
      personalCode: this.personalCode,
      firstName: this.name,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
      password: this.password,
      roleId: this.role,
      birthDate: this.birthDate,
      pharmacyWarehouseOrTruck: this.workPlace,
    };

    this.usersService.createUser(userObject).subscribe((result) => {
      this.messagingService.successMessage('User was added!');
      this.dialogRef.close();
    });
  }

  getRoleOptions(): void {
    this.backendService
      .getDataList('Status/role')
      .subscribe((response) => (this.roleOptions = [...response.data]));
  }

  getWorkplaceOptions(): void {
    let api: string;
    switch (this.role) {
      case 0:
        this.workPlace = null;
        return;
      case 1: //pharmacy
        api = 'Pharmacies/Addresses';
        break;
      case 2: //warehouse
        api = 'Warehouse/Addresses';
        break;
      case 3: //transportation
        api = 'Trucks';
        break;
      case 4: //admin
        this.workPlace = null;
        return;
    }

    this.backendService.getDataList(api).subscribe((response) => {
      this.workplaceOptions = [...response.data];
      this.workPlace = 1;
    });
  }
}
