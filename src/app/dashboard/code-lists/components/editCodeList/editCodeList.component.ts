import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Codelist } from 'src/app/shared/models/codelists-model';
import { CodeListService } from '../../services/codeList.service';

@Component({
  selector: 'app-editCodeList',
  templateUrl: './editCodeList.component.html',
  styleUrls: ['./editCodeList.component.scss']
})
export class EditCodeListComponent implements OnInit {

  title = 'Add Code List'
  editCodeList!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Codelist,
    private matDialogRef: MatDialogRef<EditCodeListComponent>,
    private fb: FormBuilder,
    private codeListService: CodeListService,
    private toaster: ToastrService
  ) {

    this.editCodeList = this.fb.group({
      name: [],
      description: [],
      isActive: [true],
    })

  }

  ngOnInit(): void {
  }

  updateCodeList(){
    this.codeListService.addCodeList(this.editCodeList.value).subscribe(res =>{
      if(res)
      this.toaster.success('Code List Addedd Successfully','Success')
      this.matDialogRef.close(true);
    })
  }

}
