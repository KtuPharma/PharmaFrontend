import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { MatDialog } from '@angular/material/dialog';
import { NewMessageComponent } from './new-message/new-message.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.less'],
})
export class PharmacistAnalyticsComponent implements OnInit {
  role: string;
  messageList: any;
  displayedColumns: string[] = ['author', 'date', 'text', 'topic'];

  constructor(
    private auth: AuthService,
    private backendService: BackendService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.role = this.auth.getUserInfo().role;
    this.getMessageList();
  }

  getMessageList(): void {
    this.backendService
      .getDataList('Messages')
      .subscribe((response) => (this.messageList = [...response.data]));
  }

  newMessage(): void {
    const dialogRef = this.dialog.open(NewMessageComponent);
    dialogRef.afterClosed().subscribe(() => this.getMessageList());
  }
}
