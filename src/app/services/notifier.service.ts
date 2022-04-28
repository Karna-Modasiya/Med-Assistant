import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../notification/components/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  showNotification = (displayMessage: string, actionMessage: string) => {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        message: displayMessage,
        action: actionMessage
      },
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  constructor(private snackBar: MatSnackBar) { }
}