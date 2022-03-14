import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MaterialModule } from '../material/material.module';
import { SharedService } from './services/shared.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
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
