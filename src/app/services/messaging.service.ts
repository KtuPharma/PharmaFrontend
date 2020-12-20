import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  successMessage(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: ['green-snackbar'],
    });
  }

  async confirmDialog(message: string) {
    let isConfirmed;
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '250px',
      data: { message: message },
    });

    await dialogRef
      .afterClosed()
      .toPromise()
      .then((result) => {
        isConfirmed = result;
      });
    return isConfirmed;
  }
}
