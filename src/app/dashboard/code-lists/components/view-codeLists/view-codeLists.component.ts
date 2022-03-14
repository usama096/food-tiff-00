import { Codelist } from './../../../../shared/models/codelists-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CodelistItem } from '../../models/codelists';
import { CodeListService, } from '../../services/codeList.service';
import { ToastrService } from 'ngx-toastr';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-lookups',
  templateUrl: './view-codeLists.component.html',
  styleUrls: ['./view-codeLists.component.scss']
})
export class ViewCodeListsComponent implements OnInit {

  title = "Code Lists"
  @ViewChild(MatTable) table!: MatTable<CodelistItem>;

  imageWidth = 50;
  search = new FormControl;
  imageMargin = 2;
  errorMessage!: string;
  codeList!: Codelist[];
  addNewCodeList!: Codelist;
  codeListItem = new FormControl;
  displayedColumns: string[] = ['code', 'description', 'isActive', 'lang', 'sortOrder', 'action'];
  dataSource!: CodelistItem[];
  codeListItems!: CodelistItem;
  isActive!: boolean;


  constructor(
    private codeListService: CodeListService,
    private sharedService: SharedService,
    private toaster: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.codeListService.getCodeListItem('PLANTYPE').subscribe(res => {
      this.dataSource = res;
      this.dataSource.find(f => {
        this.codeListItem.setValue(f.codeListName)
        this.codeListService.codeListName$.next(f.codeListName)
      })
    });
    this.codeListService.getCodeLists().subscribe(res => {
      this.codeList = res;
    });
  }
  onCodeListChange(event: any) {
    this.codeListService.getCodeListItem(event.value).subscribe(res => {
      this.dataSource = res;
      this.codeListService.codeListName$.next(event.value) ;
    });
  }
  updateCodeListItem(m: CodelistItem, index: number) {
    let codeListItem = {
      code: m.code,
      codeListName: m.codeListName,
      description: m.description,
      lang: m.lang,
      isActive: m.isActive,
      sortOrder: m.sortOrder
    }
    this.sharedService.EditCodeListItem(codeListItem).afterClosed().subscribe(
      res => {
        if (res) {
          this.dataSource.splice(index, 1, res);
          this.table.renderRows();
        }
      }
    )
  }

  publishCodeListItem(e: any, c: CodelistItem) {
    let codeListItem = {
      ...c,
      isActive: e.checked
    }
    this.codeListService.addorUpdateCodeListItem(codeListItem).subscribe(res => {
      if (res.isActive)
        this.toaster.success('Plan is Activated!', 'Success');
      if (!res.isActive)
        this.toaster.warning('Plan is Deactivated')
    })
  }
  addCodeListItem() {
    this.sharedService.EditCodeListItem(this.codeListItems).afterClosed().subscribe(
      res => {
        if (res) {
          this.dataSource.push(res);
          this.table.renderRows();
        }
      }
    )
  }

  addCodeList() {
    this.sharedService.EditCodeList(this.addNewCodeList).afterClosed().subscribe(
      res => res
    )
  }
}
