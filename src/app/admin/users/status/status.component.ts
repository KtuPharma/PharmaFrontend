import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserStatus } from 'src/app/interfaces/userStatus';
import { StatusDTO } from 'src/app/interfaces/statusDTO';
import { BackendService } from 'src/app/services/backend.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.less']
})
export class StatusComponent implements OnInit {

  userStatus: UserStatus[];
  line:string = "–––";
  selectedStatus:number = 1;
  constructor(private backendService:BackendService, private usersService: UsersService,
     public dialogRef: MatDialogRef<StatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) {}

  ngOnInit(): void {
    this.getUserStatus();
  }

  getUserStatus(): void {
    this.backendService
      .getDataList("Status")
      .subscribe((response) => (this.userStatus = [...response.data]));
  }

  setUserStatus():void{
    
    let status: StatusDTO = {"id":this.data, "status":this.selectedStatus.toString()}
  
    this.usersService.changeUsetStatus(status).subscribe();
  }
}
