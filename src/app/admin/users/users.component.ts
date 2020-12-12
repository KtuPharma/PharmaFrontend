import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../interfaces/user';

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
  ];
  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService
      .getUsers()
      .subscribe((response) => (this.users = [...response.data]));
  }

}
