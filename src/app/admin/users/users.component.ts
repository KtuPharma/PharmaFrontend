import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../interfaces/user';
import { BackendService } from 'src/app/services/backend.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'; 
import { ɵEmptyOutletComponent } from '@angular/router';
import { AdminOrdersComponent } from '../orders/orders.component';
import { StatusComponent } from './status/status.component';
import { UserStatus } from 'src/app/interfaces/userStatus';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class AdminUsersComponent implements OnInit {

  users: User[];
  displayedColumns: string[] = [
    'id',
    'personalcode',
    'username',
    'firstname',
    'lastname',
    'email',
    'department',
    'registerdate',
    'birthdate',
    'status',
    'workplace',
    'actions',
  ];
  constructor(private backendService:BackendService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.backendService
      .getDataList("Users")
      .subscribe((response) => (this.users = [...response.data]));
  }  

  onCreate(){
    this.dialog.open(AdminOrdersComponent);
  }

  openDialog(id:any): void {
    const dialogRef = this.dialog.open(StatusComponent, {
      data:id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getUsers();
      location.reload();
    });
  }
}
