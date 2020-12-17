import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { BackendService } from 'src/app/services/backend.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminOrdersComponent } from '../orders/orders.component';
import { StatusComponent } from './status/status.component';
import { NewUserComponent } from './new-user/new-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
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
    'status',
    'workplace',
    'actions',
  ];
  constructor(
    private backendService: BackendService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.backendService
      .getDataList('Users')
      .subscribe((response) => (this.users = [...response.data]));
  }

  onCreate() {
    this.dialog.open(NewUserComponent);
  }

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(StatusComponent, {
      data: id,
    });

    dialogRef.afterClosed().subscribe(() => location.reload());
  }
}
