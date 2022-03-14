import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CodelistItem } from '../../models/codelists';
import { CodeListService } from '../../services/codeList.service';

@Component({
  selector: 'app-edit-lookup',
  templateUrl: './editCodeListItem.component.html',
  styleUrls: ['./editCodeListItem.component.scss']
})
export class EditCodeListItemComponent implements OnInit {

  title = 'Add Code List Item';
  edit = "ADD";
  editCodeList!: FormGroup;
  codeListName!:string;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: CodelistItem,
    private matDialogRef: MatDialogRef<EditCodeListItemComponent>,
    private fb: FormBuilder,
    private codeListService: CodeListService,
    private toaster: ToastrService,
  ) {
    this.codeListName = this.codeListService.codeListName$.getValue();
    this.editCodeList = this.fb.group({
      code: [],
      codeListName: [this.codeListName],
      description: [],
      isActive: [true],
      lang: [],
      sortOrder: [],
    })

  }

  ngOnInit(): void {
    if(this.data){
      this.editCodeList.get('code')?.setValue(this.data.code);
      this.editCodeList.get('codeListName')?.setValue(this.data.codeListName);
      this.editCodeList.get('description')?.setValue(this.data.description);
      this.editCodeList.get('isActive')?.setValue(this.data.isActive);
      this.editCodeList.get('sortOrder')?.setValue(this.data.sortOrder);
      this.editCodeList.get('lang')?.setValue(this.data.lang);
      this.title = "Update Code List Item";
      this.edit = "UPDATE"
    }

  }
  addorUpdateCodeListItem(){
    this.codeListService.addorUpdateCodeListItem(this.editCodeList.value).subscribe(res =>{
      if(res){
      this.toaster.success('Code List Item Added Successfully!','Success');
      this.matDialogRef.close(res);
      }
    })
  }

}
