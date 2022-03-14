import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditCodeListComponent } from 'src/app/dashboard/code-lists/components/editCodeList/editCodeList.component';
import { EditCodeListItemComponent } from 'src/app/dashboard/code-lists/components/editCodeListItem/editCodeListItem.component';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';
import { Codelist, CodelistItem } from '../models/codelists-model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private dialog: MatDialog) { }

  confirmItem(data: any) {
    return this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data,
      disableClose: true,
      hasBackdrop: true,
    })
  }
  EditCodeListItem(data: CodelistItem) {
    return this.dialog.open(EditCodeListItemComponent, {
      width: '600px',
      data:  data,
      disableClose: true,
      hasBackdrop: true,
    })
  }

  EditCodeList(data: Codelist) {
    return this.dialog.open(EditCodeListComponent, {
      width: '600px',
      data:  data,
      disableClose: true,
      hasBackdrop: true,
    })
  }


}
