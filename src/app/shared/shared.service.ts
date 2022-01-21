import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private dialog: MatDialog) { }

  confirmItem(data: any) {
    return this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data: { data},
      disableClose: true,
      hasBackdrop: true,
    })
  }
}
