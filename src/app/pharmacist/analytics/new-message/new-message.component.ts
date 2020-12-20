import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { MessagingService } from '../../../services/messaging.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.less'],
})
export class NewMessageComponent implements OnInit {
  topic: string;
  text: string;

  constructor(
    private backendService: BackendService,
    private messagingService: MessagingService,
    public dialogRef: MatDialogRef<NewMessageComponent>
  ) {}

  ngOnInit(): void {}

  submit(): void {
    const messageObject = {
      topic: this.topic,
      text: this.text,
    };
    this.backendService.sendMessage(messageObject).subscribe(() => {
      this.messagingService.successMessage('Message was sent!');
      this.dialogRef.close();
    });
  }
}
