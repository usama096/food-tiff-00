import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeListsComponent } from './code-lists.component';
import { CodeListsRoutingModule } from './code-lists-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditCodeListComponent } from './components/editCodeList/editCodeList.component';
import { EditCodeListItemComponent } from './components/editCodeListItem/editCodeListItem.component';
import { ViewCodeListsComponent } from './components/view-codeLists/view-codeLists.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    CodeListsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    CodeListsComponent,
    EditCodeListComponent,
    EditCodeListItemComponent,
    ViewCodeListsComponent
  ]
})
export class CodeListsModule { }
