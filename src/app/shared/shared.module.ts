import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MaterialModule } from '../material/material.module';
import { SharedService } from './shared.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ProductFilterPipe } from './pipes/product-filter.pipe';
@NgModule({
  declarations: [
    FileUploadComponent,
    ConfirmationComponent,
    ProductFilterPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [FileUploadComponent,ProductFilterPipe],
  providers: [SharedService]
})
export class SharedModule { }
